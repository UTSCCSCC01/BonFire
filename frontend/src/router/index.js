import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "@/views/Home.vue";
import SignIn from "@/views/SignIn.vue";
import Register from "@/views/Register.vue";

import Dashboard from "@/views/Dashboard.vue";
import Board from "@/views/Board.vue";
import Classroom from "@/views/Classroom.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      noAuthRequired: true,
      title: "BonFire"
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
  {
    path: "/board/:boardId",
    name: "board",
    component: Board,
    props: true
  },
  {
    path: "/classroom/:classroomId",
    name: "class",
    component: Classroom,
    props: true
  },
];

const router = new VueRouter({
  routes
})

export default router
