<template>
  <div class="container-table" v-if="isExchangeType">
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
        <tr v-for="(bank, index) in bankList" :key="index">
          <td>
            <img :src="bank.imglink" alt="" width="50px" height="30px" style="margin-right: 8px" />{{ bank.name }}
          </td>
          <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
          <td v-if="bank?.data" v-for="(value, index) in bank.data" :key="index">
            <span>{{ value?.buyCash }}</span>
            /
            <span>{{ value?.sellCash }}</span>
          </td>
          <td>{{ bank.data }}</td>
          <td>4</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="container-table" v-else>
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
        <tr v-for="(bank, index) in bankList" :key="index">
          <td>
            <img :src="bank.imglink" alt="" width="50px" height="30px" style="margin-right: 8px" />{{ bank.name }}
          </td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { computed, nextTick, onMounted, ref, watch } from "vue";
  /* currencyData is now a new variable with memory created
  from the server including all the data of the json file,
  vite will automatically convert the json data into javascript data.  */
  import currencyData from "@/initialData.json";
  import { deepCopy } from "../../plugin/utitlities.plugin.mjs";

  const props = defineProps({
    exchangeType: String,
    data: Array,
  });
  const svgPath = import.meta.env.VITE_CURRENCY_SVG;
  const pngPath = import.meta.env.VITE_BANK_LOGO;
  const isExchangeType = ref(true);
  /* In ssr technique, when we create a new memory area, that memory area belongs to the server,
  not the client, so when we reload the page, the memory area will not be reset because the server is still running,
  it is necessary to create a deep copy to ensure both. Arrays and objects are a completely new memory area
  on the client side to ensure that data will not be saved, leading to value errors.  */
  const currencyList = deepCopy(currencyData);
  currencyList.forEach(element => {
    element.imglink = svgPath + element.imglink;
  });
  console.log(props.data);

  const bankList = [
    { name: "ACB", imglink: `${pngPath}/acb_logo.png` },
    { name: "VCB", imglink: `${pngPath}/vcb_logo.png` },
  ];
  const contributeData = () => {
    props.data?.forEach(element => {
      if (element.bank === "ACB") {
        const acbData = transformBankData(currencyList, element.data);
        bankList.forEach(bank => {
          if (bank.name === "ACB") {
            bank.data = acbData;
          }
        });
      } else if (element.bank === "VCB") {
        const vcbData = transformBankData(currencyList, element.data);
        bankList.forEach(bank => {
          if (bank.name === "VCB") {
            bank.data = vcbData;
          }
        });
      }
    });
  };
  watch(
    props.data,
    (newVal, oldVal) => {
      if (newVal) {
        contributeData();
      }
    },
    { deep: true, immediate: true }
  );
  const transformBankData = (currencyList, bankData) => {
    const data = [];
    for (const currency of currencyList) {
      let found = false;
      for (const currencyBank of bankData) {
        if (currency.name === currencyBank.title) {
          found = true;
          data.push(currencyBank);
          break;
        }
        if (!found) {
          data.push({ title: "none", buyCash: "none", buyTransfer: "none", sellCash: "none", sellTransfer: "none" });
        }
      }
    }
    return data;
  };
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
    position: sticky;
    left: 0;
    background-color: rgb(244, 252, 255);
    z-index: 1000;
    border-top-left-radius: 8px;
  }
  th:last-child {
    border-top-right-radius: 8px;
  }
  td:first-child {
    position: sticky;
    left: 0;
    background-color: white;
    z-index: 1000;
  }
  td {
    text-align: center;
    padding: 12px;
    border-top: 0.5px solid rgb(200, 200, 200);
  }
</style>
