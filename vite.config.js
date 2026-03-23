import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@thenick775/mgba-wasm']
  },
  build: {
    commonjsOptions: {
      include: [/@thenick775\/mgba-wasm/, /node_modules/]
    }
  }
})