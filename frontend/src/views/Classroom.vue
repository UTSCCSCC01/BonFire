<template>
  <div>
    <v-content class="board mx-4" v-if="room.creator_id">
      <div class="header">
        {{ room.name || "Board" }}
        <span style="color: #f1d7bc" class="px-3">
          {{
            $currentUser.id == room.creator_id ? " - Facilitator" : " - Student"
          }}</span
        >
        <v-spacer />
        <v-btn v-if="$currentUser.id == room.creator_id" icon>
          <v-icon
            class="fas fa-edit"
            style="cursor: pointer"
            @click="editBoardDialog = true"
          />
        </v-btn>
      </div>
      <div class="board-body">
        <div class="board">
          <div v-if="$currentUser.id == room.creator_id" class="toolbar">
            <v-btn
              class="toolbar-btn"
              color="#f7f7f7"
              depressed
              tile
              @click="newAssignment = true"
            >
              <v-icon left> fa fa-plus </v-icon>
              New Assignment
            </v-btn>
          </div>
          <div>
            <v-btn
              v-if="$currentUser.id != room.creator_id"
              class="toolbar-btn"
              color="#FFCCCC"
              depressed
              tile
              right
              @click="leaveClass(room)"
            >
              <v-icon left> fas fa-sign-out-alt </v-icon>
              Leave
            </v-btn>
          </div>
          <v-row class="board-states">
            <v-draggable
              :list="states"
              :animation="200"
              :show-dropzone-areas="true"
              group="states"
              style="display: flex"
              @change="orderChange"
            >
              <v-col
                v-for="state in states"
                :key="state.id"
                class="board-states-col"
              >
                <v-sheet class="rounded lg border shadow-sm board-states-item">
                  <p class="board-states-item-title">
                    {{ state.title }}
                    <v-btn
                      class="board-states-item-btn"
                      color="#f7f7f7"
                      x-small
                      elevation="0"
                      @click="showNewCard(state)"
                    >
                      <v-icon left x-small> fa fa-plus </v-icon>
                      card
                    </v-btn>
                  </p>
                  <v-draggable
                    :list="state.cards"
                    :animation="200"
                    :show-dropzone-areas="true"
                    group="tasks"
                    class="board-states-item-draggable"
                    @change="moveCard"
                  >
                    <state-card
                      v-for="task in state.cards"
                      :key="task.id"
                      :task="task"
                      class="mt-3 cursor-move"
                      @deleteCard="removeStateCard"
                    />
                  </v-draggable>
                </v-sheet>
              </v-col>
            </v-draggable>
          </v-row>
          <v-row v-if="$currentUser.id == room.creator_id">
            <v-data-table
              :headers="headers"
              :items="assignments"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
        </v-row>
        </div>
        <v-col v-if="$currentUser.id == room.creator_id" class="students">
          <div class="toolbar">
            <v-btn
              class="toolbar-btn"
              color="#f7f7f7"
              depressed
              tile
              @click="addStudent()"
            >
              <v-icon left> fa fa-plus </v-icon>
              Add Students
            </v-btn>
            <v-btn
              class="toolbar-btn"
              color="#f7f7f7"
              depressed
              tile
              @click="closeClassroom()"
            >
              <v-icon left> fa fa-minus </v-icon>
              Close Class
            </v-btn>
          </div>
          <h5 class="px-4 py-2" style="font-family: Poppins">
            <strong>Invite Code: </strong>
            <span>{{ room.token }}</span>
            <v-icon color="blue" small right @click="refreshToken">
              fas fa-sync-alt
            </v-icon>
          </h5>
        </v-col>
      </div>

      <div class="dialogs">
        <board-dialog
          v-if="board"
          :open-dialog="editBoardDialog"
          :board="board"
          @save="saveBoard"
          @close="editBoardDialog = false"
        />
        <card-dialog
          v-if="board && card.state"
          :title="`Create new ${card.state.title} Card`"
          :open-dialog="newCard"
          @save="createCard"
          @close="newCard = false"
        >
          <v-text-field
            v-model="card.title"
            label="New Card Name"
            maxlength="191"
            required
          />
          <v-textarea
            v-model="card.desc"
            name="input-7-1"
            filled
            label="Card Description"
            auto-grow
            maxlength="191"
          />
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
                v-model="card.due_date"
                label="Due Date"
                prepend-icon="fa fa-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker v-model="card.due_date" no-title scrollable />
          </v-menu>
        </card-dialog>
        <assignment-dialog
          v-if="$currentUser.id == room.creator_id"
          title="Create new Assignment"
          :open-dialog="newAssignment"
          @save="createAssignment"
          @close="newAssignment = false"
        >
          <v-text-field
            v-model="assignment.title"
            label="Assignment Name"
            maxlength="191"
            required
          />
          <v-textarea
            v-model="assignment.desc"
            name="input-7-1"
            filled
            label="Assignment Description (Ex: Acceptance Criteria, etc.)"
            auto-grow
            maxlength="191"
          />
          <v-text-field
            v-model="assignment.submit_url"
            name="input-7-1"
            filled
            label="Assignment Submit url"
            auto-grow
            maxlength="191"
          />
          <v-text-field
            label="Due Date"
            type="datetime-local"
            prepend-icon="fa fa-calendar"
            v-model="assignment.due_date"
          ></v-text-field>
          <v-text-field
            label="Date visible for students"
            type="datetime-local"
            prepend-icon="fa fa-calendar"
            v-model="assignment.available_date"
          ></v-text-field>
          <v-text-field
            label="Publish Date"
            type="datetime-local"
            prepend-icon="fa fa-calendar"
            v-model="assignment.published_date"
          ></v-text-field>
        </assignment-dialog>
      </div>
    </v-content>
    <v-progress-circular
      v-else
      :size="70"
      :width="7"
      class="mt-12 mx-auto d-flex align-middle"
      color="blue"
      indeterminate
    ></v-progress-circular>
  </div>
