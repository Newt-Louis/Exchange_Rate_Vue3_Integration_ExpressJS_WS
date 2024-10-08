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
  const selectData = currencyList.map(element => ({
    value: element.name,
    label: element.name,
  }));

  watch(
    () => [acbStore.getACBData, vcbStore.getVCBData],
    ([newACBState, newVCBState], [oldACBState, oldVCBState]) => {
      if (generalArr.value.length > 0) generalArr.value.splice(0, generalArr.value.length);

      generalArr.value.push(newACBState, newVCBState);
    },
    { deep: true }
  );
</script>

<template>
  <TableComponent :data="generalArr" :exchange-type="'cash'" :filter-exchange="valueSelect"></TableComponent>
  <TableComponent :data="generalArr" :exchange-type="`transfer`" :filter-exchange="valueSelect"></TableComponent>
  <a-row>
    <a-col :span="12">
      <a-typography-title :level="4">Filter Currency</a-typography-title>
      <a-select
        v-model:value="valueSelect"
        mode="multiple"
        style="width: 100%"
        placeholder="Please select"
        :options="selectData"
        id="rc_select"
      ></a-select>
    </a-col>
    <a-col :span="12"></a-col>
  </a-row>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
