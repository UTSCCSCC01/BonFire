<template>
  <div class="state-card">
    <v-card
      class="mx-auto"
    >
      <v-card-text>
        <p class="text-h8 text--primary">
          {{ task.title }}
        </p>
        <div class="text--primary">
          {{ task.summary }}
        </div>
      </v-card-text>
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
};
</script>
<style scoped lang="scss">

</style>