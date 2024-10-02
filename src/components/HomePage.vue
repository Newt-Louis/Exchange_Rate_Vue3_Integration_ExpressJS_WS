<script setup>
  import { computed, onMounted, onUnmounted, ref } from "vue";
  import { useACBStore } from "../stores/acb.store.mjs";
  import { useVCBStore } from "../stores/vcb.store.mjs";
  import { useWebSocketStore } from "../stores/websocket.store.mjs";
  import axios from "axios";
  defineProps({
    msg: String,
  });
  const vcbStore = useVCBStore();
  const acbStore = useACBStore();
  let ping;
  onMounted(() => {
    const ws = useWebSocketStore();
    ping = computed(() => {
      return ws.delay;
    });
  });
</script>

<template>
  <div class="card">
    <p>Ping: {{ ping }}</p>
    <button type="button" @click="selectA">Test CSS selector</button>
    <button type="button" @click="getPuppeteerData">Test Puppeteer</button>
  </div>
  <div>
    <ul>
      <li>{{ acbStore.acbData }}</li>
    </ul>
    <ul>
      <li>{{ vcbStore.vcbData }}</li>
    </ul>
  </div>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
