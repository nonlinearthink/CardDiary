import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/HomePage.vue"),
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
    component: () => import("../views/AddPage.vue"),
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("../views/CalendarPage.vue"),
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("../views/SettingPage.vue"),
  },
  {
    path: "/diary/all",
    name: "Diary",
    component: () => import("../views/AllDiaryPage.vue"),
  },
  {
    path: "/diary/favor",
    name: "Diary",
    component: () => import("../views/FavorDiaryPage.vue"),
  },
  {
    path: "/tag",
    name: "Tag",
    component: () => import("../views/TagPage.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
