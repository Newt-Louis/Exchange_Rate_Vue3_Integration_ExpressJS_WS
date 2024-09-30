<script setup>
  import { onBeforeMount } from "vue";
  import HomePage from "./components/HomePage.vue";
  import { useWebSocketStore } from "./stores/websocket.store.mjs";

  onBeforeMount(() => {
    useWebSocketStore().connect();
  });
</script>

<template>
  <HomePage msg="Vite + Vue" />
</template>

<style scoped></style>
