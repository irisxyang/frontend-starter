<script setup lang="ts">
import RestaurantInfoComponent from "@/components/Restaurant/RestaurantInfoComponent.vue";
import ReviewListComponent from "@/components/Review/ReviewListComponent.vue";
import { useRestaurantStore } from "@/stores/restaurant";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const loaded = ref(false);
const { currentRestaurant } = storeToRefs(useRestaurantStore());
const fetchedRestaurant = ref("");
const createReview = ref(false);

async function getRestaurant(res: string) {
  let query: Record<string, string> = { id: res };
  let restaurant;
  try {
    restaurant = await fetchy("/api/restaurants", "GET", { query });
  } catch (_) {
    return;
  }
  fetchedRestaurant.value = restaurant ? restaurant : "";
}

onBeforeMount(async () => {
  await getRestaurant(currentRestaurant.value);
  loaded.value = true;
});
</script>

<template>
  <main>
    <RestaurantInfoComponent :restaurant="currentRestaurant" />
    <RouterLink :to="{ name: 'AddReview' }" class="main-button" style="margin-bottom: 1em">Review This Restaurant!</RouterLink>
    <ReviewListComponent />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
