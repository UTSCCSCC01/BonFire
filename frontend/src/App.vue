<template>
  <div>
    <v-app id="inspire">
      <!-- Navbar -->
      <div class="nav">
        <v-app-bar
          v-if="$route.meta.noAuthRequired"
          app
          color="white"
          flat
        >
          <v-container class="py-0 fill-height">
            <v-avatar
              class="mr-10"
              color="grey darken-1"
              size="32"
            />
            <v-app-bar-title class="py-0">
              BonFire
            </v-app-bar-title>

            <v-btn
              v-for="link in links"
              :key="link"
              :to="link.to"
              text
            >
              {{ link.name }}
            </v-btn>

            <v-spacer />
          </v-container>
        </v-app-bar>
        <v-sidenav v-else />
      </div>

      <!-- Main -->
      <div class="container">
        <router-view class="router-view" />
      </div>

      <!-- Footer -->
      <v-footer
        v-if="$route.meta.noAuthRequired"
        color="primary lighten-1"
      >
        <v-row justify="center">
          <v-col
            class="primary lighten-1 text-center"
            cols="12"
          >
            About Something
          </v-col>
          <v-col
            class="primary lighten-2 py-4 text-center white--text"
            cols="12"
          >
            {{ new Date().getFullYear() }} — <strong>Hello World - 418</strong>
          </v-col>
        </v-row>
      </v-footer>
    </v-app>
  </div>
</template>
<script>
  import SideNav from './components/SideNav';

  export default {
    components: {
      'v-sidenav': SideNav
    },
    data() {
      return {
        links: [
          { name: 'Welcome', to: '/'},
          { name: 'Register', to: '/register'},
          { name: 'Signin', to: '/signin'},
        ],
      }
    },
    mounted() {
      console.log(this.links)
    }
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.router-view {
  min-height: 100%;
}
</style>
