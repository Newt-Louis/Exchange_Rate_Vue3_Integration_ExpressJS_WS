<script setup>
  import { onMounted, onUnmounted, ref } from "vue";
  import axios from "axios";
  defineProps({
    msg: String,
  });
  const exchangeRates = ref(null);
  const errorRes = ref(null);
  const ws = ref(null);
  const messages = ref([]);
  const getPuppeteerData = async () => {
    await axios
      .post("/api/acb-exchange-rate")
      .then(response => {
        exchangeRates.value = response.data;
        console.log(response);
      })
      .catch(error => {
        errorRes.value = error;
      });
  };
  onMounted(() => {
    ws.value = new WebSocket("ws://localhost:3000");
    ws.value.onopen = () => {
      console.log("connected to websocket server");
    };
    ws.value.onmessage = event => {
      messages.value.push(event.data);
    };
    ws.value.onclose = () => {
      console.log("disconnected from websocket server");
    };
    ws.value.onerror = err => {
      console.log("websocket error: " + err);
    };
  });

  onUnmounted(() => {
    if (ws.value) {
      ws.value.close();
    }
  });
</script>

<template>
  <div class="card">
    <button type="button" @click="selectA">Test CSS selector</button>
    <button type="button" @click="getPuppeteerData">Test Puppeteer</button>
  </div>
  <div>
    <ul>
      <li v-for="(message, index) in messages" :key="{ index }">{{ message }}</li>
    </ul>
  </div>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
