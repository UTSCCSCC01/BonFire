<template>
  <div class="classroom-dialog">
    <v-dialog
      v-model="openDialog"
      persistent
      max-width="600px"
    >
      <!-- Dialog Card -->
      <v-card>
        <v-card-title>
          Create a new classroom
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
                  v-model="classroom.name"
                  label="Classroom name (Eg: CSCC01)"
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
            :disabled="!classroom.name"
            :loading="saving"
            @click="saveClassroom"
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
      classroom: {},
      saving: false,
    }
  },
  methods: {
    saveClassroom() {
      this.saving = true;
      this.$http.post('/classroom', this.classroom)
        .then(res => {
          this.$notify({
            type: 'success',
            title: 'Successfully Created Classroom',
            text: `You successfully created a new classroom called: ${res.data.title}, with invite token ${res.data.token} reload the page to see the classroom`
          });
          this.$emit("add-classroom" , res.data);
          this.closeDialog();
          this.classroom = {};
        })
        .catch(err => {
          console.error(err);
          this.$notify({
            type: 'error',
            title: 'Failed to create the classroom',
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
