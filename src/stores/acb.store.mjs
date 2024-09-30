import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useACBStore = defineStore("ACB", () => {
  const acbData = ref([]);
  const transformData = computed(() => {});
  const getACBData = arr => (acbData.value = arr);

  return { acbData, transformData, getACBData };
});
