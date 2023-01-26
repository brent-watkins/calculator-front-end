<script setup>
import { computed, ref } from "vue";

import AccountButton from "./components/AccountButton.vue";
import AccountIcon from "./components/AccountIcon.vue";
import CalculatorPage from "./components/CalculatorPage.vue";
import ErrorPage from "./components/ErrorPage.vue";
import HomePage from "./components/HomePage.vue";
import LoginPage from "./components/LoginPage.vue";
import LogoutPage from "./components/LogoutPage.vue";
import RegisterPage from "./components/RegisterPage.vue";

const currentPath = ref(window.location.hash);
const loggedIn = ref(false);
const username = ref("");

const routes = {
  "/": HomePage,
  "/calculator": CalculatorPage,
  "/login": LoginPage,
  "/logout": LogoutPage,
  "/register": RegisterPage,
};

const currentPage = computed(() => {
  return routes[currentPath.value.slice(1) || "/"] || ErrorPage;
});

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});
</script>

<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-title>Web Calculator</v-app-bar-title>
      </template>
      <template v-slot:append>
        <AccountIcon v-if="loggedIn" :username="username" />
        <AccountButton :logged-in="loggedIn" />
      </template>
    </v-app-bar>

    <v-main>
      <component :is="currentPage" />
    </v-main>
  </v-app>
</template>
