<script setup>
const props = defineProps(["loggedIn"]);
</script>

<template>
  <v-btn v-if="!props.loggedIn" href="/#/login" prepend-icon="mdi-login">
    Log In
  </v-btn>
  <v-btn v-if="props.loggedIn" href="/#/logout" prepend-icon="mdi-logout">
    Log Out
  </v-btn>
</template>
