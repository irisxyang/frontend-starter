<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const emit = defineEmits(["getRestaurantsByName"]);
</script>

<template>
  <form @submit.prevent="emit('getRestaurantsByName', name)" class="pure-form">
    <fieldset class="border">
      <input id="name" type="text" v-model="name" placeholder="Restaurant Name" />
      <button type="submit" class="main-button">Search</button>
    </fieldset>
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 0.5em;
  padding: 1em;
  align-items: center;
  justify-content: center;
  width: 60%;
}

fieldset {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}

input {
  margin: 2em;
  width: 70%;
}
</style>
