<script setup lang="ts">
const props = defineProps(["restaurant"]);
</script>

<template>
  <div class="border restaurant-container">
    <div class="restaurant-name">{{ props.restaurant.name }}</div>
    <div>{{ props.restaurant.address }}</div>
    <div>{{ props.restaurant.url }}</div>
  </div>
</template>

<style scoped>
.restaurant-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}

.restaurant-name {
  font-size: 2em;
}
</style>
