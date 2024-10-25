<script setup lang="ts">
import RestaurantListComponent from "@/components/Restaurant/RestaurantListComponent.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

let restaurants = ref<Array<Record<string, string>>>([]);
let searchQuery = ref("");
const loaded = ref(false);

async function getRestaurants(name?: string) {
  let query: Record<string, string> = name ? { name: name } : {};
  let restaurantResults;
  if (name) {
    try {
      restaurantResults = await fetchy(`/api/restaurants/${name}`, "GET", { query });
    } catch (_) {
      return;
    }
  } else {
    try {
      restaurantResults = await fetchy(`/api/restaurants`, "GET", { query });
    } catch (_) {
      return;
    }
  }
  restaurants.value = restaurantResults;
  if (name) {
    searchQuery.value = name;
  }
}

onBeforeMount(async () => {
  await getRestaurants();
  loaded.value = true;
});
</script>

<template>
  <main>
    <h1 class="main-page-heading">Find a Restaurant</h1>
    <!-- <SearchRestaurantForm @getRestaurantsByName="getRestaurants" />
    <div v-if="!searchQuery">No Inpt</div>
    <div v-else>{{ searchQuery }}</div>
    <div v-if="loaded && restaurants.length">
      hi
      <div v-if="!searchQuery">No Input for list</div>
      <div v-else>
        {{ restaurants }}
        {{ searchQuery }} -->
    <RestaurantListComponent />
    <!-- </div>
    </div> -->
    <!-- <div v-else>No restaurants found.</div> -->
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
