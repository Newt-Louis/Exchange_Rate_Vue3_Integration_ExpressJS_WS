import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useACBStore } from "./acb.store.mjs";
import { useVCBStore } from "./vcb.store.mjs";
export const useWebSocketStore = defineStore("websocket", () => {
  const ws = ref(new WebSocket("ws://localhost:3001"));
  const isConnected = ref(false);
  const delay = ref(0);
  const acbStore = useACBStore();
  const vcbStore = useVCBStore();
  const connect = () => {
    ws.value.onopen = () => {
      isConnected.value = true;
      console.log("Connected to WebSocketServer");
    };
    ws.value.onmessage = event => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data?.type === "ping") {
        let clientTimestamp = Date.now();
        let serverTimestamp = data.timestamp;
        delay.value = clientTimestamp - serverTimestamp;
      } else {
        data.forEach(element => {
          switch (element.bank) {
            case "ACB":
              acbStore.getACBData(element.data);
              console.log("dữ liệu acb được nhận");

              break;
            case "VCB":
              vcbStore.getVCBData(element.data);
              console.log("dữ liệu vcb được nhận");

              break;
          }
        });
      }
    };
    ws.value.onerror = error => {
      console.log("Có lỗi kết nối " + err);
    };
  };

  const disconnect = () => {
    if (ws) {
      return ws.value.close(1, "Component UnMounted");
    }
  };

  return { ws, delay, isConnected, connect, disconnect };
});
