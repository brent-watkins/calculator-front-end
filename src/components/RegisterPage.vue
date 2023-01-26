<script setup>
import { ref } from "vue";

const props = defineProps(["loggedIn"]);

const email = ref("");
const form = ref(false);
const loading = ref(false);
const MIN_BALANCE = 0;
const MAX_BALANCE = 999999.99;
const password = ref("");
const passwordVisibility = ref("password");
const response = ref("");
const startingBalance = ref();

if (props.loggedIn) {
  window.location.hash = "/calculator";
}

function handleVisibility() {
  passwordVisibility.value =
    passwordVisibility.value === "password" ? "text" : "password";
}

function onSubmit() {
  const credentials = {
    balance: startingBalance.value,
    password: password.value,
    status: "I", // Inactive. If registration is successful, new users will still have to log in
    username: email.value,
  };
  loading.value = true;
  fetch("http://127.0.0.1:8000/api/register/", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => response.json())
    .then((data) => {
      response.value = data;
    })
    .catch((error) => {
      console.log(
        "Encountered an error while trying to create your account:",
        error
      );
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>

<template>
  <header>
    <h1>Create Account</h1>
    <h3>Please enter your email and a password:</h3>
  </header>
  <body>
    <div class="userinfo">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <p>Note: your email will be your username</p>
        <v-text-field
          label="Email Address"
          :rules="[
            () => !!email || 'E-mail is required',
            (email) =>
              /.+@.+\..+/.test(email) ||
              'E-mail must be valid (ex. example@example.com)',
          ]"
          v-model="email"
        ></v-text-field>
        <v-text-field
          label="Password"
          :rules="[
            () => !!password || 'Password is required',
            () =>
              password.length >= 8 || 'Password must be at least 8 characters',
          ]"
          :type="passwordVisibility"
          v-model="password"
        >
          <template v-slot:append>
            <v-btn @click="handleVisibility">{{
              passwordVisibility === "password"
                ? "Show password"
                : "Hide password"
            }}</v-btn>
          </template>
        </v-text-field>
        <v-text-field
          label="Starting Balance"
          :max="MAX_BALANCE"
          :min="MIN_BALANCE"
          :rules="[
            () => !!startingBalance || 'Balance is required',
            () =>
              startingBalance >= MIN_BALANCE ||
              'Balance must be greater than 0',
            () => startingBalance <= MAX_BALANCE || 'Balance exceeds maximum',
          ]"
          step="0.01"
          type="number"
          v-model="startingBalance"
        ></v-text-field>
      </v-form>
    </div>
    <br />
    <div class="create">
      <v-btn
        @click="onSubmit"
        :disabled="!form"
        :loading="loading"
        prepend-icon="mdi-account-plus"
      >
        Create Account
      </v-btn>
    </div>
    <br />
    <div class="result">
      <p>
        <strong>{{ response }}</strong>
      </p>
      <p>Click <a href="/#/login">here</a> to log in</p>
    </div>
  </body>
</template>

<style scoped>
body {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.create {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}
header {
  text-align: center;
}
.result {
  text-align: center;
}
.userinfo {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50%;
  min-width: 30%;
  text-align: center;
}
</style>
