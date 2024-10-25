<script setup lang="ts">
import ReviewListComponent from "@/components/Review/ReviewListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

import { useRestaurantStore } from "@/stores/restaurant";

const { updateCurrentRestaurant } = useRestaurantStore();

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const restest = "6712d7b39b00bf42cf65bc3e";

async function updateRestaurant(res: string) {
  await updateCurrentRestaurant(res);
}

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
    <RouterLink :to="{ name: 'Restaurant' }">
      <button v-on:click="updateRestaurant(restest)">go to restaurant</button>
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
