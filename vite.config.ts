import { fileURLToPath, URL } from "node:url";

import { ConfigEnv, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// vite 配置项
export default defineConfig(({ command }: ConfigEnv) => {
	return {
		plugins: [vue()],
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
		css: {
			preprocessorOptions: {
				sass: {
					api: "legacy",
				},
			},
		},
		server: {
			port: 3000,
			proxy: {
				"/api": {
					target: "https://4fe99cc8.r1.cpolar.top",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
	};
});
