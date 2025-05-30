import "./assets/main.css";
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

// 添加全局初始化浅色、深色主题
const savedTheme = localStorage.getItem("theme") || "light";
document.body.setAttribute("data-bs-theme", savedTheme);

// 验证 Token 有效性
const userStore = useUserStore();
userStore.validateToken();

// 按需加载第三方库
async function loadThirdPartyLibraries() {
	await import("@popperjs/core");
	await import("bootstrap");
}

loadThirdPartyLibraries();

app.mount("#app");
