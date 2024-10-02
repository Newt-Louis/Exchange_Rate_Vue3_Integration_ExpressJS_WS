<template>
  <div>
    <a-row>
      <a-col :span="4">Some Link</a-col>
      <a-col :span="4">Some Link</a-col>
      <a-col :span="4">Some Link</a-col>
      <a-col :span="2" :offset="10" :style="{ textAlign: 'center' }">Ping: {{ ping }}</a-col>
    </a-row>
  </div>
</template>

<script setup>
  import { ref, computed, onBeforeMount } from "vue";
  import { useWebSocketStore } from "../stores/websocket.store.mjs";
  const ping = ref("");
  onBeforeMount(() => {
    const ws = useWebSocketStore();
    ping.value = computed(() => {
      return ws.delay;
    });
  });
</script>

<style></style>
