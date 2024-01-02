import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  resolve
} from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver
} from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.less', '.json'],
    alias: {
      //设置别名
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    port: 8190,
    open: true,
    host: '192.168.6.239',
    proxy: {
      '/image': { // api表示当前项目请求的key
        target: 'http://192.168.6.239:8082', // 代理服务器路径  'http://192.168.6.226:8089'   http://192.168.6.237:8089
        changeOrigin: true
      },
      '/d04': { // api表示当前项目请求的key
        target: 'http://10.0.1.129:9002/', // 代理服务器路径  'http://192.168.6.226:8089'   http://192.168.6.237:8089
        changeOrigin: true
      }
    }
  },
})
