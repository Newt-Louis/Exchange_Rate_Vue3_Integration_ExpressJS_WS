<script setup>
  import { computed, onBeforeMount, onMounted, onUnmounted, ref } from "vue";
  import { useACBStore } from "../stores/acb.store.mjs";
  import { useVCBStore } from "../stores/vcb.store.mjs";
  import axios from "axios";
  import TableComponent from "../components/TableComponent.vue";
  defineProps({});
</script>

<template>
  <TableComponent></TableComponent>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
