import Vue from 'vue'
import App from './App.vue'

import router from './router'
import vuetify from '@/plugins/vuetify'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const client = axios.create({
  baseUrl: process.env.VUE_APP_BACKEND_URL
});
client.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;
client.interceptors.request.use(request => {
  request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return request;
});

Vue.config.productionTip = false
Vue.prototype.$http = client;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, _, next) => {
  if (!to.meta.noAuthRequired && !localStorage.getItem('token')) next({
    name: 'SignIn'
  })
  else next()
});
