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
  <div style="height: 1000px; position: relative; width: 1100px">
    <h1 style="position: absolute; right: 0">Hello</h1>
  </div>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
