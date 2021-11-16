<template>
  <div class="board mx-4">
    <div class="header">
      {{ board.title || 'Board' }}
      <v-spacer />
      <v-btn icon>
        <v-icon
          class="fas fa-edit"
          style="cursor:pointer;"
          @click="editBoardDialog = true"
        />
      </v-btn>
    </div>
    <div class="board-body">
      <div class="toolbar">
        <v-btn
          class="toolbar-btn"
          color="#f7f7f7"
          depressed
          rounded
          @click="newState = true"
        >
          <v-icon left>
            fa fa-plus
          </v-icon>
          Add State
        </v-btn>
        <v-btn
          class="toolbar-btn"
          color="#f7f7f7"
          depressed
          rounded
          @click="newClass = true"
        >
          <v-icon left>
            fa fa-plus
          </v-icon>
          Add Classroom
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
            <v-sheet
              class="rounded lg border shadow-sm board-states-item"
            >
              <div
                class="board-states-item-title"
              >
                {{ state.title }}
                <p
                  v-if="state.cards.length > 0"
                  class="board-states-item-count"
                >
                  - {{ state.cards.length }} {{ state.cards.length === 1 ? 'item' : 'items' }}
                </p>
                <v-btn
                  v-show="state.type === 'CUSTOM'"
                  align="left"
                  icon
                  x-small
                  color="dark-grey"
                  class="board-states-item-btn"
                  elevation="0"
                  @click="deleteState(state)"
                >
                  <v-icon
                    x-small
                  >
                    fa fa-times
                  </v-icon>
                </v-btn>
                <v-btn
                  class="board-states-item-btn"
                  color="#f7f7f7"
                  x-small
                  elevation="0"
                  @click="showNewCard(state)"
                >
                  <v-icon
                    left
                    x-small
                  >
                    fa fa-plus
                  </v-icon>
                  card
                </v-btn>
              </div>
              <v-draggable
                :list="state.cards"
                :animation="200"
                :show-dropzone-areas="true"
                group="cards"
                class="board-states-item-draggable"
                @change="moveCard"
              >
                <state-card
                  v-for="(card) in state.cards"
                  v-show="!card.deleted"
                  :key="card.id"
                  :card="card"
                  class="mt-3 cursor-move"
                  @updateCard="updateCard"
                  @deleteCard="removeStateCard"
                  @add-tag="addCardTag"
                />
              </v-draggable>
            </v-sheet>
          </v-col>
        </v-draggable>
      </v-row>
    </div>

    <div class="dialogs">
      <board-dialog
        v-if="board"
        :open-dialog="editBoardDialog"
        :board="board"
        @save="saveBoard"
        @close="editBoardDialog = false"
      />
      <state-dialog
        v-if="board"
        title="Create new state"
        :open-dialog="newState"
        @save="createState"
        @close="newState = false"
      >
        <v-text-field
          v-model="stateName"
          label="New State Name"
          required
        />
      </state-dialog>

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
          <v-date-picker
            v-model="card.due_date"
            no-title
            scrollable
          />
        </v-menu>
      </card-dialog>
      <class-dialog
        v-if="board"
        title="Add Classroom"
        :open-dialog="newClass"
        @save="addClassroomState"
        @close="newClass = false"
      >
        <v-select
          :items="classrooms.filter(classroom => classroom.creator_id != $currentUser.id)"
          :menu-props="{ maxHeight: '400' }"
          label="Select"
          hint="Choose classes"
					v-model="selectedClass"
          persistent-hint
        >
					<template v-slot:selection="{ item }">
						<span>
							{{ item.name }}
						</span>
					</template>
					<template v-slot:item="{ item }">
						<span>
							{{ item.name }}
						</span>
					</template>
			</v-select>

        <v-select
          :items="states"
          :menu-props="{ maxHeight: '400' }"
          label="Select"
					v-model="selectedState"
          hint="Entry State"
          persistent-hint
        >
					<template v-slot:selection="{ item }">
						<span>
							{{ item.title }}
						</span>
					</template>
					<template v-slot:item="{ item }">
						<span>
							{{ item.title }}
						</span>
					</template>
				</v-select>
      </class-dialog>
    </div>
  </div>
</template>
<script>
	import Draggable from "vuedraggable";
	import StateCard from "@/components/board/StateCard";
	import EditBoardDialog from "@/components/board/EditBoardDialog";
	import Dialog from "@/components/Dialog";
	import Board from "@/mixins/boards.js";

	export default {
		components: {
			'board-dialog': EditBoardDialog,
			'state-card': StateCard,
			'card-dialog': Dialog,
			'class-dialog': Dialog,
			'state-dialog': Dialog,
			'v-draggable': Draggable
		},
		mixins: [Board],
		props: {
			boardId: {
				type: String,
				required: true
			},
		},
		data() {
			return {
				isHovering: false,
				classrooms: [],
				selectedState: {},
				selectedClass: {},
			};
		},
		watch: {
			boardId: function() {
				// If the board id changes, reload all board content
				this.getUserClassrooms();
				this.reloadPageContent()
			},

		},
		mounted() {
			this.getUserClassrooms();
			this.reloadPageContent();
		},
		methods: {
			getUserClassrooms(){
				this.$http.get('classrooms')
				.then(res => {
					// if classroom is deleted, remove it from the list
					this.classrooms = res.data.filter(c => c.deleted == false);
				})
				.catch(err => {
					console.error(err);
				})
			},
			addClassroomState(){
				if (!this.selectedClass.id || !this.selectedState.id) {
					this.$notify({
						type: 'error',
						title: 'Error',
						text: 'Please select a classroom and state.'
					});
					return;
				}

				this.$http.post('/user/classroom/state', {state_id: this.selectedState.id, classroom_id: this.selectedClass.id})
					.then(res => {
						res.data?.forEach(card =>
							this.states.find(state => state.id === card?.state_id)?.cards?.push(card)
						);
					}).catch(err => {
						console.error({err});
					});
				this.selectedState = {};
				this.selectedClass = {};
				this.newClass = false;
			},
			reloadPageContent() {
				this.getBoardInfo();
				this.getStates();
			},
		},
	}
</script>

<style lang="scss" scoped>
	.header {
		font-family: Poppins;
		font-size: 45px;
		font-weight: bold;
		color: #3f3f3f;
		margin-bottom: 20px;
		text-align: left;
		border-bottom: 1px solid #e6e6e6;
		display: flex;
		align-items: center;
		padding: 20px 30px;
	}

	.board {
		width: 100%;
		height: 100%;

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
			}
		}

		&-states {
			flex-wrap: nowrap;
			height: 80%;

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

				&-count {
					font-size: 12px;
					font-weight: 400;
					line-height: 24px;
					opacity: .57;
					display: inline;
				}

				&-draggable {
					height: 100%;
					min-height: 200px;
				}
			}
		}
	}

</style>
