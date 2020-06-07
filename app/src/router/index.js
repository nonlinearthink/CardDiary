import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/",
    name: "login",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignupPage.vue"),
  },
  {
    path: "/add",
    name: "Add",
    component: () => import("../views/Add.vue"),
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("../views/CalendarPage.vue"),
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("../views/Setting.vue"),
  },
  {
    path: "/diary",
    name: "Diary",
    component: () => import("../views/DiaryList.vue"),
  },
  {
    path: "/tag",
    name: "Tag",
    component: () => import("../views/Tag.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
