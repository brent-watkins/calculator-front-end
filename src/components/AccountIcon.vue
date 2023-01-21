<script setup>
const props = defineProps(["username"]);
</script>

<template>
  <v-icon icon="mdi-account" />
  <span>&nbsp;{{ props.username }}&nbsp;</span>
</template>
