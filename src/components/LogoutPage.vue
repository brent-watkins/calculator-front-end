<script setup>
const props = defineProps(["loggedIn"]);
const emits = defineEmits(["user"]);

if (props.loggedIn) {
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
