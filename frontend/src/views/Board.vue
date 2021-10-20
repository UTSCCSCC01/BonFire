<template>
  <div class="board mx-4">
    <v-title class="header">
			{{ board.title || 'Board' }}
			<v-spacer></v-spacer>
			<v-btn icon>
				<v-icon
					class="fas fa-edit"
					style="cursor:pointer;"
					@click="editBoardDialog = true"
				/>
			</v-btn>
    </v-title>
    <div class="board-body">
      <v-row class="board-states">
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
            </p>

            <v-draggable
              :list="state.cards"
              :animation="200"
              :show-dropzone-areas="true"
              group="tasks"
              class="board-states-item-draggable"
            >
              <state-card
                v-for="(task) in state.cards"
                :key="task.id"
                :task="task"
                class="mt-3 cursor-move"
              />
            </v-draggable>
          </v-sheet>
        </v-col>
      </v-row>
    </div>

    <board-dialog
      v-if="board"
      :open-dialog="editBoardDialog"
      :board="board"
			@save="saveBoard"
      @close="editBoardDialog = false"
    />
  </div>
</template>
<script>
	import Draggable from "vuedraggable";
	import StateCard from "@/components/board/StateCard";
	import EditBoardDialog from "@/components/board/EditBoardDialog";

	export default {
		components: {
			'board-dialog': EditBoardDialog,
			'state-card': StateCard,
			'v-draggable': Draggable
		},
		props: {
			boardId: {
				type: String,
				required: true
			},
		},
		data() {
			return {
				board: {},
				editBoardDialog: false,
				states: [
					{
						id: 1,
						title: 'To Do',
						order: 0,
						cards: [
							{
								id: 1,
								title: "Add discount code to checkout page",
								due_due_date: "Sep 14",
								tag: "Feature Request",
							},
							{
								id: 2,
								title: "Provide documentation on integrations",
								due_date: "Sep 12"
							},
						]
					},
					{
						id: 3,
						title: 'In Progress',
						order: 1,
						cards: [

							{
								id: 3,
								title: "Design shopping cart dropdown",
								due_date: "Sep 9",
								tag: "Design"
							},
							{
								id: 4,
								title: "Add discount code to checkout page",
								due_date: "Sep 14",
								tag: "Feature Request"
							},
						]
					},
					{
						id: 2,
						title: 'Done',
						order: 2,
						cards: [
							{
								id: 5,
								title: "Test checkout flow",
								due_date: "Sep 15",
								tag: "QA"
							}
						]
					}
				]
			};
		},
		watch: {
			boardId: function() {
				this.getBoardInfo()
			},
		},
		mounted() {
			this.getBoardInfo();
		},
		methods: {
			saveBoard(data) {
				this.board = data;
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
			height: 100%;
			display: inline-block;
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
				min-height: 200px;

				&-draggable {
					height: 100%;
					min-height: 200px;
				}
			}
		}
	}

</style>
