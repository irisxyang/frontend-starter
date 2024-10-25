<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["restaurant"]);
const emit = defineEmits(["editReview", "refreshReviews"]);
const reviewRestaurantName = ref("");
const reviewRestaurantAddress = ref("");
const reviewRestaurantURL = ref("");
const loaded = ref(false);

const getRestaurantInfo = async () => {
  let query: Record<string, string> = { id: props.restaurant };
  let restaurant;
  try {
    restaurant = await fetchy("/api/restaurants", "GET", { query });
  } catch (_) {
    return "Restaurant Not Found";
  }
  reviewRestaurantName.value = restaurant.name;
  reviewRestaurantAddress.value = restaurant.address;
  reviewRestaurantURL.value = restaurant.url;
};

onBeforeMount(async () => {
  await getRestaurantInfo();
  loaded.value = true;
});
</script>

<template>
  <div class="restaurant-info-container">
    <div class="restaurant-name">{{ reviewRestaurantName }}</div>
  </div>
</template>

<style scoped>
.restaurant-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em;
}

.restaurant-name {
  font-size: 2.5em;
}
</style>
