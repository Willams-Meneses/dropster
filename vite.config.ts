import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'  // ← Agrega esta línea

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {              // ← Agrega todo este bloque
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@types': path.resolve(__dirname, './src/types'),
    }
  }
})