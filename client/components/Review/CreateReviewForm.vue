<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const restaurant = ref("");
const comment = ref("");
const food = ref("");
const ambience = ref("");
const service = ref("");
const price = ref("");
const novelty = ref("");
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
  restaurant.value = "";
  comment.value = "";
  food.value = "";
  service.value = "";
  ambience.value = "";
  price.value = "";
  novelty.value = "";
};
</script>

<template>
  <form @submit.prevent="createReview(restaurant, comment, food, ambience, service, price, novelty)">
    <label for="restaurant">Restaurant:</label>
    <textarea id="restaurant" v-model="restaurant" placeholder="Choose a restaurant to review!" required> </textarea>

    <label for="comment">Comment:</label>
    <textarea id="comment" v-model="comment" placeholder="Add a comment!"> </textarea>

    <label for="food">Food Score:</label>
    <textarea id="food" v-model="food" placeholder="Integer from -5 to 5"> </textarea>
    <label for="service">Service Score:</label>
    <textarea id="service" v-model="service" placeholder="Integer from -5 to 5"> </textarea>
    <label for="ambience">Ambience Score:</label>
    <textarea id="ambience" v-model="ambience" placeholder="Integer from -5 to 5"> </textarea>
    <label for="price">Price Score:</label>
    <textarea id="price" v-model="price" placeholder="Integer from -5 to 5"> </textarea>
    <label for="novelty">Novelty Score:</label>
    <textarea id="novelty" v-model="novelty" placeholder="Integer from -5 to 5"> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Create Review</button>
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
</style>
