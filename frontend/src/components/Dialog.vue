<template>
  <div class="board-dialog">
    <v-dialog
      v-model="openDialog"
      persistent
      max-width="600px"
    >
      <!-- Dialog Card -->
      <v-card>
        <slot name="header">
          <v-card-title>
            {{ title }}
          </v-card-title>
        </slot>
        <v-card-text>
          <v-container>
            <slot />
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <slot name="footer">
            <v-btn
              color="blue darken-1"
              text
              @click="$emit('close')"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              :disabled="!saveable"
              :loading="saving"
              @click="$emit('save')"
            >
              Save
            </v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    openDialog: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
		saveable: {
      type: Boolean,
      required: false,
			default: true
    },
		saving: {
      type: Boolean,
      required: false
    },
  },
}
</script>
<style>

</style>
