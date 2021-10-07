<template>
  <div class="sidebar">
    <create-board-dialog
      :open-dialog="createNewBoard"
      @close-dialog="createNewBoard = false"
    />
    <v-navigation-drawer
      class="pt-4"
      color="grey lighten-3"
      app
      permanent
      expand-on-hover
    >
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

      <v-divider />
      <!-- Render this list using v-for and load in user boards and other elements -->
      <v-toolbar-title class="text-h6 px-3">
        My Campsites
      </v-toolbar-title>
      <v-list
        nav
        dense
      >
        <v-list-item to="/board/10">
          <v-list-item-icon> C43 </v-list-item-icon>
          <v-list-item-title>
            CSCC43 - Introduction to Somthing
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider />
      <!-- Render this list using v-for and load in user boards and other elements -->
      <v-toolbar-title class="text-h6 px-3">
        My Campfires
      </v-toolbar-title>
      <v-list
        nav
        dense
      >
        <v-list-item
          v-for="board in boards"
          :key="board.id"
          :to="`/board/${board.id}`"
        > 
          <v-list-item-icon>
            <v-icon>fas fa-fire</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ board.title }}</v-list-item-title>
        </v-list-item>

        <v-list-item @click="createNewBoard = true">
          <v-list-item-icon>
            <v-icon color="green">
              fas fa-plus
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>Create new Board</v-list-item-title>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list-item @click="signOut">
          <v-list-item-icon>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sign Out</v-list-item-title>
        </v-list-item>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import CreateBoardDialog from './CreateBoardDialog';

export default {
  components: {
    'create-board-dialog': CreateBoardDialog,
  },
  data() {
    return {
      drawer: [],
      createNewBoard: false,
      boards: [],
    };
  },
  mounted() {
    this.getUserBoards();
  },
  methods: {
    signOut() {
      localStorage.removeItem('token');
      this.$router.push('/');
    },

    getUserBoards() {
      this.$http.get('boards')
      .then(res => {
        this.boards = res.data;
      })
      .catch(err => {
        console.error(err);
      })
    },

  },
};

</script>

<style>
</style>
