import { createWebHistory, createRouter, createMemoryHistory } from "vue-router";

const pages = import.meta.glob("./pages/*.vue");

const routes = Object.keys(pages).map(filePath => {
  const route = filePath.match(/\.\/pages(.*)\.vue$/)[1];

  return {
    path: route === "/index" ? "/" : route,
    component: pages[filePath],
  };
});
export function createRouter() {
  return createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });
}
