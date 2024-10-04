import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useACBStore } from "./acb.store.mjs";
import { useVCBStore } from "./vcb.store.mjs";
export const useWebSocketStore = defineStore("websocket", () => {
  const ws = new WebSocket("ws://localhost:3001");
  const isConnected = ref(false);
  const delay = ref("");
  const acbStore = useACBStore();
  const vcbStore = useVCBStore();
  const connect = () => {
    ws.onopen = () => {
      isConnected.value = true;
      console.log("Connected to WebSocketServer");
    };
    ws.onmessage = event => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data?.type === "ping") {
        const clientTimestamp = Date.now();
        const serverTimestamp = data.timestamp;
        delay.value = clientTimestamp - serverTimestamp;
      } else {
        data.forEach(element => {
          switch (element.bank) {
            case "ACB":
              acbStore.insertACBData(element.data);
              break;
            case "VCB":
              vcbStore.insertVCBData(element.data);
              break;
          }
        });
      }
    };
    ws.onerror = error => {
      console.log("Có lỗi kết nối " + error);
    };
  };

  const disconnect = () => {
    if (ws) {
      return ws.close(1, "Component UnMounted");
    }
  };

  return { ws, delay, isConnected, connect, disconnect };
});
