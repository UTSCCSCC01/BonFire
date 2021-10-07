<template>
  <div class="board">
    This is a board {{ board.id }} named {{ board.title }}
  </div>
</template>

<script>
	export default {
		props: {
			boardId: {
				// Query params passes params as string by default
				type: String,
				required: true
			},
		},

		data() {
			return {
				board: {},
			};
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
		
		watch: {
			
		}

	}
</script>

<style>

</style>