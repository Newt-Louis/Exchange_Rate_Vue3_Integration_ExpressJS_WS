<template>
  <div class="container-table">
    <table class="table-layout">
      <thead class="table-thead">
        <tr class="table-tr">
          <th class="table-th"><span>Bank</span></th>
          <th v-for="(title, index) in currencyList" :key="index" class="table-th">
            <img :src="title.imglink" :alt="title.name" />
            <span>{{ title.name }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { nextTick, onMounted, ref } from "vue";
  import { useACBStore } from "../stores/acb.store.mjs";
  import { useVCBStore } from "../stores/vcb.store.mjs";
  /* currencyData is now a new variable with memory created 
  from the server including all the data of the json file,
  vite will automatically convert the json data into javascript data.  */
  import currencyData from "@/initialData.json";
  import { deepCopy } from "../../plugin/utitlities.plugin.mjs";
  const acbStore = useACBStore();
  const vcbStore = useVCBStore();
  const svgPath = import.meta.env.VITE_CURRENCY_SVG;
  const pngPath = import.meta.env.VITE_BANK_LOGO;

  /* In ssr technique, when we create a new memory area, that memory area belongs to the server, 
  not the client, so when we reload the page, the memory area will not be reset because the server is still running,
  it is necessary to create a deep copy to ensure both. Arrays and objects are a completely new memory area 
  on the client side to ensure that data will not be saved, leading to value errors.  */
  const currencyList = deepCopy(currencyData);
  currencyList.forEach(element => {
    element.imglink = svgPath + element.imglink;
  });

  const bankList = [
    { name: "ACB", imglink: `${pngPath}/acb_logo.png` },
    { name: "VCB", imglink: `${pngPath}/vcb_logo.png` },
  ];
</script>

<style>
  .container-table {
    overflow: scroll;
  }
  .table-layout {
    width: 3200px;
  }
  .table-th {
    padding: 12px;
    width: 120px;
    font-size: 16px;
  }
  .table-th > img {
    margin-right: 8px;
  }
  .table-thead {
    background-color: rgb(244, 252, 255);
  }
  thead > span {
    margin: 0;
  }
  th:first-child {
    border-top-left-radius: 8px;
  }
  th:last-child {
    border-top-right-radius: 8px;
  }
  td {
    text-align: center;
    padding: 12px;
    border-top: 0.5px solid rgb(200, 200, 200);
  }
</style>
