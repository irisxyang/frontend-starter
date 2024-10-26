<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

async function logout() {
  await logoutUser();
  void router.push({ name: "Home" });
}

async function delete_() {
  await deleteUser();
  void router.push({ name: "Home" });
}
</script>

<template>
  <main class="column">
    <h1 style="margin-top: 2em">Settings for {{ currentUsername }}</h1>
    <span>
      <button class="main-button" style="margin-right: 1em" @click="logout">Logout</button>
      <button class="main-button" style="margin-left: 1em" @click="delete_">Delete User</button>
    </span>
    <UpdateUserForm />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
