import { defineStore } from "pinia";
import { ref } from "vue";

export const useRestaurantStore = defineStore(
  "restaurant",
  () => {
    const currentRestaurant = ref("");

    const hasRestaurant = ref(false);

    const updateCurrentRestaurant = async (res: string) => {
      //   const query: Record<string, string> = { res };
      //   try {
      //     const { restaurant } = await fetchy("/api/restaurants", "GET", { query });
      //     currentRestaurant.value = restaurant;
      //   } catch {
      //     currentRestaurant.value = "";
      //   }
      currentRestaurant.value = res;
      hasRestaurant.value = true;
    };

    const resetStore = () => {
      currentRestaurant.value = "";
      hasRestaurant.value = false;
    };

    return {
      currentRestaurant,
      hasRestaurant,
      updateCurrentRestaurant,
      resetStore,
    };
  },
  { persist: true },
);
