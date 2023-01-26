<script setup>
const props = defineProps(["loggedIn", "username"]);
const emits = defineEmits(["user"]);

if (props.loggedIn) {
  fetch("http://127.0.0.1:8000/api/logout/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: props.username }),
  }).catch((error) => {
    console.log("Encountered an error while attempting to log out:", error);
  });
  emits("user", "");
}
</script>

<template>
  <header>
    <h1>You have logged out.</h1>
  </header>
  <body>
    <p>Click <a href="/#/">here</a> to return to the home page.</p>
  </body>
</template>

<style scoped>
body {
  text-align: center;
}
header {
  text-align: center;
}
</style>
