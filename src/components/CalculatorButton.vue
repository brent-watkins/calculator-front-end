<script setup>
const props = defineProps(["loggedIn", "username"]);
</script>

<template>
  <v-btn v-if="props.loggedIn" href="/#/calculator">Calculator</v-btn>
</template>
