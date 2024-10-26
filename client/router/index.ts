import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";
import { useRestaurantStore } from "../stores/restaurant";
import AddReview from "../views/AddReview.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import ProfileView from "../views/ProfileView.vue";
import RestaurantView from "../views/RestaurantView.vue";
import SearchView from "../views/SearchView.vue";
import SettingView from "../views/SettingView.vue";
import UserRegistrationView from "../views/UserRegistrationView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/setting",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const { isLoggedIn } = storeToRefs(useUserStore());
        if (isLoggedIn.value) {
          return { name: "Settings" };
        }
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: "/restaurant",
      name: "Restaurant",
      component: RestaurantView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const { hasRestaurant } = storeToRefs(useRestaurantStore());
        if (hasRestaurant.value) {
          return;
        }
      },
    },
    {
      path: "/search",
      name: "Search",
      component: SearchView,
      meta: { requiresAuth: false },
    },
    {
      path: "/review",
      name: "AddReview",
      component: AddReview,
      meta: { requiresAuth: false },
    },
    {
      path: "/register",
      name: "Register",
      component: UserRegistrationView,
      meta: { requiresAuth: false },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  }
});

export default router;
