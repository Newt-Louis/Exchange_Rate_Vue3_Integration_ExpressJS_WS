import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useVCBStore = defineStore("VCB", () => {
  const vcbData = ref([]);
  const getVCBData = computed(() => {
    return vcbData.value;
  });
  const insertVCBData = arr => (vcbData.value = arr);
  return { vcbData, getVCBData, insertVCBData };
});
