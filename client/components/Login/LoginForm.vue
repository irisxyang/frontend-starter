<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const { loginUser, updateSession } = useUserStore();

async function login() {
  await loginUser(username.value, password.value);
  void updateSession();
  void router.push({ name: "Home" });
}
</script>

<template>
  <form class="pure-form pure-form-aligned" style="display: flex; flex-direction: column; align-items: center; justify-content: center" @submit.prevent="login">
    <div style="margin: 2em; margin-bottom: 1em">
      <label for="aligned-name" style="margin-right: 1em">Username</label>
      <input v-model.trim="username" type="text" id="aligned-name" placeholder="Username" required />
    </div>
    <div style="margin-bottom: 2em">
      <label for="aligned-password" style="margin-right: 1em">Password</label>
      <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
    </div>
    <div style="margin: 2em; margin-bottom: 8em">
      <button type="submit" class="main-button">Submit</button>
    </div>
  </form>
</template>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
}
</style>
