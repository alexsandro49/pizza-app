import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUsersStore } from "@/stores/users";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/cart",
      name: "cart",
      meta: {
        requiresAuth: true,
      },
      component: () => import("@/views/ShoppingCartView.vue"),
    },
    {
      path: "/:productIndex",
      name: "product",
      meta: {
        requiresAuth: true,
      },
      component: () => import("@/views/ProductView.vue"),
    },
  ],
});

router.beforeEach((to, _, next) => {
  const usersStore = useUsersStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (usersStore.userData !== undefined) {
      next();
    } else {
      alert("You don`t have access!");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
