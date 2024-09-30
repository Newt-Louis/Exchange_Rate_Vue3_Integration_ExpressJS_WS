<script setup>
  import { onMounted, onUnmounted, ref } from "vue";
  import axios from "axios";
  defineProps({
    msg: String,
  });
  const vcb = ref([]);
  const acb = ref([]);
  // onMounted(() => {
  //   ws.value = new WebSocket("ws://localhost:3001");
  //   ws.value.onopen = () => {
  //     console.log("connected to websocket server");
  //   };
  //   ws.value.onmessage = async event => {
  //     const data = await JSON.parse(event.data);
  //     switch (data[0]) {
  //       case "ACB":
  //         acb.value = data;
  //         break;
  //       case "VCB":
  //         vcb.value = data;
  //         break;
  //     }
  //   };
  //   ws.value.onclose = () => {
  //     console.log("disconnected from websocket server");
  //   };
  //   ws.value.onerror = err => {
  //     console.log("websocket error: " + err);
  //   };
  // });

  // onUnmounted(() => {
  //   if (ws.value) {
  //     ws.value.close();
  //   }
  // });
</script>

<template>
  <div class="card">
    <button type="button" @click="selectA">Test CSS selector</button>
    <button type="button" @click="getPuppeteerData">Test Puppeteer</button>
  </div>
  <div>
    <ul>
      <li>{{ acb }}</li>
    </ul>
    <ul>
      <li>{{ vcb }}</li>
    </ul>
  </div>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
