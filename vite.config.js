import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'

export default defineConfig({
  build: {
    // 库模式配置
    lib: {
      // 入口文件
      entry: './src/index.js',
      // ESModule模式
      formats: ['es'],
      // 输出的文件名
      fileName: 'index',
    },
    rollupOptions: {
      // 外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-plus', '@element-plus/icons-vue'],
      output: {
        // 为外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  // 构建插件
  plugins: [
    vue(),
    Unocss(),
  ],
})
