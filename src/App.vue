<script setup>
  import { onBeforeMount, onUnmounted } from "vue";
  import HomePage from "./components/HomePage.vue";
  import { useWebSocketStore } from "./stores/websocket.store.mjs";

  onBeforeMount(() => {
    useWebSocketStore().connect();
  });

  onUnmounted(() => {
    useWebSocketStore().disconnect();
  });
</script>

<template>
  <HomePage msg="Vite + Vue" />
</template>

<style scoped></style>
