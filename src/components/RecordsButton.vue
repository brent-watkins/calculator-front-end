<script setup>
const props = defineProps(["loggedIn", "username"]);
</script>

<template>
  <v-btn v-if="props.loggedIn" href="/#/records">View Records</v-btn>
</template>
