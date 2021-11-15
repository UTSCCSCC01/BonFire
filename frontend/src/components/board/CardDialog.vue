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
              :readonly="readonly"
              solo
            />
            <v-divider />
          </div>
          <!-- Left section -->
          <v-col
            cols="12"
            sm="6"
            md="8"
          >
            <v-card-text style="min-height: 400px">
              <v-textarea
                v-model="cardData.desc"
                label="Description"
                auto-grow
                :readonly="readonly"
                rows="8"
              />
              <v-textarea
                v-model="cardData.submit_url"
                label="Submit URL"
                auto-grow
                :readonly="readonly"
                rows="1"
                v-if="cardData.submit_url"
              />
            </v-card-text>
          </v-col>
          <!-- Right section -->
          <v-col cols="6" md="4" style="display: flex; padding-left">
            <v-divider vertical></v-divider>
            <div class="right-menu" style="padding-left: 10px; width: 100%">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-card-subtitle style="padding-bottom: 0; padding-left: 0; color: grey;">
                    Due Date
                  </v-card-subtitle>
                  <v-chip
                    class="ma-2"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ (cardData.due_date).split('T')[0] }}
                  </v-chip>
                </template>
                <v-date-picker
                  v-model="cardData.due_date"
                  no-title
                  :readonly="readonly"
                  scrollable
                />
              </v-menu>
              <v-card-subtitle style="padding-bottom: 0; padding-left: 0; color: grey;">
                Created At
              </v-card-subtitle>
              <v-card-subtitle style="padding-top: 0;">
                {{ formatDate(cardData.created_at) }}
              </v-card-subtitle>
              <v-card-subtitle style="padding-bottom: 0; padding-left: 0; color: grey;">
                Last updated
              </v-card-subtitle>
              <v-card-subtitle style="padding-top: 0;">
                {{ formatDate(cardData.updated_at) }}
              </v-card-subtitle>
              <v-spacer></v-spacer>
              <v-row v-if="!hideTags">
                <v-col cols="5">
                  <v-text-field
                    small
                    label="Tag Label"
                    v-model="tagLabel"
                    style="margin-top: 25px;"
                  ></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-btn
                    class="board-states-item-btn"
                    color="#f7f7f7"
                    x-small
                    elevation="0"
                    :disabled="!tagLabel"
                    @click="createTag"
                    style="margin-top: 40px;"
                  >
                    <v-icon left x-small>
                      fa fa-plus
                    </v-icon>
                    Tag
                  </v-btn>
                </v-col>
              </v-row>
              <v-list>
                <v-list-item v-for="tag in card.tags" :key="tag.id" style="padding: 0 5px; display: inline">
                  <v-chip color="pink" small label text-color="white">
                    {{ tag.label }}
                  </v-chip>
                </v-list-item>
              </v-list>
            </div>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="secondary"
            text
            @click="cancelChanges"
            v-if="!readonly"
          >
            Undo
          </v-btn>
          <v-btn
            color="secondary"
            text
            @click="close"
          >
            Close
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="updateChanges"
            v-if="!readonly"
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
    readonly: {
      type: Boolean,
      required: true,
    },
    hideTags: {
      type: Boolean,
      required: false,
      default: false,
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
      menu: false,
      tagLabel: '',
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
    createTag() {
      if (!this.tagLabel){
        return;
      }

      this.$http.post(`/cards/${this.cardData.id}/tags`, { label: this.tagLabel })
        .then(res => {
          this.$emit('add-tag', { card: this.cardData, tag: res.data });
        })
        .catch(error => {
          console.log(error);
        });

      this.tagLabel = '';
    },
    updateChanges() {
      this.$emit('update', this.cardData);
    },
    cancelChanges() {
      this.cardData = JSON.parse(JSON.stringify(this.card));
    },
    formatDate(date) {
      return date?.replace(/[a-zA-Z]|:[0-9]{2}(\.[0-9]{3})/g, ' ')?.trim()
    },
    close() {
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
