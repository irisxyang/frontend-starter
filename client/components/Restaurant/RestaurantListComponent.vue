<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import RestaurantComponent from "./RestaurantComponent.vue";
import SearchRestaurantForm from "./SearchRestaurantForm.vue";

const loaded = ref(false);
let restaurants = ref<Array<Record<string, string>>>([]);

async function getRestaurants(name?: string) {
  let query: Record<string, string> = name ? { name } : {};
  let restaurantResults;
  try {
    if (name) {
      restaurantResults = await fetchy(`/api/restaurants/${name}`, "GET", { query });
    } else {
      restaurantResults = await fetchy(`/api/restaurants`, "GET", {});
    }
  } catch (_) {
    return;
  }
  restaurants.value = restaurantResults;
}

onBeforeMount(async () => {
  await getRestaurants();
  loaded.value = true;
});
</script>

<template>
  <SearchRestaurantForm @getRestaurantsByName="getRestaurants" />
  <section v-if="loaded && restaurants.length !== 0" class="border">
    <p>Restaurant List Component</p>
    <article v-for="restaurant in restaurants" :key="restaurant._id">
      <RestaurantComponent :restaurant="restaurant" />
    </article>
  </section>
  <p v-else-if="loaded">No restaurants found :/</p>
  <p v-else>Loading Restaurants...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  margin-left: 10%;
  margin-right: 10%;
}

article {
  background-color: var(--base-bg);
  /* border-radius: 1em; */
  display: flex;
  flex-direction: column;
  /* padding: 1em; */
}
</style>
