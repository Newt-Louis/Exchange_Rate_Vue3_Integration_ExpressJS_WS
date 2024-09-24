<script setup>
  import { ref } from "vue";
  import axios from "axios";
  defineProps({
    msg: String,
  });
  const exchangeRates = ref(null);
  const errorRes = ref(null);
  const count = ref(0);
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
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <button type="button" @click="getPuppeteerData">Test Puppeteer</button>
  </div>

  <p>
    {{ "dữ liệu được lấy về : " + exchangeRates }}
  </p>
  <p>
    {{ "đang có lỗi :" + errorRes }}
  </p>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
