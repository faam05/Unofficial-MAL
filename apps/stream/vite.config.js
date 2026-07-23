import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      external: ['@mantine/core'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@styles': path.resolve(__dirname, 'src/styles'),

      '@shared': path.resolve(__dirname, '../../packages/shared'),
    },
  },

  server: {
    allowedHosts: ['stream.test'], // Sesuaikan dengan domain di file hosts tadi
    host: 'stream.test', // Sesuaikan dengan domain di file hosts tadi
    port: 5174, // Kamu bisa ubah port-nya sesuka hati (opsional)
  },
})
