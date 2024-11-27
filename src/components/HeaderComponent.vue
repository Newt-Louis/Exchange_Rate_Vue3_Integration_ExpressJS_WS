<template>
  <div>
    <a-row>
      <a-col :span="4"><a class="fake-button">Get Data</a></a-col>
      <a-col :span="4"><a class="fake-button">Fetch Data</a></a-col>
      <a-col :span="4">Some Link</a-col>
      <a-col :span="2" :offset="10" :style="{ textAlign: 'center' }">Ping: {{ ping }} ms</a-col>
    </a-row>
  </div>
</template>

<script setup>
  import { ref, computed, onBeforeMount } from "vue";
  import { useWebSocketStore } from "../stores/websocket.store.mjs";
  import axios from "axios";
  import { useACBStore } from "../stores/acb.store.mjs";
  import { useVCBStore } from "../stores/vcb.store.mjs";
  const ping = ref("");

  /** function for mocking test purpose */
  async function getNewData() {
    try {
      const response = await axios.get("/api/exchange-data");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  /** function for mocking test purpose */
  async function startCrawlData() {
    try {
      const response = await axios.post("/api/start-crawl");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  onBeforeMount(() => {
    const ws = useWebSocketStore();
    ping.value = computed(() => {
      return ws.delay;
    });
  });
</script>

<style>
  .fake-button {
    user-select: none;
    color: white;
  }
  .fake-button:hover {
    user-select: none;
    color: rgb(40, 40, 255);
  }
</style>
