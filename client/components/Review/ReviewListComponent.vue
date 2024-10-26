<script setup lang="ts">
import ReviewComponent from "@/components/Review/ReviewComponent.vue";
import { useRestaurantStore } from "@/stores/restaurant";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
// import SearchPostForm from "./SearchPostForm.vue";

const props = defineProps(["profileUser"]);
const { currentUsername } = storeToRefs(useUserStore());
const { currentRestaurant } = storeToRefs(useRestaurantStore());
const { hasRestaurant } = storeToRefs(useRestaurantStore());

const loaded = ref(false);
let reviews = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let searchReviewer = ref("");

// TODO: define props for user
// TODO: ask if there is a current restaurant

// TODO: add get reviews for restaurant or reviewer or both: getReviews(reviewer?: string)
// TODO: get review by restaurant name? differentiate from diff restaurants with same name?
async function getReviews() {
  let query: Record<string, string>;
  if (props.profileUser) {
    let userId;
    try {
      userId = (await fetchy(`/api/users/${currentUsername.value}`, "GET"))._id;
    } catch (_) {
      return;
    }
    query = { reviewer: userId };
  } else {
    query = hasRestaurant.value ? { restaurant: currentRestaurant.value } : {};
  }
  //   console.log("current restaurant:", currentRestaurant.value, "has restaurant?", hasRestaurant.value);
  //   let query: Record<string, string> = {};
  let reviewResults;
  try {
    reviewResults = await fetchy("/api/reviews", "GET", { query });
  } catch (_) {
    return;
  }
  reviews.value = reviewResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  await getReviews();
  loaded.value = true;
});
</script>

<template>
  <section class="reviews" v-if="loaded && reviews.length !== 0">
    <article v-for="review in reviews" :key="review._id">
      <ReviewComponent v-if="editing !== review._id" :review="review" />
    </article>
  </section>
  <p v-else-if="loaded" style="margin: 4em; margin-bottom: 8em">No reviews found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.posts {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
