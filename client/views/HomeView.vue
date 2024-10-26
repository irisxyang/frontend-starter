<script setup lang="ts">
import ReviewListComponent from "@/components/Review/ReviewListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { RouterLink, useRoute } from "vue-router";

import { useRestaurantStore } from "@/stores/restaurant";

const { updateCurrentRestaurant, resetStore } = useRestaurantStore();

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);

async function updateRestaurant(res: string) {
  await updateCurrentRestaurant(res);
}

// resets store to hold no restaurant
async function resetRestaurant() {
  await resetStore();
}

onBeforeMount(async () => {
  await resetRestaurant();
});

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1 class="main-page-heading">Welcome to Omnom!</h1>
    <section>
      <h2 v-if="isLoggedIn">Glad you're back, {{ currentUsername }}.</h2>
      <h2 v-else>Log in to start reviewing!</h2>
    </section>
    <p class="intro-description">
      Click below to find a restaurant to review, or scroll down to see what your friends are reviewing. <br />
      Happy exploring!
    </p>
    <RouterLink :to="{ name: 'Search' }">
      <button class="main-button find-restaurant-button">Find a Restaurant</button>
    </RouterLink>
    <ReviewListComponent />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}

h2 {
  margin-bottom: 0;
}

.intro-description {
  text-align: center;
  margin-bottom: 0;
  padding: 1em;
  padding-bottom: 0.5em;
}

.find-restaurant-button {
  margin: 1.5em;
  font-size: 1.5em;
}
</style>
