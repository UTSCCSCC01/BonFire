<template>
  <div class="board mx-4">
    <div class="header">
      {{ room.name || "Board" }}
      <span
        style="color: #f1d7bc"
        class="px-3"
      > {{ currentUser.id == room.creator_id ? ' - Facilitator' : ' - Student' }}</span>
      <v-spacer />
      <v-btn
        v-if="currentUser.id == room.creator_id"
        icon
      >
        <v-icon
          class="fas fa-edit"
          style="cursor: pointer"
          @click="editBoardDialog = true"
        />
      </v-btn>
    </div>
    <div class="board-body">
      <div class="board">
        <div
          v-if="currentUser.id == room.creator_id"
          class="toolbar"
        >
          <v-btn
            class="toolbar-btn"
            color="#f7f7f7"
            depressed
            tile
            @click="showNewCard(states[0])"
          >
            <v-icon left>
              fa fa-plus
            </v-icon>
            New Assignment
          </v-btn>
        </div>
        <div>
          <v-btn
            v-if="currentUser.id != room.creator_id"
            class="toolbar-btn"
            color="#FFCCCC"
            depressed
            tile
            right
            @click="leaveClass(room)"
          >
            <v-icon left>
              fas fa-sign-out-alt
            </v-icon>
            Leave
          </v-btn>
        </div>
        <v-row class="board-states">
          <v-col
            v-for="state in states"
            :key="state.id"
            class="board-states-col"
          >
            <v-sheet class="rounded lg border shadow-sm board-states-item">
              <p class="board-states-item-title">
                {{ state.title }}
              </p>
              <v-draggable
                :list="state.cards"
                :animation="200"
                :show-dropzone-areas="true"
                group="tasks"
                class="board-states-item-draggable"
              >
                <state-card
                  v-for="task in state.cards"
                  :key="task.id"
                  :task="task"
                  class="mt-3 cursor-move"
                />
              </v-draggable>
            </v-sheet>
          </v-col>
        </v-row>
      </div>
      <v-col
        v-if="currentUser.id == room.creator_id"
        class="students"
      >
        <h6
          class="px-4 py-2"
          style="font-family: Poppins"
        >
          <strong>Invite Code: </strong>
          <span>{{ room.token }}</span>
          <v-btn
            icon
            color="blue"
            @click="refreshToken">
            <v-icon x-small>fas fa-sync-alt</v-icon>
          </v-btn>
          <v-btn
            icon
            color="green"
            @click="copyToken">
            <v-icon x-small>fas fa-copy</v-icon>
          </v-btn>
        </h6>
        <h6 class="px-4 py-2" style="font-family: Poppins; font-weight: bold ">
          Students
        </h6>
        <div v-if="room.students.length>0">
          <v-list class="student-list" dense rounded style="">
            <v-list-item
              v-for="student in room.students"
              :key="student.id"
            >
                <v-icon left>
                  fas fa-user
                </v-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ student.first_name }} {{ student.last_name }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  icon
                  @click="removeStudent(student)"
                >
                  <v-icon x-small>fas fa-times</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </div>
        <div v-else>
          <p class="text-center" color="#808080">No students added yet</p>
        </div>
        <v-container actionbar>
          <v-btn
            class="toolbar-btn"
            color="#f7f7f7"
            depressed
            rounded
            @click="addStudent()"
          >
            <v-icon left>
              fa fa-plus
            </v-icon>
            Add Students
          </v-btn>
          <v-btn
            class="toolbar-btn"
            color="#f7f7f7"
            depressed
            rounded
            @click="closeClassroom()"
          >
            <v-icon left>
              fa fa-minus
            </v-icon>
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
        v-if="card.state"
        :title="`Create new Assignment`"
        :open-dialog="newCard"
        @save="createCard"
        @close="newCard = false"
      >
        <v-text-field
          v-model="card.title"
          label="Assignment Name"
          maxlength="191"
          required
        />
        <v-textarea
          v-model="card.desc"
          name="input-7-1"
          filled
          label="Assignment Description (Ex: Acceptance Criteria, etc.)"
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
          <v-date-picker
            v-model="card.due_date"
            no-title
            scrollable
          />
        </v-menu>
      </card-dialog>
    </div>
  </div>
</template>
<script>
import EditBoardDialog from "@/components/board/EditBoardDialog";
import Draggable from "vuedraggable";
import StateCard from "@/components/board/StateCard";
import Dialog from "@/components/Dialog";

export default {
  components: {
    "board-dialog": EditBoardDialog,
    "state-card": StateCard,
    "v-draggable": Draggable,
    "card-dialog": Dialog,
  },
  props: {
    classroomId: {
      type: String,
      required: true,
    },
    currentUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      room: {},
      editBoardDialog: false,
      newState: false,
      stateName: "",
      states: [],
      newCard: false,
      board: {},
      card: {},
      menu: false,
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
      let confirmation = confirm(`Are you sure you want to delete classroom ${this.room.name}`);

      if (confirmation) {
        this.$http.delete(`classrooms/${this.room.id}`)
        .then(() => {
          this.$notify({
            type: "success",
            title: "Successfully disbanded the class",
          });
           this.$router.push({ name: 'Dashboard' });
        })
        .catch(err => {
          console.error(err);
        })
      }
    },
    saveRoom(data) {
      this.room = data;
    },
    showNewCard(state) {
      this.card = {
        state,
      };
      this.newCard = true;
    },
    createCard() {
      this.newCard = false;
      this.card.state_id = this.card.state.id;
      delete this.card.state;

      if (this.card.due_date) {
        let date = this.card.due_date.split("-");
        this.card.due_date = new Date(
          date[0],
          date[1] - 1,
          date[2]
        ).toISOString();
      }

      this.$http
        .post("cards", this.card)
        .then(() => {
          this.$notify({
            type: "success",
            title: "Successfully Create a new card",
          });
        })
        .catch((err) => {
          this.$notify({
            type: "error",
            title: "Failed to create card",
            text: `Failed to create ${this.card.title}`,
          });
          console.error(err);
        })
        .finally(() => {
          this.card = {};
        });
    },
    reloadPageContent() {
      this.getRoomInfo();
      this.getStudents();
    },
    reorganizeStates() {
      this.states.sort((a, b) => {
        if (a.type === "TODO") return -1;
        if (a.type === "DONE") return 1;

        if (b.type === "TODO") return 1;
        if (b.type === "DONE") return -1;

        return a.order - b.order;
      });
    },
    getStates() {
      this.$http
        .get(`boards/${this.room.board_id}/states?include=cards`)
        .then((res) => {
          this.states = res.data;
          this.states.forEach((state) => {
            if (!state.cards) this.$set(state, "cards", []);
          });

          this.reorganizeStates();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    leaveClass(classroom) {
      let confirmation = confirm(`Are you sure you want to leave classroom ${classroom.name}`);

      if (confirmation) {
        this.$http.put(`classrooms/${classroom.id}/leave`)
        .then(() => {
          this.$notify({
            type: "success",
            title: "Left classroom",
          });
          this.$router.push({ name: 'Dashboard' });
        })
        .catch(err => {
          console.error(err);
        })
      }
    },
    removeStudent(student){
      let confirmation = confirm(`Are you sure you want to remove ${student.first_name} ${student.last_name} from the classroom`);

      if (confirmation) {
        this.$http.delete(`classrooms/${this.classroomId}/students/${student.id}`)
        .then(() => {
          this.$notify({
            type: "success",
            title: "Successfully removed student",
          });
          this.getRoomInfo();
          this.getStudents();
        })
        .catch(err => {
          console.error(err);
        })
      }
    },
    getStudents(){
      this.$http.get(`classrooms/${this.classroomId}/students`)
      .then(res => {
        this.room.students = res.data;
      })
      .catch(err => {
        console.error(err);
      })
    },
    getRoomInfo() {
      this.$http
        .get(`classrooms/${this.classroomId}`)
        .then((res) => {
          this.room = res.data;
          this.board = {
            id: this.room.board_id,
            title: this.room.name,
          };
          this.getStates();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    refreshToken(){
      let confirmation = confirm(`Are you sure you want to regenerate your class token? Your old classroom token will not be able to be used to join this classrooom`);

      if (confirmation) {
        this.$http
          .put(`classrooms/${this.room.id}/regenerate-token`)
          .then((res) => {
            this.room.token=res.data.token;
            this.reorganizeStates();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    copyToken () {
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
  position:absolute;
  bottom:0;
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
    width: 66%;
    height: 100%;
    margin-top: 20px;

    &-body {
      width: 100%;
      overflow-x: scroll;
      overflow-y: clip;
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
