<script setup>
import { ref } from "vue";

const email = ref("");
const form = ref(false);
const MIN_BALANCE = 0;
const MAX_BALANCE = 999999.99;
const password = ref("");
const passwordVisibility = ref("password");
const startingBalance = ref(10);

function handleVisibility() {
  passwordVisibility.value =
    passwordVisibility.value === "password" ? "text" : "password";
}

function onSubmit() {
  // Submit the username, password, and startingBalance
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
        <v-text-field
          label="Email Address"
          :rules="[
            () => !!email || 'E-mail is required',
            (email) => /.+@.+\..+/.test(email) || 'E-mail must be valid',
          ]"
          v-model="email"
        ></v-text-field>
        <v-text-field
          label="Password"
          :rules="[
            () => !!password || 'Password is required',
            () =>
              !!password.length < 8 ||
              'Password must be at least 8 characters long',
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
          :rule="[
            () =>
              !!startingBalance < MIN_BALANCE ||
              'Balance must be greater than 0',
            () => !!startingBalance > MAX_BALANCE || 'Balance exceeds maximum',
          ]"
          step="0.01"
          type="number"
          v-model="startingBalance"
        ></v-text-field>
      </v-form>
    </div>
    <div class="create">
      <v-btn @click="onSubmit" prepend-icon="mdi-account-plus">
        Create Account
      </v-btn>
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
.userinfo {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50%;
  min-width: 30%;
}
</style>
