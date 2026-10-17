import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      // includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      // manifest: {
      //   name: 'stream-anime',
      //   short_name: 'stream',
      //   theme_color: '#ffffff',
      //   background_color: '#ffffff',
      //   display: 'standalone',
      //   icons: [
      // {
      //   src: '/pwa-192x192.png',
      //   sizes: '192x192',
      //   type: 'image/png',
      //   purpose: 'any',
      // },
      // {
      //   src: '/pwa-512x512.png',
      //   sizes: '512x512',
      //   type: 'image/png',
      //   purpose: 'any',
      // },
      // {
      //   src: '/maskable-icon-512x512.png',
      //   sizes: '512x512',
      //   type: 'image/png',
      //   purpose: 'maskable',
      // },
      //   ],
      // },
      manifest: false,
      devOptions: {
        enabled: true,
      },
      injectRegister: 'auto',
      workbox: {
        // Wajib mengarahkan fallback ke index.html agar router React bisa menangani rute saat offline
        navigateFallback: '/index.html',
        // Opsional: abaikan rute tertentu jika ada (seperti file API backend)
        navigateFallbackDenylist: [/^\/api/],
      },
    }),
  ],
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

  // server: {
  //   allowedHosts: ['localhost'], // Sesuaikan dengan domain di file hosts tadi
  //   host: 'localhost', // Sesuaikan dengan domain di file hosts tadi
  //   port: 5174, // Kamu bisa ubah port-nya sesuka hati (opsional)
  // },

  server: {
    host: ['stream.test', '0.0.0.0'], // Domain lokal ala Laragon
    port: 5174,
    https: true, // Mengaktifkan HTTPS otomatis via mkcert
    allowedHosts: true, // Mengizinkan host kustom
  },
})
