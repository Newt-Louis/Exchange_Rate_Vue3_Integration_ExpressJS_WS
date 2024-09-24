import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  // server: {
  //   proxy: {
  //     "^/(?!api).*$": {
  //       // Chuyển tiếp tất cả các yêu cầu không bắt đầu bằng /api
  //       target: "http://localhost:5173", // Giả sử Vite dev server chạy trên cổng 5173
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
