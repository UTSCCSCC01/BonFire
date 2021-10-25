<template>
  <div class="edit-card-dialog">
    <v-dialog
      v-model="openDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title> Edit card </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-text-field
                  v-model="cardData.title"
                  label="Card Name"
                  maxlength="191"
                  required
                />

                <v-textarea
                  v-model="cardData.desc"
                  name="input-7-1"
                  filled
                  label="Card Description"
                  auto-grow
                  maxlength="191"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="cardData.due_date"
              label="Due Date"
              prepend-icon="fa fa-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="cardData.due_date"
            no-title
            scrollable
          />
        </v-menu>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="deleteCard(cardData)"
          >
            Delete
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="closeDialog()"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="!cardData.title "
            :loading="saving"
            @click="saveCard"
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
  },
  inject:['currentCard'],
  data() {
    return {
      cardData: this.currentCard.data,
    };
  },
  methods: {
    saveCard() {
    },
    closeDialog() {
      this.$emit('save', this.cardData);
      this.$emit("close");
    },

    deleteCard(card) {
        let confirmation = confirm(`Are you sure you want to delete card ${card.title}`);

        if (confirmation) {
            this.$http.delete(`cards/${card.id}`)
            .then(() => {
            })
            .catch(err => {
            console.error(err);
            })
        }
        this.closeDialog();
    },
  },
};
</script>
<style>
</style>
