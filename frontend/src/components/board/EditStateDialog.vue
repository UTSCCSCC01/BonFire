<template>
  <div class="state-dialog">
    <v-dialog
      v-model="openDialog"
      persistent
      max-width="600px"
    >
      <!-- Dialog Card -->
      <v-card>
        <v-card-title> Edit State </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-text-field
                  v-model="stateData.title"
                  label="State Title"
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
            :disabled="!stateData.title"
            :loading="saving"
            @click="saveState"
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
    state: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      stateData: {
        title: "",
      },
      saving: false,
    };
  },
  watch: {
    state: function() {
      this.stateData = JSON.parse(JSON.stringify(this.state));
    },
  },
  mounted() {
    this.stateData = JSON.parse(JSON.stringify(this.state));
    console.log(this.state);
  },
  methods: {
    saveState() {
      this.saving = true;
      delete this.stateData.cards;
      delete this.stateData.type;
      delete this.stateData.order;
      delete this.stateData.deleted;
      delete this.stateData.board_id;
      this.$http
        .put(`states/${this.state.id}`, this.stateData)
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
      this.$emit('save', this.state);
      this.$emit("close");
    },
  },
};
</script>
<style>
</style>
