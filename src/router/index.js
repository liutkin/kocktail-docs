import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/gettingstarted",
    name: "gettingStarted",
    component: () => import("@/views/GettingStarted.vue"),
  },
  {
    path: "/api",
    name: "api",
    component: () => import("@/views/Api.vue"),
  },
  {
    path: "/example",
    name: "example",
    component: () => import("@/views/Example.vue"),
  },
  {
    path: "*",
    redirect: "api",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
