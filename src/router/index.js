import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Edit from "../views/Edit.vue";
import store from "../store";

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
    // beforeEnter: (to, from, next) => {
    //   if (store.state.files.length === 0) {
    //     next("/");
    //     return;
    //   }
    //   next();
    // },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
