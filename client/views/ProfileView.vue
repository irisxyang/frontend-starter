<script setup lang="ts">
import ReviewListComponent from "@/components/Review/ReviewListComponent.vue";
import { useRestaurantStore } from "@/stores/restaurant";
import { useUserStore } from "@/stores/user";
import { useViewingStore } from "@/stores/viewing";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { currentUsername } = storeToRefs(useUserStore());
const { updateSession } = useUserStore();
const userId = ref("");
const foodWeight = ref(0);
const serviceWeight = ref(0);
const ambienceWeight = ref(0);
const priceWeight = ref(0);
const noveltyWeight = ref(0);

const { resetStore } = useRestaurantStore();

const { resetReviewStore } = useViewingStore();

// const profileIsCurrentUser = ref(false);

void updateSession();

async function loadUserInfo() {
  // let query: Record<string, string> = { username: currentUsername.value };
  // try {
  //   userId.value = await fetchy(`api/user/weightings`, "GET");
  // } catch (_) {
  //   return;
  // }
  let preference;
  try {
    preference = await fetchy("/api/user/weightings", "GET");
  } catch (_) {
    return;
  }
  console.log(userId.value);
  foodWeight.value = Number(preference.food);
  serviceWeight.value = Number(preference.service);
  ambienceWeight.value = Number(preference.ambience);
  priceWeight.value = Number(preference.price);
  noveltyWeight.value = Number(preference.novelty);
}
// resets store to hold no restaurant
async function resetRestaurant() {
  await resetStore();
}

// resets store to hold no restaurant
async function resetReview() {
  await resetReviewStore();
}

onBeforeMount(async () => {
  await loadUserInfo();
  await resetRestaurant();
  await resetReview();
});
</script>

<template>
  <main>
    <info class="profile-header">
      <div>
        <h1 style="margin-bottom: 0.5em; margin-top: 0; padding-top: 0">{{ currentUsername }}</h1>
        <RouterLink :to="{ name: 'Settings' }" class="main-button" style="margin-bottom: 1em">Edit Profile</RouterLink>
      </div>
      <div class="weightings-container">
        <span class="weightings-title">My Weightings</span>
        <span>food: {{ foodWeight }}</span>
        <span>service: {{ serviceWeight }}</span>
        <span>ambience: {{ ambienceWeight }}</span>
        <span>price: {{ priceWeight }}</span>
        <span>novelty: {{ noveltyWeight }}</span>
      </div>
    </info>
    <ReviewListComponent profileUser="true" />
  </main>
</template>

<style scoped>
.weightings-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 2px solid black;
  border-radius: 4px;
  padding: 1em;
}

.weightings-title {
  font-size: 1.2em;
  margin-bottom: 0.3em;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}

.profile-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 70%;
  margin-bottom: 1em;
  padding: 1em;
  padding-top: 2em;
  margin-top: 2em;
}

h1 {
  padding-top: 1em;
  padding-bottom: 0.5em;
  margin-bottom: 1em;
  text-align: center;
  font-size: 2.5em;
}
</style>
