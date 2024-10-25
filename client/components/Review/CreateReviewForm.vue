<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["restaurantId"]);
const restaurant = ref(props.restaurantId);
// const restaurant = ref("");
const comment = ref("");
const food = ref(0);
const ambience = ref(0);
const service = ref(0);
const price = ref(0);
const novelty = ref(0);
const emit = defineEmits(["refreshReviews"]);

const createReview = async (restaurant: string, comment: string, food: string, ambience: string, service: string, price: string, novelty: string) => {
  try {
    await fetchy("/api/reviews", "POST", {
      body: { restaurant, comment, food, ambience, service, price, novelty },
    });
  } catch (_) {
    return;
  }
  emit("refreshReviews");
  emptyForm();
};

const emptyForm = () => {
  comment.value = "";
  food.value = 0;
  service.value = 0;
  ambience.value = 0;
  price.value = 0;
  novelty.value = 0;
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
</script>

<template>
  <form @submit.prevent="createReview(restaurant, comment, String(food), String(ambience), String(service), String(price), String(novelty))">
    <label for="restaurant">Restaurant:</label>
    <textarea id="restaurant" v-model="restaurant" placeholder="Choose a restaurant to review!" required> </textarea>

    <label for="comment">Comment:</label>
    <textarea id="comment" v-model="comment" placeholder="Add a comment!"> </textarea>

    <div class="button-container">
      <span class="row">
        <div class="button-title">Food:</div>
        <div v-for="i in 11" :key="i">
          <button v-if="food == i - 6" class="score-button clicked" @click="setFoodScore(0)">{{ i - 6 }}</button>
          <button v-else class="score-button" @click="setFoodScore(i - 6)">{{ i - 6 }}</button>
        </div>
      </span>
      <span class="row">
        <div class="button-title">Service:</div>
        <div v-for="i in 11" :key="i">
          <button v-if="service == i - 6" class="score-button clicked" @click="setServiceScore(0)">{{ i - 6 }}</button>
          <button v-else class="score-button" @click="setServiceScore(i - 6)">{{ i - 6 }}</button>
        </div>
      </span>

      <span class="row">
        <div class="button-title">Ambience:</div>
        <div v-for="i in 11" :key="i">
          <button v-if="ambience == i - 6" class="score-button clicked" @click="setAmbienceScore(0)">{{ i - 6 }}</button>
          <button v-else class="score-button" @click="setAmbienceScore(i - 6)">{{ i - 6 }}</button>
        </div>
      </span>

      <span class="row">
        <div class="button-title">Price:</div>
        <div v-for="i in 11" :key="i">
          <button v-if="price == i - 6" class="score-button clicked" @click="setPriceScore(0)">{{ i - 6 }}</button>
          <button v-else class="score-button" @click="setPriceScore(i - 6)">{{ i - 6 }}</button>
        </div>
      </span>

      <span class="row">
        <div class="button-title">Novelty:</div>
        <div v-for="i in 11" :key="i">
          <button v-if="novelty == i - 6" class="score-button clicked" @click="setNoveltyScore(0)">{{ i - 6 }}</button>
          <button v-else class="score-button" @click="setNoveltyScore(i - 6)">{{ i - 6 }}</button>
        </div>
      </span>
    </div>

    <button type="submit" class="main-button">Create Review</button>
  </form>
</template>

<!-- <template>
  <form @submit.prevent="createReview(restaurant, comment, food, ambience, service, price, novelty)">
    <label for="content">Post Contents:</label>
    <textarea id="content" v-model="content" placeholder="Create a post!" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Create Post</button>
  </form>
</template> -->

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
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
  justify-content: flex-end;
  width: 100%;
}

.row {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: right;
  width: 50em;
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
