import "./assets/main.css";
import "@popperjs/core";
import "bootstrap";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
import { useUserStore } from "./stores/user.store";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

// 验证 Token 有效性
const userStore = useUserStore();
userStore.validateToken();

app.mount("#app");
