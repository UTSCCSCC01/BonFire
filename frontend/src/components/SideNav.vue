<template>
	<div class="sidebar">
		<v-navigation-drawer class="pt-4" color="grey lighten-3" app permanent expand-on-hover>
      <v-list>
				<v-list-item to="/dashboard">
					<v-list-item-content>
						<v-list-item-title class="text-h6">
							My Dashboard
						</v-list-item-title>
						<v-list-item-subtitle>Student Dashboard</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>

				<v-divider/>
				<!-- Render this list using v-for and load in user boards and other elements -->
				<v-toolbar-title class="text-h6 px-3">My Campsites</v-toolbar-title>
        <v-list nav dense>
          <v-list-item to="/board/10">
            <v-list-item-icon>
              C43
            </v-list-item-icon>
            <v-list-item-title>CSCC43 - Introduction to Somthing</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider/>
				<!-- Render this list using v-for and load in user boards and other elements -->
				<v-toolbar-title class="text-h6 px-3">My Campfires</v-toolbar-title>
        <v-list nav dense>
          <v-list-item to="/board/1">
            <v-list-item-icon>
              <v-icon>fas fa-fire</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Personal Board 1</v-list-item-title>
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