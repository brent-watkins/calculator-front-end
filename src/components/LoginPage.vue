<script setup>
import { ref } from "vue";

const password = ref("");
const username = ref("");
</script>

<template>
  <header>
    <h1>Login</h1>
    <h3>Please enter your username and password:</h3>
  </header>
  <body>
    <div class="userinfo">
      <v-text-field label="Username" v-model="username"></v-text-field>
      <v-text-field
        label="Password"
        type="password"
        v-model="password"
      ></v-text-field>
    </div>
    <div class="login">
      <v-btn prepend-icon="mdi-login">Login</v-btn>
      <p>Need an account?</p>
      <v-btn href="/#/register" prepend-icon="mdi-account-plus">
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
header {
  text-align: center;
}
.login {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
