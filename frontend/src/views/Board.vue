<template>
	<div class="board">
		This is a board {{ boardId }}
	</div>
</template>

<script>
export default {
	props: {
		boardId: {
			// Query params passes params as string by default
			type: String,
			required: true
		}
	}
}
</script>

<style>

</style>