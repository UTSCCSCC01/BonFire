<template>
  <div class="board-dialog">
    <v-dialog
      v-model="openDialog"
      persistent
      max-width="600px"
    >
      <!-- Dialog Card -->
      <v-card>
        <v-card-title>
          Create a New Board
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-text-field
                  v-model="board.title"
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
            @click="closeDialog"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="!board.title"
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
      required: true
    }
  },
  data() {
    return {
      board: {},
      saving: false,
    }
  },
  methods: {
    saveBoard() {
      this.saving = true;
      this.$http.post('/boards', this.board)
        .then(res => {
          this.$notify({
            type: 'success',
            title: 'Successfully Created Board',
            text: `You successfully created a new board called: ${res.data.title}, reload the page to see the board`
          });
          this.closeDialog();
          this.board = {};
        })
        .catch(err => {
          console.error(err);
          this.$notify({
            type: 'error',
            title: 'Failed to create the board',
            text: err?.response ?.data?.message || 'Unknown Error'
          });
        })
        .finally(() => this.saving = false);
    },
    closeDialog() {
      this.$emit('close-dialog');
    }
  }
}
</script>
<style>

</style>