</template>
<script>
import EditBoardDialog from "@/components/board/EditBoardDialog";
import Draggable from "vuedraggable";
import StateCard from "@/components/board/StateCard";
import Dialog from "@/components/Dialog";
import Board from "@/mixins/boards.js";

export default {
  mixins: [Board],
  components: {
    "board-dialog": EditBoardDialog,
    "state-card": StateCard,
    "v-draggable": Draggable,
    "card-dialog": Dialog,
    "assignment-dialog": Dialog,
  },
  props: {
    classroomId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      room: {},
      assignment: {},
      assignments: [],
      newAssignment: false,
      available_date_menu: false,
      published_date_menu: false,
      due_date_menu: false,
      headers: [
          {
            text: 'Title',
            align: 'start',
            value: 'title',
          },
          { text: 'Due Date', value: 'due_date' },
          { text: 'Available Date', value: 'available_date' },
          { text: 'Publish Date Date', value: 'published_date' },
        ],
    };
  },
  watch: {
    classroomId: function () {
      // If the board id changes, reload all board content
      this.reloadPageContent();
    },
  },
  mounted() {
    this.reloadPageContent();
  },
  methods: {
    addStudent() {},
    closeClassroom() {
      let confirmation = confirm(
        `Are you sure you want to delete classroom ${this.room.name}`
      );

      if (confirmation) {
        this.$http
          .delete(`classrooms/${this.room.id}`)
          .then(() => {
            this.$notify({
              type: "success",
              title: "Successfully disbanded the class",
            });
            this.$router.push({ name: "Dashboard" });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    saveRoom(data) {
      this.room = data;
    },
    reloadPageContent() {
      this.getRoomInfo();
    },
    leaveClass(classroom) {
      let confirmation = confirm(
        `Are you sure you want to leave classroom ${classroom.name}`
      );

      if (confirmation) {
        this.$http
          .put(`classrooms/${classroom.id}/leave`)
          .then(() => {
            this.$notify({
              type: "success",
              title: "Left classroom",
            });
            this.$router.push({ name: "Dashboard" });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    getAssignments() {
      this.$http
        .get(`classrooms/${this.room.id}/assignments`)
        .then((res) => {
          this.assignments = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getRoomInfo() {
      this.$http
        .get(`classrooms/${this.classroomId}`)
        .then((res) => {
          this.room = res.data;
          this.boardId = res.data.board_id;
          this.board = res.data.board;
          this.getStates();
          this.getAssignments();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    refreshToken() {
      let confirmation = confirm(
        `Are you sure you want to regenerate your class token? Your old classroom token will not be able to be used to join this classrooom`
      );

      if (confirmation) {
        this.$http
          .put(`classrooms/${this.room.board_id}/regenerate-token`)
          .then((res) => {
            this.room.token = res.data.token;
            this.reorganizeStates();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    createAssignment(){
      this.loading = true;
      this.assignment.classroom_id = this.room.id;

      this.$http
        .post(`/assignments`, this.assignment)
        .then((res) => {
          this.assignment = {};
          this.assignments.push(res.data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.newAssignment = false;
          this.loading = false;
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  font-family: Poppins;
  font-size: 45px;
  font-weight: bold;
  color: #3f3f3f;
  text-align: left;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  padding: 0 30px;
}
.board-body {
  display: flex;

  .students {
    margin-right: -20px;
    padding-top: 20px;
    height: 93vh;
    background-color: #f5f5f5;
  }
  .board {
    width: 66%;
    height: 100%;
    margin-top: 20px;
    overflow-x: scroll;
    overflow-y: clip;

    &-body {
      width: 100%;
      margin-left: -15px;
      padding-left: 15px;
      height: 95%;
      display: inline-block;

      .toolbar {
        padding: 12px;

        &-btn {
        }
      }
    }

    &-states {
      flex-wrap: nowrap;
      max-width: 60%;

      &-col {
        max-width: 700px;
      }

      &-item {
        // Need to override the default theme
        background-color: #f7f7f7 !important;
        padding: 20px;
        height: 100%;
        min-width: 350px;
        min-height: 400px;

        &-btn {
          float: right;
        }

        &-draggable {
          height: 100%;
          min-height: 200px;
        }
      }
    }
  }
}
</style>
