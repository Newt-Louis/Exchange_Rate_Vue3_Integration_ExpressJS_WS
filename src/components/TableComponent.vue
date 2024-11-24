<template>
  <div class="container-table" v-if="isExchangeType">
    <a-typography-title :level="2" class="table-title">Buy / Sell Cash</a-typography-title>
    <table class="table-layout">
      <thead class="table-thead">
        <tr class="table-tr">
          <th class="table-th"><span>Bank</span></th>
          <th v-for="(title, index) in frTH" :key="index" class="table-th">
            <img :src="title.imglink" :alt="title.name" />
            <span>{{ title.name }}</span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bank, index) in frTD" :key="index">
          <td>
            <img :src="bank.imglink" alt="" width="50px" height="30px" style="margin-right: 8px" />{{ bank.name }}
          </td>
          <td v-for="(value, index) in bank.data" :key="index">
            <div class="buy-sell">Giá bán / Giá mua</div>
            <div class="buy-sell-value">
              <span>{{ value?.buyCash }}</span>
              /
              <span>{{ value?.sellCash }}</span>
            </div>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="container-table" v-else>
    <a-typography-title :level="2" class="table-title">Buy / Sell Transfer</a-typography-title>
    <table class="table-layout">
      <thead class="table-thead">
        <tr class="table-tr">
          <th class="table-th"><span>Bank</span></th>
          <th v-for="(title, index) in frTH" :key="index" class="table-th">
            <img :src="title.imglink" :alt="title.name" />
            <span>{{ title.name }}</span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bank, index) in frTD" :key="index">
          <td>
            <img :src="bank.imglink" alt="" width="50px" height="30px" style="margin-right: 8px" />{{ bank.name }}
          </td>
          <td v-for="(value, index) in bank.data" :key="index">
            <div class="buy-sell">Giá bán / Giá mua</div>
            <div class="buy-sell-value">
              <span>{{ value?.buyTransfer }}</span>
              /
              <span>{{ value?.sellTransfer }}</span>
            </div>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { computed, nextTick, onBeforeMount, onMounted, ref, watch, watchEffect } from "vue";
  /* currencyData is now a new variable with memory created
  from the server including all the data of the json file,
  vite will automatically convert the json data into javascript data.  */
  import currencyData from "@/initialData.json";
  import { deepCopy } from "../js/utilities.plugin.frontend.mjs";

  const props = defineProps({
    exchangeType: {
      type: String,
      validator(value) {
        return ["transfer", "cash"].includes(value);
      },
    },
    data: Array,
    filterExchange: {
      type: Array,
      default: () => {
        return [];
      },
    },
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

  const bankList = ref([
    { name: "ACB", imglink: `${pngPath}/acb_logo.png` },
    { name: "VCB", imglink: `${pngPath}/vcb_logo.png` },
  ]);
  const contributeData = () => {
    props.data?.forEach(element => {
      if (element.bank === "ACB") {
        const acbData = transformBankData(currencyList, element.data);
        bankList.value.forEach(bank => {
          if (bank.name === "ACB") {
            bank.data = acbData;
          }
        });
      } else if (element.bank === "VCB") {
        const vcbData = transformBankData(currencyList, element.data);
        bankList.value.forEach(bank => {
          if (bank.name === "VCB") {
            bank.data = vcbData;
          }
        });
      }
    });
  };
  const transformBankData = (currencyList, bankData) => {
    const data = [];
    for (const currency of currencyList) {
      let found = false;
      for (const currencyBank of bankData) {
        if (currency.name.includes(currencyBank.title)) {
          found = true;
          data.push(currencyBank);
          break;
        }
      }
      if (!found) {
        data.push({
          title: currency.name,
          buyCash: "none",
          buyTransfer: "none",
          sellCash: "none",
          sellTransfer: "none",
        });
      }
    }
    return data;
  };
  const frTH = ref([]);
  const frTD = ref([
    { name: "ACB", data: [], imglink: `${pngPath}/acb_logo.png` },
    { name: "VCB", data: [], imglink: `${pngPath}/vcb_logo.png` },
  ]);
  onBeforeMount(() => {
    contributeData();
  });
  watchEffect(() => {
    const arrValidate = frTH.value.reduce((accumulator, currentValue) => {
      const newObject = { name: currentValue.name, check: false };
      accumulator.push(newObject);
      return accumulator;
    }, []);

    for (let i = 0; i < bankList.value.length; i++) {
      frTD.value[i].data = [];

      if (bankList.value[i]?.data) {
        for (let j = 0; j < bankList.value[i].data.length; j++) {
          let found = false;
          for (let k = 0; k < arrValidate.length; k++) {
            const exchangeName = bankList.value[i].data[j].title;
            if (arrValidate[k].name.includes(exchangeName)) {
              found = true;
              arrValidate[k].check = true;
              frTD.value[i].data.push(bankList.value[i].data[j]);
              break;
            }
          }
          if (!found) {
          }
          const stop = arrValidate.every(element => element.check);
          if (stop) break;
        }
      }
      arrValidate.forEach(element => (element.check = false));
    }
  });
  watch(
    () => props.filterExchange,
    newVal => {
      const arrValidate = newVal.reduce((accumulator, currentValue) => {
        const newObject = { name: currentValue, check: false };
        accumulator.push(newObject);
        return accumulator;
      }, []);
      frTH.value = [];

      if (newVal.length <= 0) {
        frTH.value.push(...currencyList);
      } else {
        for (let i = 0; i < currencyList.length; i++) {
          for (let j = 0; j < arrValidate.length; j++) {
            if (currencyList[i].name.includes(arrValidate[j].name)) {
              arrValidate[j].check = true;
              frTH.value.push(currencyList[i]);
              break;
            }
          }
          const stop = arrValidate.every(element => element.check);
          if (stop) break;
        }
      }
    },
    { immediate: true }
  );
  watch(
    () => props.exchangeType,
    newVal => {
      if (newVal === "cash") {
        isExchangeType.value = true;
      } else {
        isExchangeType.value = false;
      }
    },
    { immediate: true }
  );
  watch(
    () => props.data,
    (newVal, oldVal) => {
      if (newVal) contributeData();
    },
    { deep: true, immediate: true }
  );
</script>

<style>
  .container-table {
    overflow-x: scroll;
    margin-bottom: 48px;
  }
  .table-layout {
    width: 5200px;
    table-layout: fixed;
  }
  .table-th {
    padding: 12px;
    width: 180px;
    max-width: 180px;
    font-size: 16px;
  }
  .table-th > img {
    margin-right: 8px;
  }
  .table-thead {
    background-color: rgb(244, 252, 255);
  }
  .table-title {
    position: sticky;
    left: 0;
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
    padding: 8px;
    border-top: 0.5px solid rgb(200, 200, 200);
  }
  .buy-sell {
    margin-bottom: 8px;
  }

  .buy-sell-value {
    font-size: 16px;
  }
</style>
