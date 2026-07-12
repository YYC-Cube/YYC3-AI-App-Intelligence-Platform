import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger'],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'yyc3-icons/**/*.png',
        'yyc3-icons/**/*.svg',
        'yyc3-icons/**/*.webp',
        'yyc3-icons/favicon/*.ico',
      ],
      manifest: {
        name: 'YYC³ AI Intelligence Platform',
        short_name: 'YYC³ AI',
        description:
          'Enterprise-grade analytics and intelligence platform for mobile app developers - AI-powered insights for App Store Optimization, market intelligence, and competitive analysis',
        theme_color: '#0C70F2',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'any',
        scope: '/',
        start_url: '/',
        categories: ['business', 'productivity', 'analytics'],
        lang: 'zh-CN',
        dir: 'ltr',
        icons: [
          { src: '/yyc3-icons/pwa/icon-72x72.png', sizes: '72x72', type: 'image/png' },
          { src: '/yyc3-icons/pwa/icon-96x96.png', sizes: '96x96', type: 'image/png' },
          { src: '/yyc3-icons/pwa/icon-128x128.png', sizes: '128x128', type: 'image/png' },
          { src: '/yyc3-icons/pwa/icon-144x144.png', sizes: '144x144', type: 'image/png' },
          { src: '/yyc3-icons/pwa/icon-152x152.png', sizes: '152x152', type: 'image/png' },
          {
            src: '/yyc3-icons/pwa/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          { src: '/yyc3-icons/webp/icon-192x192.webp', sizes: '192x192', type: 'image/webp' },
          { src: '/yyc3-icons/pwa/icon-384x384.png', sizes: '384x384', type: 'image/png' },
          {
            src: '/yyc3-icons/pwa/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          { src: '/yyc3-icons/webp/icon-512x512.webp', sizes: '512x512', type: 'image/webp' },
        ],
        shortcuts: [
          { name: 'Dashboard', url: '/dashboard', description: 'Go to main dashboard' },
          { name: 'Analytics', url: '/analytics', description: 'View analytics reports' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24,
              },
              networkTimeoutSeconds: 10,
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /https:\/\/fonts\.googleapis\.com/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:js|css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 3200,
    host: true,
    open: true,
  },
  preview: {
    port: 3200,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion') || id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            if (id.includes('recharts')) {
              return 'charts-vendor';
            }
            if (id.includes('date-fns')) {
              return 'date-utils';
            }
            if (id.includes('sonner') || id.includes('tailwind-merge')) {
              return 'ui-utils';
            }
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
  },
});
