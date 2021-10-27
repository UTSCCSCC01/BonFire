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
          tile
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
          tile
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
						<p class="board-states-item-title">
							{{ state.title }}
								<v-btn class="board-states-item-btn" color="#f7f7f7"
									@click="showNewCard(state)"
									x-small
									elevation="0"
								>
									<v-icon left x-small>fa fa-plus</v-icon>
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
								v-for="(task) in state.cards"
								:key="task.id"
								:task="task"
								@deleteCard="removeStateCard"
								class="mt-3 cursor-move"
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
        @save="createCard"
        @close="newClass = false"
      >
        <v-select
          :items="classrooms.map(c => c.name)"
          :menu-props="{ maxHeight: '400' }"
          label="Select"
          multiple
          hint="Choose classes"
          persistent-hint
        ></v-select>

				<v-select
          :items="states.map(s => s.title)"
          :menu-props="{ maxHeight: '400' }"
          label="Select"
          hint="Entry State"
          persistent-hint
        ></v-select>
      </class-dialog>
    </div>
  </div>
</template>
<script>
	import Draggable from "vuedraggable";
	import StateCard from "@/components/board/StateCard";
	import EditBoardDialog from "@/components/board/EditBoardDialog";
	import Dialog from "@/components/Dialog";

	export default {
		components: {
			'board-dialog': EditBoardDialog,
			'state-card': StateCard,
			'card-dialog': Dialog,
			'class-dialog': Dialog,
			'state-dialog': Dialog,
			'v-draggable': Draggable
		},
		props: {
			boardId: {
				type: String,
				required: true
			},
			currentUser: {
				type: Object,
				required: true
			},
		},
		data() {
			return {
				board: {},
				classrooms: [],
				editBoardDialog: false,
				states: [],
				newState: false,
				newClass: false,
				stateName: '',
				newCard: false,
				card: {},
				menu: false,
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
					this.classrooms = res.data;
				})
				.catch(err => {
					console.error(err);
				})
			},
			saveBoard(data) {
				this.board = data;
			},
			showNewCard(state) {
				this.card = {
					state,
				}
				this.newCard = true;
			},
			removeStateCard(card) {
				const state = this.states.find(state => state.id === card.state_id);
				state.cards = state.cards.filter(stateCard => stateCard.id !== card.id);
			},
			moveCard(e) {
				console.log({ e });
				const event = e.added || e.moved;
				if (event) {
					const newState = this.states.find(state => state.cards.find(card => card.id === event.element.id));
					this.updateCardState(event.element.id, newState.id, event.newIndex);
				}
			},
			updateCardState(card_id, state_id, order) {
				this.$http.put(`/boards/${this.boardId}/reorder-cards`, { card_id, state_id, order })
					.then(res => {
						console.log({res})
					}).catch(err => {
						console.error({err});
					});
			},
			createCard() {
				this.newCard = false;
				this.card.state_id = this.card.state.id;
				delete this.card.state;

				if (this.card.due_date) {
					let date = this.card.due_date.split('-');
					this.card.due_date = new Date(date[0], date[1] - 1, date[2]).toISOString()
				}

				this.$http.post('cards', this.card)
					.then(res => {
						this.$notify({
							type: "success",
							title: "Successfully Create a new card",
						});

						this.states.find(state => state.id == res.data.state_id).cards.push(res.data);
					})
					.catch(err => {
						this.$notify({
							type: "error",
							title: "Failed to create card",
							text: `Failed to create ${this.card.title}`,
						});
						console.error(err);
					})
					.finally(() => {
						this.card = {};
					})
			},
			createState() {
				this.$http.post('states', { board_id: this.boardId, title: this.stateName })
					.then(res => {
						this.$notify({
							type: "success",
							title: "Successfully Create a new state",
						});
						this.states.push({ cards: [], ...res.data });
						this.reorganizeStates();
					})
					.catch(err => {
						this.$notify({
							type: "error",
							title: "Failed to create state",
							text: `Failed to create ${this.stateName}`,
						});
						console.error(err);
					})
					.finally(() => {
						this.stateName = '';
						this.newState = false;
					})
			},
			reorganizeStates() {
				this.states.sort((a, b) => {
					if (a.type === 'TODO') return -1;
					if (a.type === 'DONE') return 1;

					if (b.type === 'TODO') return 1;
					if (b.type === 'DONE') return -1;

					return a.order - b.order;
				})
			},
			orderChange(event) {
				if (['TODO', 'DONE'].includes(this.states[event.moved.newIndex].type) ||
							['TODO', 'DONE'].includes(this.states[event.moved.oldIndex].type)) {
					this.$notify({
            type: "error",
            title: "Can't reorder fixed states",
            text: "You can't move the TODO or DONE states",
          });
					this.reorderStates(event.moved.oldIndex, event.moved.newIndex);
					return;
				}
				this.$http.put(`boards/${this.boardId}/reorder-states`, event.moved)
					.then(() => {
						this.$notify({
							type: "success",
							title: "Reorganized states",
						});
					})
					.catch(err => {
						this.reorderStates(event.moved.oldIndex, event.moved.newIndex);
						console.error(err);
					})
			},
			reorderStates(oldIndex, newIndex) {
				let moved = this.states.splice(newIndex, 1);
				this.states.splice(oldIndex, 0, moved[0]);
			},
			reloadPageContent() {
				this.getBoardInfo();
				this.getStates();
			},
			getStates() {
				this.$http.get(`boards/${this.boardId}/states?include=cards`)
					.then(res => {
						this.states = res.data;
						this.states.forEach(state => {
							if (!state.cards) this.$set(state, 'cards', [])
						});

						this.reorganizeStates();
					})
					.catch(err => {
						console.error(err);
					})
			},
			getBoardInfo() {
				this.$http.get(`boards/${this.boardId}`)
					.then(res => {
						this.board = res.data;
					})
					.catch(err => {
						console.error(err);
					})
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
		padding: 0 30px;
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

				&-btn {

				}
			}
		}

		&-states {
			flex-wrap: nowrap;

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

</style>
