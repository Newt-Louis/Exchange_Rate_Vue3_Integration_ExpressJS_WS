<script setup>
  import { watch, ref, computed, onMounted, h, reactive } from "vue";
  import { useACBStore } from "../stores/acb.store.mjs";
  import { useVCBStore } from "../stores/vcb.store.mjs";
  import currencyList from "@/initialData.json";
  import TableComponent from "../components/TableComponent.vue";
  import { deepCopy } from "../js/utilities.plugin.frontend.mjs";
  import { SwapOutlined } from "@ant-design/icons-vue";

  const svgPath = import.meta.env.VITE_CURRENCY_SVG;
  const currencyDisplayConversion = deepCopy(currencyList);
  currencyDisplayConversion.forEach(element => {
    element.imglink = svgPath + element.imglink;
  });
  const acbStore = useACBStore();
  const vcbStore = useVCBStore();
  const generalArr = ref([]);
  const valueSelect = ref([]);
  const selectFilterData = currencyList.map(element => ({
    value: element.name,
    label: element.name,
  }));
  const bankSelected = ref();
  const currencySelected = ref();
  const isVNDConversion = ref(true);
  const amoutInputValue = ref();
  const conversionedResult = reactive({
    imglink: "",
    name: "",
    vndCurrency: "",
    anotherCurrency: "",
  });
  const displayBankCurrency = computed(() => {
    let bankData;
    let result;
    switch (bankSelected.value) {
      case "ACB":
        bankData = acbStore.getACBData;
        result = bankData.data.map(cur => {
          return { value: cur.title };
        });
        break;
      case "VCB":
        bankData = vcbStore.getVCBData;
        result = bankData.data.map(cur => {
          return { value: cur.title };
        });
        break;
      default:
        result = selectFilterData;
        break;
    }
    return result;
  });
  watch(
    () => [acbStore.getACBData, vcbStore.getVCBData],
    ([newACBState, newVCBState], [oldACBState, oldVCBState]) => {
      if (generalArr.value.length > 0) generalArr.value.splice(0, generalArr.value.length);

      generalArr.value.push(newACBState, newVCBState);
    },
    { deep: true }
  );
  watch(
    () => [bankSelected.value, currencySelected.value],
    ([newBankSelected, newCurrencySelected]) => {
      let bankData;
      let currencyInstance;
      let currencyDisplay;
      switch (newBankSelected) {
        case "ACB":
          bankData = acbStore.getACBData;
          currencyInstance = bankData.data.find(cur => cur.title.includes(newCurrencySelected));
          currencyDisplay = currencyDisplayConversion.find(cur => cur.name === newCurrencySelected);
          if (currencyInstance) {
            conversionedResult.imglink = currencyDisplay?.imglink ?? "";
            conversionedResult.name = newCurrencySelected;
          }
          break;

        case "VCB":
          bankData = vcbStore.getVCBData;
          currencyInstance = bankData.data.find(cur => cur.title.includes(newCurrencySelected));
          currencyDisplay = currencyDisplayConversion.find(cur => cur.name === newCurrencySelected);
          if (currencyInstance) {
            conversionedResult.imglink = currencyDisplay?.imglink ?? "";
            conversionedResult.name = newCurrencySelected;
          }
          break;
        default:
          break;
      }
    }
  );
  function handleOnInputAmount() {
    console.log(amoutInputValue.value);
  }
  function handleOnSwapConversion() {
    isVNDConversion.value = !isVNDConversion.value;
  }
</script>

<template>
  <TableComponent :data="generalArr" :exchange-type="'cash'" :filter-exchange="valueSelect"></TableComponent>
  <TableComponent :data="generalArr" :exchange-type="`transfer`" :filter-exchange="valueSelect"></TableComponent>
  <a-row :gutter="[16, 8]">
    <a-col :span="8">
      <a-typography-title :level="4">Filter Currency</a-typography-title>
      <a-select
        v-model:value="valueSelect"
        mode="multiple"
        style="width: 100%"
        placeholder="Please select"
        :options="selectFilterData"
        id="rc_select"
      ></a-select>
    </a-col>
    <a-col :span="16" class="conversion-container">
      <a-typography-title :level="4">Currency Conversion</a-typography-title>
      <a-row :gutter="[16, 0]" align="middle" style="margin-bottom: 12px">
        <a-col :span="6" style="text-align: end"><a-typography-text strong>Select bank:</a-typography-text></a-col>
        <a-col :span="6">
          <a-select
            v-model:value="bankSelected"
            style="width: 100%"
            placeholder="Select bank"
            :options="[{ value: 'ACB' }, { value: 'VCB' }]"
            id="bank_select"
          ></a-select>
        </a-col>
        <a-col :span="6" style="text-align: end"><a-typography-text strong>Select currency:</a-typography-text></a-col>
        <a-col :span="6">
          <a-select
            v-model:value="currencySelected"
            style="width: 100%"
            placeholder="Select currency"
            :options="displayBankCurrency"
            id="currency_select"
          >
          </a-select>
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span="10">
          <div class="card-currency">
            <a-flex align="center" justify="space-around" v-if="isVNDConversion">
              <img src="/src/assets/imgForeignCurrency/im-flag-vnd.svg" alt="vnd-currency" width="70px" height="70px" />
              <a-typography-title :level="2" style="margin-bottom: 0">VND</a-typography-title>
            </a-flex>
            <a-flex align="center" justify="space-around" v-else>
              <img :src="conversionedResult.imglink" :alt="conversionedResult.name" width="70px" height="70px" />
              <a-typography-title :level="2" style="margin-bottom: 0">{{ conversionedResult.name }}</a-typography-title>
            </a-flex>
            <a-input
              v-model:value="amoutInputValue"
              :bordered="false"
              size="large"
              placeholder="Input the amount here ..."
              style="font-size: 18px"
              @input="handleOnInputAmount"
            ></a-input>
          </div>
        </a-col>
        <a-col :span="4">
          <a-button :icon="h(SwapOutlined)" @click="handleOnSwapConversion"> Swap </a-button>
        </a-col>
        <a-col :span="10">
          <div class="card-currency">
            <a-flex align="center" justify="space-around" v-if="isVNDConversion">
              <img :src="conversionedResult.imglink" :alt="conversionedResult.name" width="70px" height="70px" />
              <a-typography-title :level="2" style="margin-bottom: 0">{{ conversionedResult.name }}</a-typography-title>
            </a-flex>
            <a-flex align="center" justify="space-around" v-else>
              <img src="/src/assets/imgForeignCurrency/im-flag-vnd.svg" alt="vnd-currency" width="70px" height="70px" />
              <a-typography-title :level="2" style="margin-bottom: 0">VND</a-typography-title>
            </a-flex>
            <a-typography-text style="font-size: 24px; text-align: center"
              >{{ conversionedResult.anotherCurrency }}20000</a-typography-text
            >
          </div>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
  .conversion-container {
    padding: 12px;
    background-color: rgb(240, 240, 240);
    border-radius: 8px;
  }
  .card-currency {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 150px;
  }
</style>
