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
    curInstance: {},
    vndCurrencyCash: 0,
    vndCurrencyTransfer: 0,
    currencyToChangeCash: 0,
    currencyToChangeTransfer: 0,
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
            conversionedResult.curInstance = currencyInstance;
          }
          break;

        case "VCB":
          bankData = vcbStore.getVCBData;
          currencyInstance = bankData.data.find(cur => cur.title.includes(newCurrencySelected));
          currencyDisplay = currencyDisplayConversion.find(cur => cur.name === newCurrencySelected);
          if (currencyInstance) {
            conversionedResult.imglink = currencyDisplay?.imglink ?? "";
            conversionedResult.curInstance = currencyInstance;
          }
          break;
        default:
          break;
      }
      handleOnInputAmount();
    }
  );
  /**
   * Depend on swap conversion to excute logic exchange money
   * price to exchange is still VND but it's means that how many VND
   * can be changed to a unit by that chosen currency
   */
  function handleOnInputAmount() {
    // isVNDConversion.value = true means sell VND to chosen currency
    if (amoutInputValue.value === undefined || amoutInputValue.value === null || amoutInputValue.value === "") {
      conversionedResult.currencyToChangeCash = 0;
      conversionedResult.currencyToChangeTransfer = 0;
      conversionedResult.vndCurrencyCash = 0;
      conversionedResult.vndCurrencyTransfer = 0;
      return;
    }
    if (!conversionedResult.curInstance) {
      conversionedResult.currencyToChangeCash = 0;
      conversionedResult.currencyToChangeTransfer = 0;
      conversionedResult.vndCurrencyCash = 0;
      conversionedResult.vndCurrencyTransfer = 0;
      return;
    }
    conversionedResult.currencyToChangeCash = sellVNDToChosenCurrency(
      amoutInputValue.value,
      conversionedResult.curInstance?.buyCash
    );
    conversionedResult.currencyToChangeTransfer = sellVNDToChosenCurrency(
      amoutInputValue.value,
      conversionedResult.curInstance?.buyTransfer
    );
    conversionedResult.vndCurrencyCash = buyVNDToChosenCurrency(
      amoutInputValue.value,
      conversionedResult.curInstance?.sellCash
    );
    conversionedResult.vndCurrencyTransfer = buyVNDToChosenCurrency(
      amoutInputValue.value,
      conversionedResult.curInstance?.sellTransfer
    );
    console.log(conversionedResult);
  }
  /**
   * Swap mean get money exchange between buy or sell with the bank
   */
  function handleOnSwapConversion() {
    isVNDConversion.value = !isVNDConversion.value;
  }

  /**
   * casting string-number from curInstance to Number
   * @param {String} stringNumber
   */
  function castStringToNumber(stringNumber) {
    const controlStringNumberRegexp = /^[\d,.]+\d$/;
    if (stringNumber === "-") {
      return "None";
    }
    if (controlStringNumberRegexp.test(stringNumber)) {
      const clearCommas = stringNumber.replace(/,/g, "");
      return parseFloat(clearCommas);
    }
  }

  /**
   * function sell VND to chosen currency
   * @param {Number} vndInputAmount
   * @param {String} vndToChange
   */
  function sellVNDToChosenCurrency(vndInputAmout, vndToChange) {
    let priceToExchange = castStringToNumber(vndToChange);
    if (!vndToChange) {
      return 0;
    }
    if (priceToExchange === "None") {
      return 0;
    }
    let result = Math.round((vndInputAmout / priceToExchange) * 1000) / 1000;
    return result;
  }

  /**
   * function exchange VND to chosen currency
   * @param {Number} currencyInputAmout
   * @param {String} vndToChange
   */
  function buyVNDToChosenCurrency(currencyInputAmout, vndToChange) {
    let priceToExchange = castStringToNumber(vndToChange);
    if (!vndToChange) {
      return 0;
    }
    if (priceToExchange === "None") {
      return 0;
    }
    let result = Math.round(currencyInputAmout * priceToExchange * 1000) / 1000;
    return result;
  }
  /**
   * casting number into string with commas to render on browser
   * @param {Number} number
   */
  function formattedNumber(number) {
    let changeNumberToString = number + "";
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    let result = changeNumberToString.replace(regexp, ",");
    return result;
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
              <img
                v-if="conversionedResult.imglink"
                :src="conversionedResult.imglink"
                :alt="conversionedResult.name"
                width="70px"
                height="70px"
              />
              <a-typography-title :level="2" style="margin-bottom: 0">{{ conversionedResult.name }}</a-typography-title>
            </a-flex>
            <a-input-number
              v-model:value="amoutInputValue"
              :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\$\s?|(,*)/g, '')"
              :bordered="false"
              size="large"
              placeholder="Input the amount here ..."
              style="font-size: 18px; width: 100%"
              @input="handleOnInputAmount"
            />
          </div>
        </a-col>
        <a-col :span="4">
          <a-button :icon="h(SwapOutlined)" @click="handleOnSwapConversion"> Swap </a-button>
        </a-col>
        <a-col :span="10">
          <div class="card-currency">
            <a-flex align="center" justify="space-around" v-if="isVNDConversion">
              <img
                v-if="conversionedResult.imglink"
                :src="conversionedResult.imglink"
                :alt="conversionedResult.curInstance?.title"
                width="70px"
                height="70px"
              />
              <a-typography-title :level="2" style="margin-bottom: 0">{{
                conversionedResult.curInstance?.title
              }}</a-typography-title>
            </a-flex>
            <a-flex align="center" justify="space-around" v-else>
              <img src="/src/assets/imgForeignCurrency/im-flag-vnd.svg" alt="vnd-currency" width="70px" height="70px" />
              <a-typography-title :level="2" style="margin-bottom: 0">VND</a-typography-title>
            </a-flex>
            <article v-if="isVNDConversion">
              <a-flex align="center">
                <a-typography-title :level="5" style="margin-bottom: 0; margin-right: 12px">Cash: </a-typography-title>
                <a-typography-text style="font-size: 24px; text-align: center">
                  {{ formattedNumber(conversionedResult.currencyToChangeCash) }}
                </a-typography-text>
              </a-flex>
              <a-flex align="center">
                <a-typography-title :level="5" style="margin-bottom: 0; margin-right: 12px">
                  Transfer:
                </a-typography-title>
                <a-typography-text style="font-size: 24px; text-align: center">
                  {{ formattedNumber(conversionedResult.currencyToChangeTransfer) }}
                </a-typography-text>
              </a-flex>
            </article>
            <article v-else>
              <a-flex align="center">
                <a-typography-title :level="5" style="margin-bottom: 0; margin-right: 12px">Cash: </a-typography-title>
                <a-typography-text style="font-size: 24px; text-align: center">
                  {{ formattedNumber(conversionedResult.vndCurrencyCash) }}
                </a-typography-text>
              </a-flex>
              <a-flex align="center">
                <a-typography-title :level="5" style="margin-bottom: 0; margin-right: 12px">
                  Transfer:
                </a-typography-title>
                <a-typography-text style="font-size: 24px; text-align: center">
                  {{ formattedNumber(conversionedResult.vndCurrencyTransfer) }}
                </a-typography-text>
              </a-flex>
            </article>
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
    justify-content: space-evenly;
    height: 150px;
  }
</style>
