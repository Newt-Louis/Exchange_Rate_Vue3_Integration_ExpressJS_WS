import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import antdv from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const pinia = createPinia();
  const app = createSSRApp(App);
  app.use(pinia);
  app.use(antdv);
  return { app };
}
