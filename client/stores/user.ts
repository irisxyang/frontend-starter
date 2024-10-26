import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { fetchy } from "@/utils/fetchy";

export const useUserStore = defineStore(
  "user",
  () => {
    const currentUsername = ref("");
    const userWeighting = ref({ food: "5", service: "5", ambience: "5", price: "5", novelty: "5" });

    const isLoggedIn = computed(() => currentUsername.value !== "");

    const resetStore = () => {
      currentUsername.value = "";
    };

    const createUser = async (username: string, password: string) => {
      await fetchy("/api/users", "POST", {
        body: { username, password },
      });
    };

    const loginUser = async (username: string, password: string) => {
      await fetchy("/api/login", "POST", {
        body: { username, password },
      });
    };

    const updateSession = async () => {
      try {
        const { username } = await fetchy("/api/session", "GET", { alert: false });
        currentUsername.value = username;
        const weighting = await fetchy("api/user/weightings", "GET");
        userWeighting.value = weighting;
      } catch {
        currentUsername.value = "";
        userWeighting.value = { food: "5", service: "5", ambience: "5", price: "5", novelty: "5" };
      }
    };

    const logoutUser = async () => {
      await fetchy("/api/logout", "POST");
      resetStore();
    };

    const updateUserUsername = async (username: string) => {
      await fetchy("/api/users/username", "PATCH", { body: { username } });
    };

    const updateUserPassword = async (currentPassword: string, newPassword: string) => {
      await fetchy("/api/users/password", "PATCH", { body: { currentPassword, newPassword } });
    };

    const updateUserPreference = async (food: string, ambience: string, service: string, price: string, novelty: string) => {
      await fetchy("/api/user/weightings", "PATCH", { body: { food, ambience, service, price, novelty } });
    };

    const deleteUser = async () => {
      await fetchy("/api/users", "DELETE");
      resetStore();
    };

    return {
      currentUsername,
      userWeighting,
      isLoggedIn,
      createUser,
      loginUser,
      updateSession,
      logoutUser,
      updateUserUsername,
      updateUserPassword,
      updateUserPreference,
      deleteUser,
    };
  },
  { persist: true },
);
