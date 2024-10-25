<script setup lang="ts">
import CreateReviewForm from "@/components/Review/CreateReviewForm.vue";
import { useRestaurantStore } from "@/stores/restaurant";
import { storeToRefs } from "pinia";

const { currentRestaurant } = storeToRefs(useRestaurantStore());
</script>

<template>
  <main>
    <CreateReviewForm />
  </main>
</template>

<style scoped></style>
