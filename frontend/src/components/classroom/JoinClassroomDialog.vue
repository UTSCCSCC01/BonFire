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
          Join a Campsite
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
                  v-model="classroom.token"
                  label="Classroom invite token (Eg: Campsite#00000000)"
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
            :disabled="!classroom.token"
            :loading="joining"
            @click="joinClassroom"
          >
            Join
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
      joining: false,
    }
  },
  methods: {
    joinClassroom() {
      this.joining = true;
      this.$http.put('/user/classroom', this.classroom)
        .then(res => {
          this.$notify({
            type: 'success',
            title: 'Successfully Joined Classroom',
            text: `You successfully joined an existing classroom called: ${res.data.title}, with invite token ${res.data.token}`
          });
          this.$emit("add-classroom" , res.data);
          this.closeDialog();
          this.classroom = {};
        })
        .catch(err => {
          console.error(err);
          this.$notify({
            type: 'error',
            title: 'Failed to join the classroom',
            text: err?.response ?.data?.message || 'Unknown Error'
          });
        })
        .finally(() => this.joining = false);
    },
    closeDialog() {
      this.$emit('close-dialog');
    }
  }
}
</script>
<style>

</style>
