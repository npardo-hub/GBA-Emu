import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Estas cabeceras son OBLIGATORIAS para que mGBA-wasm funcione
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  optimizeDeps: {
    // Evita que Vite intente pre-procesar el archivo JS del emulador
    exclude: ['@thenick775/mgba-wasm']
  }
})