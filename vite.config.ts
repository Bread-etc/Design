import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
import ViteCompression from "vite-plugin-compression";

const PORT = 3000;
const API_TARGET = "https://15bff5f7.r1.cpolar.top";

// vite 配置项
export default defineConfig(() => {
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
			// 启动 Brotli 压缩
			ViteCompression({
				algorithm: "brotliCompress",
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
			port: PORT,
			proxy: {
				"/api": {
					target: API_TARGET,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
			headers: {
				"cache-control": "public, max-age=3600",
			},
		},
		build: {
			minify: "terser",
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
			},
		},
	};
});
