import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/gettingstarted",
    name: "gettingStarted",
    meta: {
      title: "🍸Kocktail › Getting started",
    },
    component: () => import("@/views/GettingStarted.vue"),
  },
  {
    path: "/api",
    name: "api",
    meta: {
      title: "🍸Kocktail › API",
    },
    component: () => import("@/views/Api.vue"),
  },
  {
    path: "/example",
    name: "example",
    meta: {
      title: "🍸Kocktail › Example",
    },
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

router.beforeEach((to, _, next) => {
  document.title = to.meta.title || "🍸Kocktail";
  next();
});

export default router;
