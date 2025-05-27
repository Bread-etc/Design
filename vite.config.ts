import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
import ViteCompression from "vite-plugin-compression";
import LegacyPlugin from "@vitejs/plugin-legacy";

const API_TARGET = "https://6b1ec566.r8.cpolar.top";

// vite 配置项
export default defineConfig(() => {
	return {
		plugins: [
			vue(),
			Components({
				resolvers: [
					AntDesignVueResolver({
						importStyle: "less",
					}),
				],
			}),
			// 启动 Brotli 压缩
			ViteCompression({
				algorithm: "brotliCompress",
				ext: ".js,.css,.html,.webp",
				threshold: 10240,
				deleteOriginFile: false,
			}),
			LegacyPlugin({
				targets: ["chrome 52", "Android > 39", "iOS >= 10.3", "iOS >= 10.3"],
				additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
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
				less: {
					javascriptEnabled: true,
				},
			},
		},
		server: {
			port: 3000,
			proxy: {
				"/api": {
					target: API_TARGET,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
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
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes("node_modules")) {
							return id.toString().split("node_modules/")[1].split("/")[0].toString();
						}
					},
				},
			},
		},
	};
});
