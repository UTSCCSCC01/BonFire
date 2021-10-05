import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";
import Register from "../views/Register.vue";

import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      noAuthRequired: true,
    },
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      noAuthRequired: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      noAuthRequired: true,
    },
    component: Register,
  },
  {
    path: "/signin",
    name: "SignIn",
    meta: {
      noAuthRequired: true,
    },
    component: SignIn,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
];

const router = new VueRouter({
  routes
})

export default router
