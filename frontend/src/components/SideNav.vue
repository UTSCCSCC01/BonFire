<template>
  <div id="sidebar">
    <create-board-dialog
      :open-dialog="createNewBoard"
      @close-dialog="createNewBoard = false"
      @add-board="addBoard"
    />
    <v-navigation-drawer
      class="pt-4"
      color="#FBE7D3"
      :mini-variant="collapsed"
      app
      permanent
    >
      <v-list>
        <v-list-item to="/dashboard">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              <v-icon>fas fa-home</v-icon>
              My Dashboard
            </v-list-item-title>
            <v-list-item-subtitle v-if="!collapsed">
              Student Dashboard
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />
      <!-- Render this list using v-for and load in user boards and other elements -->
      <v-toolbar-title
        v-if="!collapsed"
        class="text-h6 px-3"
      >
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
      <v-toolbar-title
        v-if="!collapsed"
        class="text-h6 px-3"
      >
        <v-icon>fas fa-campfire</v-icon>
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
            <v-icon icon color="dark-grey">fas fa-fire</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ board.title }}</v-list-item-title>
          <v-btn align="right" icon color="dark-grey" @click="deleteBoard(board)"> 
            <v-icon x-small> fa fa-times </v-icon> 
          </v-btn>
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
        <v-list-item @click="collapsed = !collapsed">
          <v-list-item-icon>
            <v-icon>fas fa-{{ collapsed ? "angle-double-right" : "angle-double-left" }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title />
        </v-list-item>
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
import CreateBoardDialog from './board/CreateBoardDialog';

export default {
  components: {
    'create-board-dialog': CreateBoardDialog,
  },
  data() {
    return {
      drawer: [],
      createNewBoard: false,
      boards: [],
      collapsed: true,
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

    addBoard(data) {
      this.boards.push(data);
    },

    deleteBoard(board) {

      let confirmation = confirm(`Are you sure you want to delete board ${board.title}`);

      if (confirmation) {
        this.$http.delete(`boards/${board.id}`)
        .then(() => {
          if (board.id == this.$route.params.boardId) this.$router.push({ name: 'Dashboard' });
        })
        .catch(err => {
          console.error(err);
        })
      }
      
    },

  },
};

</script>

<style>
#sidebar {
  font-family: Poppins;
}
</style>
