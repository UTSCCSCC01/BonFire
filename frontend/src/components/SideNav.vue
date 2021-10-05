<template>
	<div class="sidebar">
		<v-navigation-drawer class="pt-4" color="grey lighten-3" app permanent expand-on-hover>
      <v-list>
				<v-list-item link>
					<v-list-item-content>
						<v-list-item-title class="text-h6">
							My Dashboard
						</v-list-item-title>
						<v-list-item-subtitle>Student Dashboard</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>

        <v-divider></v-divider>
				<v-toolbar-title>My Campfires</v-toolbar-title>
				<!-- Render this list using v-for and load in user boards and other elements -->
        <v-list nav dense>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>fas fa-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Files</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			drawer: []
		}
	},
	mounted() {
		console.log(this.currentUser, this.isAuthenticated)
	}
}
</script>

<style>

</style>