import { defineStore } from "pinia";
import { ref } from "vue";
import { useACBStore } from "./acb.store.mjs";
import { useVCBStore } from "./vcb.store.mjs";

export const useWebSocketStore = defineStore("websocket", () => {
  const ws = ref({});
  const isConnected = ref(false);
  const acbStore = useACBStore();
  const vcbStore = useVCBStore();

  const connect = () => {
    ws.value = new WebSocket("ws://localhost:3001");
    ws.value.onopen(() => {
      isConnected.value = true;
      console.log("Connected to WebSocketServer");
    });
    ws.value.addEventListener("message", onMessage);
    ws.value.addEventListener("error", onError);
  };

  const onMessage = event => {
    const data = JSON.parse(event.data);
    switch (data[0]) {
      case "ACB":
        acbStore.getACBData(data[1]);
        break;
      case "VCB":
        vcbStore.getVCBData(data[1]);
        break;
      default:
        break;
    }
  };

  const onError = err => console.log("Có lỗi kết nối " + err);

  return { ws, isConnected, connect };
});
