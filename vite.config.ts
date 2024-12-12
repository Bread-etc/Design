import { fileURLToPath, URL } from 'node:url'

import { ConfigEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

// vite 配置项
export default defineConfig(({ command }: ConfigEnv) => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock', // 指定 mock 文件夹的路径
        enable: command === 'serve', // 指定在开发环境使用
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
