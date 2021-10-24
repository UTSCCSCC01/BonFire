<template>
  <div class="state-card" @click="modifyCard(task)">
    <v-card
      class="mx-auto shadow-sm"
      outlined
    >
      <v-card-text>
        <p class="text-h8 text--primary">
          {{ task.title }}
        </p>
        <div class="text--primary">
          {{ task.desc }}
        </div>
      </v-card-text>

      <v-btn align="right" icon color="dark-grey" @click="deleteCard(task)"> 
        <v-icon x-small> fa fa-times </v-icon> 
      </v-btn>

    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    deleteCard(card) {
				let confirmation = confirm(`Are you sure you want to delete card ${card.title}`);

				if (confirmation) {
					this.$http.delete(`cards/${card.id}`)
					.then(() => {
						//Good
					})
					.catch(err => {
					console.error(err);
					})
				}

			},
  },

};
</script>
<style scoped lang="scss">

</style>