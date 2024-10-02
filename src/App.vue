<script setup>
  import { onBeforeMount, onUnmounted, ref } from "vue";
  import HomePage from "./pages/HomePage.vue";
  import HeaderComponent from "./components/HeaderComponent.vue";
  import { useWebSocketStore } from "./stores/websocket.store.mjs";

  onBeforeMount(() => {
    useWebSocketStore().connect();
  });

  onUnmounted(() => {
    useWebSocketStore().disconnect();
  });
</script>

<template>
  <a-layout class="origin-layout">
    <a-layout-header class="header-layout"><HeaderComponent></HeaderComponent></a-layout-header>
    <a-layout-content class="main-layout"><HomePage /></a-layout-content>
    <a-layout-footer class="footer-layout">Footer</a-layout-footer>
  </a-layout>
</template>

<style scoped>
  .origin-layout {
    background-color: white;
    height: 100vh;
  }
  .header-layout {
    background-color: #7dbcea;
    color: white;
  }
  .main-layout {
    margin: 24px 0 24px 0;
    padding: 0 10% 0 10%;
    background-color: white;
  }
  .footer-layout {
    position: static;
    bottom: 0;
  }
</style>
