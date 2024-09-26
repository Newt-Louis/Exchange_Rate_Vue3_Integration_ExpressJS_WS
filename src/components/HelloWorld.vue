<script setup>
  import { ref } from "vue";
  import axios from "axios";
  defineProps({
    msg: String,
  });
  const exchangeRates = ref(null);
  const errorRes = ref(null);
  const count = ref(0);
  const swtichA = ref(false);
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
  const selectA = () => {
    let stringChange;
    let select = document.querySelectorAll("article a");
    let selectedArray = [...select];
    let aTagToChange = selectedArray.find(element => element.textContent === "Thu Gọn");
    console.log(selectedArray);
    if (aTagToChange) {
      stringChange = "Đã thay đổi";
      aTagToChange.textContent = stringChange;
    }
  };
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="selectA">Test CSS selector</button>
    <button type="button" @click="getPuppeteerData">Test Puppeteer</button>
  </div>
  <article>
    <div><a href="somethingA">Xem Thêm</a></div>
    <div><a href="somethingB">Thu Gọn</a></div>
    <div><a href="somethingC">Thu Gọn 2</a></div>
    <div><a href="somethingD">Thu Gọn 3</a></div>
  </article>

  <p>
    {{ "dữ liệu được lấy về : " + JSON.stringify(exchangeRates) }}
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
