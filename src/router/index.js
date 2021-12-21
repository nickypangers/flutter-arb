import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Edit from "../views/Edit.vue";
import Guide from "../views/Guide.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Edit",
    path: "/edit",
    component: Edit,
  },
  {
    name: "Guide",
    path: "/guide",
    component: Guide,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
