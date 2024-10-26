import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchy } from "../utils/fetchy";

export const useViewingStore = defineStore(
  "viewing",
  () => {
    const currentlyViewingUser = ref("");
    // const currentlyViewingReview = ref({ comment: "", food: "0", service: "0", ambience: "0", price: "0", novelty: "0" });
    const currentlyViewingReview = ref<Record<string, string>>();
    const currentlyViewingReviewPreference = ref<Record<string, string>>();
    const hasReview = ref(false);

    const updateCurrentlyViewing = async (user: string) => {
      currentlyViewingUser.value = user;
    };
    const updateCurrentlyViewingReview = async (review: Record<string, string>) => {
      currentlyViewingReview.value = review;
      let preferences;
      const query = { review: review._id };
      try {
        preferences = await fetchy("/api/review/preference", "GET", { query });
      } catch (_) {
        preferences = { food: "0", service: "0", ambience: "0", price: "0", novelty: "0" };
      }
      currentlyViewingReviewPreference.value = preferences;
      hasReview.value = true;
    };

    const resetReviewStore = () => {
      currentlyViewingUser.value = "";
      hasReview.value = false;
    };
    return { currentlyViewingUser, currentlyViewingReview, currentlyViewingReviewPreference, hasReview, updateCurrentlyViewingReview, resetReviewStore };
  },
  { persist: true },
);
// export const useViewingStore = defineStore(

//   "user",
//   () => {
//     const currentlyViewingUser = ref("");

//     const isLoggedIn = computed(() => currentUsername.value !== "");

//     const resetStore = () => {
//       currentUsername.value = "";
//     };

//     const createUser = async (username: string, password: string) => {
//       await fetchy("/api/users", "POST", {
//         body: { username, password },
//       });
//     };

//     const loginUser = async (username: string, password: string) => {
//       await fetchy("/api/login", "POST", {
//         body: { username, password },
//       });
//     };

//     const updateSession = async () => {
//       try {
//         const { username } = await fetchy("/api/session", "GET", { alert: false });
//         currentUsername.value = username;
//       } catch {
//         currentUsername.value = "";
//       }
//     };

//     const logoutUser = async () => {
//       await fetchy("/api/logout", "POST");
//       resetStore();
//     };

//     const updateUserUsername = async (username: string) => {
//       await fetchy("/api/users/username", "PATCH", { body: { username } });
//     };

//     const updateUserPassword = async (currentPassword: string, newPassword: string) => {
//       await fetchy("/api/users/password", "PATCH", { body: { currentPassword, newPassword } });
//     };

//     const deleteUser = async () => {
//       await fetchy("/api/users", "DELETE");
//       resetStore();
//     };

//     return {
//       currentUsername,
//       isLoggedIn,
//       createUser,
//       loginUser,
//       updateSession,
//       logoutUser,
//       updateUserUsername,
//       updateUserPassword,
//       deleteUser,
//     };
//   },
//   { persist: true },
// );
