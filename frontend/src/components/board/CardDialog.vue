<template>
  <div class="card-dialog">
    <v-dialog
      v-model="dialog"
      width="75%"
      max-width="900px"
      @click:outside="close"
    >
      <v-card>
        <v-row no-gutters>
          <div class="card-title">
            <v-text-field
              v-model="cardData.title"
              solo
            />
            <v-divider></v-divider>
          </div>
          <!-- Left section -->
          <v-col cols="12" sm="6" md="8">
            <v-card-text>
              <v-textarea
                v-model="cardData.desc"
                solo
              />
            </v-card-text>
          </v-col>
          <!-- Right section -->
          <v-col cols="6" md="4">
            <v-divider vertical></v-divider>

          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            text
            @click="cancelChanges"
          >
             Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="updateChanges"
          >
             Update
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
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      saving: false,
      cardData: {},
      dialog: false,
    };
  },
  watch: {
    card: function() {
      this.cardData = JSON.parse(JSON.stringify(this.card));
    },
    openDialog: function(val) {
      console.log(val)
      this.dialog = val;
    },
  },
  mounted() {
    this.cardData = JSON.parse(JSON.stringify(this.card));
  },
  methods: {
    updateChanges() {
      this.emit('update-info', this.cardData);
    },
    cancelChanges() {
      this.cardData = JSON.parse(JSON.stringify(this.card));
    },
    close() {
      console.log('tell parent to close the dialog')
      this.$emit('close');
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  &-title {
    ::v-deep div.v-input__slot {
      font-size: 25px;
      padding: 0 18px;
      margin-top: 10px;
    }

    ::v-deep .v-input:not(.v-input--is-focused) {
      div.v-input__slot {
        box-shadow: none !important;
      }
    }

    ::v-deep .v-input {
      height: 40px;
      &.v-input--is-focused div.v-input__slot {
        background-color: #ede9e9;
      }
    }
  }
}
</style>
