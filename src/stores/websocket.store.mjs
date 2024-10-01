import { defineStore } from "pinia";
import { ref } from "vue";
import { useACBStore } from "./acb.store.mjs";
import { useVCBStore } from "./vcb.store.mjs";

export const useWebSocketStore = defineStore("websocket", () => {
  let ws = {};
  const isConnected = ref(false);
  const acbStore = useACBStore();
  const vcbStore = useVCBStore();

  const connect = () => {
    ws = new WebSocket("ws://localhost:3001");
    ws.value.onopen(() => {
      isConnected.value = true;
      console.log("Connected to WebSocketServer");
    });
    ws.value.addEventListener("message", onMessage);
    ws.value.addEventListener("error", onError);
    ws.value.addEventListener("pong");
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
    }
  };

  const onError = err => console.log("Có lỗi kết nối " + err);

  const disconnect = () => {
    if (ws) {
      return ws.value.close;
    }
  };

  return { ws, isConnected, connect, disconnect };
});
