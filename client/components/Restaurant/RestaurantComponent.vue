<script setup lang="ts">
import { useRestaurantStore } from "@/stores/restaurant";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { weightedAverage } from "@/utils/getWeightedAverage";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["restaurant"]);
const { currentUsername, userWeighting, isLoggedIn } = storeToRefs(useUserStore());
const { updateCurrentRestaurant } = useRestaurantStore();
let reviews = ref<Array<Record<string, string>>>([]);
const loaded = ref(false);
const restaurantAvg = ref("");

async function updateRestaurant(res: string) {
  await updateCurrentRestaurant(res);
}

async function getReviews() {
  let query: Record<string, string> = { restaurant: props.restaurant._id };
  let reviewResults;
  try {
    reviewResults = await fetchy("/api/reviews", "GET", { query });
  } catch (_) {
    return;
  }
  reviews.value = reviewResults;
}

async function getAverage() {
  try {
    restaurantAvg.value = (await weightedAverage(userWeighting.value, reviews.value)).toFixed(2);
  } catch (_) {
    return;
  }
}

onBeforeMount(async () => {
  await getReviews();
  await getAverage();
  loaded.value = true;
});

// get reviews for restaurant
</script>

<template>
  <div class="restaurant-container">
    <div>
      <RouterLink :to="{ name: 'Restaurant' }" @click="updateCurrentRestaurant(props.restaurant._id)" class="restaurant-name">{{ props.restaurant.name }}</RouterLink>
      <div>{{ props.restaurant.address }}</div>
      <div>{{ props.restaurant.url }}</div>
    </div>
    <div class="weighted-avg-container">
      <span v-if="!Number.isNaN(restaurantAvg)">
        <div v-if="isLoggedIn">Weighted Average</div>
        <div v-else>Average</div>
        <div class="weighted-avg-number">{{ restaurantAvg }}</div>
      </span>
      <span v-else>No Reviews Yet</span>
    </div>
  </div>
</template>

<style scoped>
.weighted-avg-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.weighted-avg-number {
  display: flex;
  font-size: 2.5em;
  align-items: center;
  justify-content: center;
}
.restaurant-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: left;
  justify-content: space-between;
  border: 2px solid black;
  border-radius: 4px;
  padding: 1em;

  width: 35em;
}

.restaurant-name {
  font-size: 2em;
}
</style>
