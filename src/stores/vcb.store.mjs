import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useVCBStore = defineStore("VCB", () => {
  const vcbData = ref([]);
  const transformData = computed(() => {});
  const getVCBData = arr => (vcbData.value = arr);
  return { vcbData, transformData, getVCBData };
});
