import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss(),
    createStyleImportPlugin({
      resolves: [
        ElementPlusResolver(),
      ],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
            if (/el-/.test(name))
              name = name.slice(3, name.length)
            return `element-plus/es/components/${name}/style/css`
          },
        },
      ],
    }),
  ],
  server: {
    port: 2320,
  },
})
