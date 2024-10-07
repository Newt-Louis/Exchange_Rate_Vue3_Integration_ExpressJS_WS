<script setup>
  import { watch, ref, computed } from "vue";
  import { useACBStore } from "../stores/acb.store.mjs";
  import { useVCBStore } from "../stores/vcb.store.mjs";
  import TableComponent from "../components/TableComponent.vue";

  const acbStore = useACBStore();
  const vcbStore = useVCBStore();
  const generalArr = ref([]);

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
  <TableComponent :data="generalArr" :exchange-type="`cash`"></TableComponent>
  <TableComponent :data="generalArr" :exchange-type="`transfer`"></TableComponent>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
