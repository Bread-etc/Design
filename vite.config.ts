import { fileURLToPath, URL } from "node:url";
import { ConfigEnv, defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";

// vite 配置项
export default defineConfig(({ command }: ConfigEnv) => {
	return {
		plugins: [
			vue(),
			Components({
				resolvers: [
					AntDesignVueResolver({
						importStyle: false, // css in js
					}),
				],
			}),
		],
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
					target: "https://75b3c7ad.r1.cpolar.top",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
	};
});
