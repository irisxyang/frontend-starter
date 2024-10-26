<script setup lang="ts">
import ReviewListComponent from "@/components/Review/ReviewListComponent.vue";
import { useRestaurantStore } from "@/stores/restaurant";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { RouterLink } from "vue-router";

const { currentUsername } = storeToRefs(useUserStore());
const { updateSession } = useUserStore();
const userId = ref("");
const foodWeight = ref(0);
const serviceWeight = ref(0);
const ambienceWeight = ref(0);
const priceWeight = ref(0);
const noveltyWeight = ref(0);

const { resetStore } = useRestaurantStore();

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

onBeforeMount(async () => {
  await loadUserInfo();
  await resetRestaurant();
});
</script>

<template>
  <main>
    <info class="profile-header">
      <div>
        <h1>{{ currentUsername }}</h1>
        <RouterLink :to="{ name: 'Settings' }" class="main-button">Edit Profile</RouterLink>
      </div>
      <div class="weightings-container">
        My Weightings:
        <span>food: {{ foodWeight }}</span>
        <span>service: {{ serviceWeight }}</span>
        <span>ambience: {{ ambienceWeight }}</span>
        <span>price: {{ priceWeight }}</span>
        <span>novelty: {{ noveltyWeight }}</span>
      </div>
    </info>
    <ReviewListComponent />
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

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}

.profile-header {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 1em;
}

h1 {
  padding-top: 1em;
  margin-bottom: 0;
  text-align: center;
  font-size: 2.5em;
}
</style>
