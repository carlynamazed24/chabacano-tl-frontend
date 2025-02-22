import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/translator",
    name: "translator",
    component: () => import("../views/Translator.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
