<template>
  <div class="board-dialog">
    <v-dialog
      v-model="openDialog"
      persistent
      max-width="600px"
    >
      <!-- Dialog Card -->
      <v-card>
        <v-card-title> Edit Board </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-text-field
                  v-model="boardData.title"
                  label="Board Title"
                  required
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="deleteBoard(board); closeDialog();"
          >
            Delete
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="closeDialog"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="!boardData.title"
            :loading="saving"
            @click="saveBoard"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    openDialog: {
      type: Boolean,
      required: true,
    },
    board: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      boardData: {
        title: "",
      },
      saving: false,
    };
  },
  watch: {
    board: function() {
      this.boardData = JSON.parse(JSON.stringify(this.board));
    },
  },
  mounted() {
    this.boardData = JSON.parse(JSON.stringify(this.board));
  },
  methods: {
    saveBoard() {
      this.saving = true;
      this.$http
        .put(`boards/${this.board.id}`, this.boardData)
        .then((response) => {
          this.$notify({
            type: "success",
            title: "Saved",
            text: "Changes Saved",
          });

          this.$emit('save', response.data);
        })
        .catch(() => {
          this.$notify({
            type: "error",
            title: "Error",
            text: "Something went wrong",
          });
        })
        .finally(() => {
          this.closeDialog();
          this.saving = false;
        });
    },
    
    closeDialog() {
      this.$emit('save', this.board);
      this.$emit("close");
    },

    deleteBoard(board) {

      let confirmation = confirm(`Are you sure you want to delete board ${board.title}`);

      if (confirmation) {
        this.$http.delete(`boards/${board.id}`)
        .then(() => {
           this.$router.push({ name: 'Dashboard' });
        })
        .catch(err => {
          console.error(err);
        })
      }
      
    },

  },
};
</script>
<style>
</style>
