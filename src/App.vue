<script setup>
import { computed, ref, watch } from "vue";

import AccountButton from "./components/AccountButton.vue";
import AccountIcon from "./components/AccountIcon.vue";
import CalculatorButton from "./components/CalculatorButton.vue";
import CalculatorPage from "./components/CalculatorPage.vue";
import ErrorPage from "./components/ErrorPage.vue";
import HomePage from "./components/HomePage.vue";
import LoginPage from "./components/LoginPage.vue";
import LogoutPage from "./components/LogoutPage.vue";
import RecordsPage from "./components/RecordsPage.vue";
import RegisterPage from "./components/RegisterPage.vue";
import RecordsButton from "./components/RecordsButton.vue";

const currentPath = ref(window.location.hash);
const loggedIn = ref(false);
const username = ref("");

watch(username, () => {
  if (username.value) {
    loggedIn.value = true;
    if (currentPath.value === "#/login") {
      window.location.hash = "/calculator";
    }
  } else {
    loggedIn.value = false;
  }
});

const routes = {
  "/": HomePage,
  "/calculator": CalculatorPage,
  "/login": LoginPage,
  "/logout": LogoutPage,
  "/records": RecordsPage,
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
        <RecordsButton :logged-in="loggedIn" />
        <CalculatorButton :logged-in="loggedIn" />
        <AccountButton :logged-in="loggedIn" />
      </template>
    </v-app-bar>

    <v-main>
      <component
        :is="currentPage"
        :logged-in="loggedIn"
        :username="username"
        @user="(user) => (username = user)"
      />
    </v-main>
  </v-app>
</template>
