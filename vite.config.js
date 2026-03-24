import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Le decimos a Rollup que NO intente procesar esta librería
      external: ['@thenick775/mgba-wasm'],
    },
    commonjsOptions: {
      // Evita que el plugin de CommonJS intente analizar la librería
      exclude: [/@thenick775\/mgba-wasm/],
    }
  },
  optimizeDeps: {
    exclude: ['@thenick775/mgba-wasm']
  }
})