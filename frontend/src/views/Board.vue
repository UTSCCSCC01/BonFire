<template>
  <div class="board">
    <div class="header">
      <div class="title text-h3">
        {{ board.title }}
      </div>
    </div>
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
  </div>
</template>
<script>
	import Draggable from "vuedraggable";
	import StateCard from "@/components/board/StateCard";

	export default {
		components: {
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