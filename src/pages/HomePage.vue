<script setup>
  import { watch, ref, computed } from "vue";
  import { useACBStore } from "../stores/acb.store.mjs";
  import { useVCBStore } from "../stores/vcb.store.mjs";
  import TableComponent from "../components/TableComponent.vue";

  const acbStore = useACBStore();
  const vcbStore = useVCBStore();
  const generalArr = ref([]);
  const propBankData = (...value) => {
    const data = [];
    data.push(value);
    return data;
  };
  console.log(generalArr.value);

  watch(
    () => [acbStore.getACBData, vcbStore.getVCBData],
    ([newACBState, newVCBState], [oldACBState, oldVCBState]) => {
      generalArr.value = [newACBState, newVCBState];
      console.log(generalArr.value);
    },
    { deep: true }
  );
</script>

<template>
  <TableComponent :data="generalArr"></TableComponent>
  <div>{{ generalArr }}</div>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
