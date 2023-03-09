import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslint()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: path.join(__dirname, 'dist')
  }
})
