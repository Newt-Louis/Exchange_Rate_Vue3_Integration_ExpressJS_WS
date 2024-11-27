<script setup>
  import { watch, ref, computed, onMounted } from "vue";
  import { useACBStore } from "../stores/acb.store.mjs";
  import { useVCBStore } from "../stores/vcb.store.mjs";
  import currencyList from "@/initialData.json";
  import TableComponent from "../components/TableComponent.vue";

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
    () => [bankSelected, currencySelected],
    async ([newBankSelected, newCurrencySelected]) => {
      console.log(newVal);
    }
  );
  watch(currencySelected, async newVal => {
    console.log(newVal);
  });
</script>

<template>
  <TableComponent :data="generalArr" :exchange-type="'cash'" :filter-exchange="valueSelect"></TableComponent>
  <TableComponent :data="generalArr" :exchange-type="`transfer`" :filter-exchange="valueSelect"></TableComponent>
  <a-row :gutter="[16, 8]">
    <a-col :span="12">
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
    <a-col :span="12">
      <a-typography-title :level="4">Currency Conversion</a-typography-title>
      <a-row :gutter="[16, 0]" align="middle">
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
    </a-col>
  </a-row>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
