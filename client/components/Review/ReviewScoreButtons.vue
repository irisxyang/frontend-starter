<script setup lang="ts">
import { ref } from "vue";
let score = ref(0);

function setScore(num: number) {
  score.value = num;
}
</script>

<template>
  <div class="button-container border">
    <div class="button-title">Food:</div>
    <div class="row" v-for="i in 11" :key="i">
      <button v-if="score == i - 6" class="clicked" @click="setScore(0)">{{ i - 6 }}</button>
      <button v-else @click="setScore(i - 6)">{{ i - 6 }}</button>
    </div>
  </div>
</template>

<style scoped>
.button-title {
  display: flex;
  align-items: center;
  padding-right: 1em;
  font-size: 1.5em;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.row {
  display: flex;
  align-items: center;
  flex-direction: row;
}

button {
  background-color: var(--base-bg);
  border: 2px solid #000000;
  margin: 1px;
  font-size: 1.5em;
  width: 2em;
}

.clicked {
  background-color: var(--main-accent);
}
</style>
