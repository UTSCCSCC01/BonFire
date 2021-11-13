<template>
  <div>
    <div v-if="room.creator_id" class="board mx-4">
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
        <div class="board" :class="$currentUser.id == room.creator_id ? 'board-small' : ''">
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
                      v-for="(card) in state.cards"
                      :key="card.id"
                      :card="card"
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
              :items="formatedAssignments"
              selectable-key="title"
              item-key="id"
              @click:row="clickAssignment"
              :items-per-page="5"
              class="elevation-1"
            />
          </v-row>
        </div>
        <v-col v-if="$currentUser.id == room.creator_id" class="students">
          <h6 class="px-4 py-2" style="font-family: Poppins">
            <strong>Invite Code: </strong>
            <span>{{ room.token }}</span>
            <v-btn icon color="blue" @click="refreshToken">
              <v-icon x-small> fas fa-sync-alt </v-icon>
            </v-btn>
            <v-btn icon color="green" @click="copyToken">
              <v-icon x-small> fas fa-copy </v-icon>
            </v-btn>
          </h6>
          <h6 class="px-4 py-2" style="font-family: Poppins; font-weight: bold">
            Students
          </h6>
          <div v-if="room.students && room.students.length > 0">
            <v-list class="student-list" dense rounded style="">
              <v-list-item v-for="student in room.students" :key="student.id">
                <v-icon left> fas fa-user </v-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ student.first_name }} {{ student.last_name }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="removeStudent(student)">
                    <v-icon x-small> fas fa-times </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </div>
          <div v-else>
            <p class="text-center" style="font-family: Poppins; color: #808080">
              No students yet
            </p>
          </div>
          <v-container actionbar>
            <v-btn
              class="toolbar-btn"
              color="#f7f7f7"
              depressed
              rounded
              @click="closeClassroom()"
            >
              <v-icon left> fa fa-minus </v-icon>
              Close Class
            </v-btn>
          </v-container>
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
          :title="(assignment.id ? 'Edit' : 'Create new') + ' Assignment'"
          :open-dialog="newAssignment"
          @save="() => assignment.id ? saveAssignment() : createAssignment()"
          @close="assignment = {}; newAssignment = false"
        >
          <v-text-field
            v-model="assignment.title"
            label="Assignment Name"
            maxlength="50"
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
            v-model="assignment.due_date"
            label="Due Date"
            type="datetime-local"
            prepend-icon="fa fa-calendar"
          />
          <v-text-field
            v-model="assignment.available_date"
            label="Date visible for students"
            type="datetime-local"
            prepend-icon="fa fa-calendar"
          />
          <v-text-field
            v-model="assignment.published_date"
            label="Publish Date"
            type="datetime-local"
            prepend-icon="fa fa-calendar"
          />
        </assignment-dialog>
      </div>
    </div>
    <v-progress-circular
      v-else
      :size="70"
      :width="7"
      class="mt-12 mx-auto d-flex align-middle"
      color="blue"
      indeterminate
    />
  </div>
</template>
<script>
import EditBoardDialog from "@/components/board/EditBoardDialog";
import Draggable from "vuedraggable";
import StateCard from "@/components/board/StateCard";
import Dialog from "@/components/Dialog";
import Board from "@/mixins/boards.js";

export default {
  components: {
    "board-dialog": EditBoardDialog,
    "state-card": StateCard,
    "v-draggable": Draggable,
    "card-dialog": Dialog,
    "assignment-dialog": Dialog,
  },
  mixins: [Board],
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
      boardId: null,
      newAssignment: false,
      available_date_menu: false,
      published_date_menu: false,
      due_date_menu: false,
      headers: [
        {
          text: "Title",
          align: "start",
          value: "title",
        },
        { text: "Due Date", value: "formatted_due_date" },
        { text: "Available Date", value: "formatted_available_date" },
        { text: "Publish Date", value: "formatted_published_date" },
      ],
    };
  },
  watch: {
    classroomId: function () {
      // If the board id changes, reload all board content
      this.reloadPageContent();
    },
  },
  computed: {
    formatedAssignments: function () {
      return this.assignments.map((assignment) => {
        assignment.formatted_due_date = this.formatDate(new Date(assignment.due_date));
        assignment.formatted_available_date = assignment.available_date ? this.formatDate(
          new Date(assignment.available_date)
        ) : '';
        assignment.formatted_published_date = assignment.published_date ? this.formatDate(
          new Date(assignment.published_date)
        ) : '';
        return assignment;
      });
    },
  },
  mounted() {
    this.reloadPageContent();
  },
  methods: {
    clickAssignment(assignment) {
      this.assignment = assignment;
      this.assignment.due_date = assignment.due_date?.replace('Z', '');
      this.assignment.published_date = assignment.published_date?.replace('Z', '');
      this.assignment.available_date = assignment.available_date?.replace('Z', '');
      this.newAssignment = true;
    },
    formatDate(date) {
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    },
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
      this.getStudents();
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
    removeStudent(student) {
      let confirmation = confirm(
        `Are you sure you want to remove ${student.first_name} ${student.last_name} from the classroom`
      );

      if (confirmation) {
        this.$http
          .delete(`classrooms/${this.classroomId}/students/${student.id}`)
          .then(() => {
            this.$notify({
              type: "success",
              title: "Successfully removed student",
            });
            this.getRoomInfo();
            this.getStudents();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    getStudents() {
      this.$http
        .get(`classrooms/${this.classroomId}/students`)
        .then((res) => {
          this.room.students = res.data;
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
          .put(`classrooms/${this.room.id}/regenerate-token`)
          .then((res) => {
            this.room.token = res.data.token;
            this.reorganizeStates();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    saveAssignment() {
      this.loading = true;
      this.assignment.classroom_id = this.room.id;

      this.$http
        .put(`/assignments/${this.assignment.id}`, this.assignment)
        .then((res) => {
          this.assignment = {};
          this.assignments.push(res.data);
          this.$notify({
            type: "success",
            title: "Assignment saved",
          });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.newAssignment = false;
          this.loading = false;
        });
    },
    createAssignment() {
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
    },
    copyToken() {
      navigator.clipboard.writeText(this.room.token);
      this.$notify({
        type: "success",
        title: `Token ${this.room.token} copied to clipboard`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.actionbar {
  position: absolute;
  bottom: 0;
  align-items: center;
}
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
    &-small {
      width: 66%;
    }
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
