import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useACBStore = defineStore("ACB", () => {
  const acbData = ref({});
  const getACBData = computed(() => {
    const newData = { ...acbData.value };
    const transformData = newData?.data?.map(element => {
      const newElement = { ...element };
      for (const key in newElement) {
        if (newElement[key] === "") {
          newElement[key] = "-";
        }
      }
      return newElement;
    });
    return {
      bank: newData?.bank ?? "unknow bank",
      crawled_at: newData?.crawled_at ?? "unknown time",
      data: transformData,
    };
  });
  const insertACBData = arr => (acbData.value = arr);

  return { acbData, getACBData, insertACBData };
});
