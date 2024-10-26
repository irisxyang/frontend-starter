<script setup lang="ts">
import { useRestaurantStore } from "@/stores/restaurant";
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { RouterLink } from "vue-router";
import { fetchy } from "../../utils/fetchy";

const { updateCurrentRestaurant } = useRestaurantStore();

const props = defineProps(["review"]);
const emit = defineEmits(["editReview", "refreshReviews"]);
const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const restaurantId = ref(props.review.restaurant);
const reviewRestaurantName = ref("");
const reviewRestaurantAddress = ref("");
const reviewUsername = ref("");
const loaded = ref(false);

const foodScore = ref(0);
const serviceScore = ref(0);
const ambienceScore = ref(0);
const priceScore = ref(0);
const noveltyScore = ref(0);

const weightedAverage = ref("");

const deleteReview = async () => {
  try {
    await fetchy(`/api/reviews/${props.review._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshReviews");
};

const getReviewerName = async (reviewer: string) => {
  let query: Record<string, string> = { id: reviewer };
  let user;
  try {
    user = await fetchy(`/api/users`, "GET", { query });
  } catch (_) {
    return "User Not Found";
  }
  reviewUsername.value = user.username;
};

const getRestaurantInfo = async (res: string) => {
  let query: Record<string, string> = { id: res };
  let restaurant;
  try {
    restaurant = await fetchy("/api/restaurants", "GET", { query });
  } catch (_) {
    return "Restaurant Not Found";
  }
  reviewRestaurantName.value = restaurant.name;
  reviewRestaurantAddress.value = restaurant.address;
};

const getPreferences = async () => {
  let query: Record<string, string> = { review: props.review._id };
  let preference;
  try {
    preference = await fetchy("/api/review/preference", "GET", { query });
  } catch (_) {
    return;
  }
  // assume same weights if not logged in
  foodScore.value = isLoggedIn ? Number(preference.food) : 5;
  serviceScore.value = isLoggedIn ? Number(preference.service) : 5;
  ambienceScore.value = isLoggedIn ? Number(preference.ambience) : 5;
  priceScore.value = isLoggedIn ? Number(preference.price) : 5;
  noveltyScore.value = isLoggedIn ? Number(preference.novelty) : 5;
};

async function updateRestaurant(res: string) {
  await updateCurrentRestaurant(res);
}

async function calculateAverage() {
  //   // get current user
  //   let userId;
  //   try {
  //     userId = (await fetchy(`/api/users/${currentUsername.value}`, "GET"))._id;
  //   } catch (_) {
  //     return;
  //   }
  let currentUserWeightings;
  try {
    currentUserWeightings = await fetchy(`/api/user/weightings`, "GET");
  } catch (_) {
    return;
  }

  const weightingSum = currentUserWeightings.food + currentUserWeightings.service + currentUserWeightings.ambience + currentUserWeightings.price + currentUserWeightings.novelty;
  weightedAverage.value = (
    (1 / weightingSum) *
    (currentUserWeightings.food * foodScore.value +
      currentUserWeightings.service * serviceScore.value +
      currentUserWeightings.ambience * ambienceScore.value +
      currentUserWeightings.price * priceScore.value +
      currentUserWeightings.novelty * noveltyScore.value)
  ).toFixed(2);
}

onBeforeMount(async () => {
  await getRestaurantInfo(props.review.restaurant);
  await getReviewerName(props.review.reviewer);
  await getPreferences();
  await calculateAverage();
  loaded.value = true;
});
</script>

<template>
  <div class="review-full-container">
    <span>
      <div class="review-title">
        <RouterLink :to="{ name: 'Restaurant' }" v-on:click="updateRestaurant(restaurantId)">
          <p class="review-restaurant">{{ reviewRestaurantName }}</p>
          <!-- <button v-on:click="updateRestaurant(restaurantId)" class="review-restaurant">{{ reviewRestaurantName }}</button> -->
        </RouterLink>
        <p class="review-reviewer">{{ reviewUsername }}</p>
      </div>
      <div class="review-title">
        <p>{{ reviewRestaurantAddress }}</p>
        <div class="base">
          <article class="timestamp">
            <p v-if="props.review.dateCreated !== props.review.dateUpdated">Edited on: {{ formatDate(props.review.dateUpdated) }}</p>
            <p v-else>{{ formatDate(props.review.dateCreated) }}</p>
          </article>
        </div>
      </div>
    </span>
    <span class="review-content">
      <div class="review-content-container" style="margin-right: 0.5em">
        <div v-if="isLoggedIn" class="content-subheading">Weighted Average: {{ weightedAverage }}</div>
        <div v-else class="content-subheading">Average: {{ weightedAverage }}</div>
        <div>food: {{ foodScore }}</div>
        <div>service: {{ serviceScore }}</div>
        <div>ambience: {{ ambienceScore }}</div>
        <div>price: {{ priceScore }}</div>
        <div>novelty: {{ noveltyScore }}</div>
      </div>
      <div class="review-content-container" style="align-items: flex-end; margin-left: 0.5em">
        <div class="content-subheading">Comments:</div>
        <div>{{ props.review.comment }}</div>
      </div>
    </span>
    <menu class="review-buttons" v-if="reviewUsername == currentUsername">
      <li><button class="main-button" @click="emit('editReview', props.review._id)">Edit</button></li>
      <li><button class="main-button" @click="deleteReview">Delete</button></li>
    </menu>
  </div>
</template>

<style scoped>
.content-subheading {
  font-size: 1.2em;
  padding-bottom: 0.4em;
}

.review-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.review-content-container {
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 4px;
  padding: 1em;
  height: 8em;
  width: 15em;
  margin-top: 1em;
  margin-bottom: 1em;
}

.review-full-container {
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 4px;

  padding: 2em;
}

.review-title {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  /* padding: 0.5em; */
}

.review-reviewer {
  text-decoration: none;
  font-size: 1.2em;
}

.review-restaurant {
  text-decoration: none;
  font-size: 1.5em;
}

.review-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

p {
  margin: 0em;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
