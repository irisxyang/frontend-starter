<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

let username = ref("");
let currentPassword = ref("");
let newPassword = ref("");

let food = ref(5);
let service = ref(5);
let ambience = ref(5);
let price = ref(5);
let novelty = ref(5);

const { updateUserUsername, updateUserPassword, updateSession, updateUserPreference } = useUserStore();

async function updateUsername() {
  await updateUserUsername(username.value);
  await updateSession();
  username.value = "";
}

async function updatePassword() {
  await updateUserPassword(currentPassword.value, newPassword.value);
  await updateSession();
  currentPassword.value = newPassword.value = "";
}

async function updatePreferences() {
  await updateUserPreference(String(food.value), String(ambience.value), String(service.value), String(price.value), String(novelty.value));
  await updateSession();
  void router.push({ name: "Profile" });
}

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
  <h2>Update User Settings</h2>
  <form @submit.prevent="updateUsername" class="pure-form">
    <fieldset>
      <input style="margin: 1em" type="text" placeholder="New username" v-model="username" required />
      <button type="submit" class="main-button">Update username</button>
    </fieldset>
  </form>

  <form @submit.prevent="updatePassword" class="pure-form">
    <fieldset style="display: flex; flex-direction: row; align-items: center; justify-content: center">
      <div style="display: flex; flex-direction: column">
        <input style="margin: 0.5em; margin-right: 1em" type="password" placeholder="Old password" v-model="currentPassword" required />
        <input style="margin: 0.5em; margin-right: 1em" type="password" placeholder="New password" v-model="newPassword" required />
      </div>
      <button type="submit" class="main-button">Update password</button>
    </fieldset>
  </form>
  <form @submit.prevent="updatePreferences" class="pure-form" style="display: flex; flex-direction: column; align-items: center; justify-content: center">
    <div class="description-text">
      Update your weighting below. These numbers will determine what weights to use when averaging any review ratings based on the following characteristics.
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
      <button type="submit" class="main-button">Update Weightings</button>
    </div>
  </form>
</template>

<style scoped>
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
