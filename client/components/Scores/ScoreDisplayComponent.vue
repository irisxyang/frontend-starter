<script setup lang="ts">
const props = defineProps(["scores"]);

const foodScore = props.scores.food;
const serviceScore = props.scores.service;
const ambienceScore = props.scores.ambience;
const priceScore = props.scores.price;
const noveltyScore = props.scores.novelty;
</script>

<template>
  <main></main>
</template>

<style scoped></style>
