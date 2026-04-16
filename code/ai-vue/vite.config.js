import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueDevtools from 'vite-plugin-vue-devtools'



// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevtools()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})

