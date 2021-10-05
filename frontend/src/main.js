import Vue from 'vue'
import App from './App.vue'

import router from './router'
import vuetify from '@/plugins/vuetify' // path to vuetify export

Vue.config.productionTip = false

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = new Vue({
  router,
  vuetify,
  data: {
    currentUser: {},
    isAuthenticated: false,
  },
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (!to.meta.noAuthRequired && !app.isAuthenticated) next({
    name: 'SignIn'
  })
  else next()
})
