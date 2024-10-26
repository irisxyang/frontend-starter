<script setup lang="ts">
import router from "@/router";
import { useViewingStore } from "@/stores/viewing";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { currentlyViewingReview, currentlyViewingReviewPreference } = storeToRefs(useViewingStore());
const comment = ref("");
const reviewId = ref("");

const food = ref(0);
const service = ref(0);
const ambience = ref(0);
const price = ref(0);
const novelty = ref(0);

const getOriginalReviewInfo = async () => {
  reviewId.value = currentlyViewingReview.value ? currentlyViewingReview.value._id : "";
  comment.value = currentlyViewingReview.value ? currentlyViewingReview.value.comment : "";

  food.value = currentlyViewingReviewPreference.value ? Number(currentlyViewingReviewPreference.value.food) : 0;
  service.value = currentlyViewingReviewPreference.value ? Number(currentlyViewingReviewPreference.value.service) : 0;
  ambience.value = currentlyViewingReviewPreference.value ? Number(currentlyViewingReviewPreference.value.ambience) : 0;
  price.value = currentlyViewingReviewPreference.value ? Number(currentlyViewingReviewPreference.value.price) : 0;
  novelty.value = currentlyViewingReviewPreference.value ? Number(currentlyViewingReviewPreference.value.novelty) : 0;
};
const emit = defineEmits(["editReview", "refreshReviews"]);

const editReview = async (comment: string, food: string, service: string, ambience: string, price: string, novelty: string) => {
  try {
    await fetchy(`/api/reviews/${reviewId.value}`, "PATCH", {
      body: { comment: comment, food: food, service: service, ambience: ambience, price: price, novelty: novelty },
    });
  } catch (_) {
    return;
  }
  emit("editReview");
  emit("refreshReviews");
  void router.push({ name: "Profile" });
};

function setFoodScore(num: number) {
  food.value = num;
}
function setServiceScore(num: number) {
  service.value = num;
}
function setAmbienceScore(num: number) {
  ambience.value = num;
}
function setPriceScore(num: number) {
  price.value = num;
}
function setNoveltyScore(num: number) {
  novelty.value = num;
}

onBeforeMount(async () => {
  await getOriginalReviewInfo();
});
</script>

<template>
  <main>
    <h1>Edit Review</h1>
    <form @submit.prevent="editReview(comment, String(food), String(ambience), String(service), String(price), String(novelty))">
      <div class="comment-input-container">
        <h2 style="margin-top: 0; margin-bottom: 2em">Edit Comment</h2>
        <span>
          <label for="comment" style="margin-right: 1em; font-size: 1.2em">Comment:</label>
          <textarea id="comment" v-model="comment" placeholder="Add a comment!" style="width: 30em"> </textarea>
        </span>
      </div>
      <div class="button-container">
        <h2 style="margin: 2em">Edit Scores</h2>
        <span class="row">
          <div class="button-title">Food:</div>
          <div v-for="i in 11" :key="i">
            <button v-if="food == i - 6" class="score-button clicked" @click="setFoodScore(currentlyViewingReviewPreference ? Number(currentlyViewingReviewPreference.food) : 0)">{{ i - 6 }}</button>
            <button v-else class="score-button" @click="setFoodScore(i - 6)">{{ i - 6 }}</button>
          </div>
        </span>
        <span class="row">
          <div class="button-title">Service:</div>
          <div v-for="i in 11" :key="i">
            <button v-if="service == i - 6" class="score-button clicked" @click="setServiceScore(currentlyViewingReviewPreference ? Number(currentlyViewingReviewPreference.service) : 0)">
              {{ i - 6 }}
            </button>
            <button v-else class="score-button" @click="setServiceScore(i - 6)">{{ i - 6 }}</button>
          </div>
        </span>

        <span class="row">
          <div class="button-title">Ambience:</div>
          <div v-for="i in 11" :key="i">
            <button v-if="ambience == i - 6" class="score-button clicked" @click="setAmbienceScore(currentlyViewingReviewPreference ? Number(currentlyViewingReviewPreference.ambience) : 0)">
              {{ i - 6 }}
            </button>
            <button v-else class="score-button" @click="setAmbienceScore(i - 6)">{{ i - 6 }}</button>
          </div>
        </span>

        <span class="row">
          <div class="button-title">Price:</div>
          <div v-for="i in 11" :key="i">
            <button v-if="price == i - 6" class="score-button clicked" @click="setPriceScore(currentlyViewingReviewPreference ? Number(currentlyViewingReviewPreference.price) : 0)">
              {{ i - 6 }}
            </button>
            <button v-else class="score-button" @click="setPriceScore(i - 6)">{{ i - 6 }}</button>
          </div>
        </span>

        <span class="row">
          <div class="button-title">Novelty:</div>
          <div v-for="i in 11" :key="i">
            <button v-if="novelty == i - 6" class="score-button clicked" @click="setNoveltyScore(currentlyViewingReviewPreference ? Number(currentlyViewingReviewPreference.novelty) : 0)">
              {{ i - 6 }}
            </button>
            <button v-else class="score-button" @click="setNoveltyScore(i - 6)">{{ i - 6 }}</button>
          </div>
        </span>
        <button type="submit" class="main-button" style="margin: 2em">Confirm Edits</button>
      </div>
    </form>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  margin: 1.5em;
  margin-bottom: 1em;
}

.comment-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.button-title {
  display: flex;
  align-items: center;
  padding-right: 1em;
  font-size: 1.2em;
}

.button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.row {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  width: 35em;
  margin-bottom: 1em;
}

.score-button {
  background-color: var(--base-bg);
  border: 2px solid #000000;
  margin: 1px;
  font-size: 1.5em;
  width: 2em;
  border-radius: 2px;
}

.clicked {
  background-color: var(--main-accent);
}
</style>
