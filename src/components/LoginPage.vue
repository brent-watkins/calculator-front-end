<script setup>
import { ref, watch } from "vue";

const props = defineProps(["loggedIn", "username"]);
const emits = defineEmits(["user"]);

const loading = ref(false);
const password = ref("");
const response = ref("");
const username = ref("");

if (props.loggedIn) {
  window.location.hash = "/calculator";
}

watch(response, () => {
  if (response.value === username.value) {
    emits("user", response.value);
  }
});

function onSubmit() {
  const credentials = {
    password: password.value,
    username: username.value,
  };
  loading.value = true;
  fetch("http://127.0.0.1:8000/api/login/", {
    method: "POST",
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
      console.log("Encountered an error while attempting to log in:", error);
    })
    .finally(() => {
      loading.value = false;
    });
}
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
      <v-btn @click="onSubmit" :loading="loading" prepend-icon="mdi-login">
        Log In
      </v-btn>
      <p>
        <strong>{{ response }}</strong>
      </p>
      <br />
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
