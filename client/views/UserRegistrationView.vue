<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const { createUser, loginUser, updateSession } = useUserStore();
const food = ref(0);
const ambience = ref(0);
const service = ref(0);
const price = ref(0);
const novelty = ref(0);

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

async function createUserWeighting() {
  const query = { food: String(food), service: String(service), ambience: String(ambience), price: String(price), novelty: String(novelty) };
  await fetchy("api/user/weightings", "POST", { query });
}

async function register() {
  await createUser(username.value, password.value);
  await loginUser(username.value, password.value);
  // make weightings for user
  await createUserWeighting();
  void updateSession();
  void router.push({ name: "Home" });
}
</script>

<template>
  <main>
    <h1>Register User</h1>
    <form class="pure-form pure-form-aligned" style="display: flex; flex-direction: column; align-items: center; justify-content: center" @submit.prevent="register">
      <div style="margin: 2em; margin-bottom: 1em">
        <label for="aligned-name" style="margin-right: 1em">Username</label>
        <input v-model.trim="username" type="text" id="aligned-name" placeholder="Username" required />
      </div>
      <div style="margin-bottom: 2em">
        <label for="aligned-password" style="margin-right: 1em">Password</label>
        <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
      </div>
      <div class="description-text">
        Select your weighting below. These numbers will determine what weights to use when averaging any review ratings based on the following characteristics.
        <br />
        <br />
        For example, if you really care about food, but not as much about service, you can weight food at a 5 and service at a 1.
      </div>
      <div class="button-container">
        <span class="row">
          <div class="button-title">Food:</div>
          <div v-for="i in 5" :key="i">
            <button v-if="food == i" class="score-button clicked" @click="setFoodScore(0)">{{ i }}</button>
            <button v-else class="score-button" @click="setFoodScore(i)">{{ i }}</button>
          </div>
        </span>
        <span class="row">
          <div class="button-title">Service:</div>
          <div v-for="i in 5" :key="i">
            <button v-if="service == i" class="score-button clicked" @click="setServiceScore(0)">{{ i }}</button>
            <button v-else class="score-button" @click="setServiceScore(i)">{{ i }}</button>
          </div>
        </span>

        <span class="row">
          <div class="button-title">Ambience:</div>
          <div v-for="i in 5" :key="i">
            <button v-if="ambience == i" class="score-button clicked" @click="setAmbienceScore(0)">{{ i }}</button>
            <button v-else class="score-button" @click="setAmbienceScore(i)">{{ i }}</button>
          </div>
        </span>

        <span class="row">
          <div class="button-title">Price:</div>
          <div v-for="i in 5" :key="i">
            <button v-if="price == i" class="score-button clicked" @click="setPriceScore(0)">{{ i }}</button>
            <button v-else class="score-button" @click="setPriceScore(i)">{{ i }}</button>
          </div>
        </span>

        <span class="row">
          <div class="button-title">Novelty:</div>
          <div v-for="i in 5" :key="i">
            <button v-if="novelty == i" class="score-button clicked" @click="setNoveltyScore(0)">{{ i }}</button>
            <button v-else class="score-button" @click="setNoveltyScore(i)">{{ i }}</button>
          </div>
        </span>
      </div>
      <div style="margin: 2em">
        <button type="submit" class="main-button">Register</button>
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

.description-text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;

  margin-bottom: 2em;
  margin-top: 0.5em;
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
  width: 22em;
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
