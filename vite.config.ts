import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "frame-ancestors 'self'",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Modern browsers only — smaller output, no legacy polyfills
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React runtime — tiny, loads first
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/')) {
            return 'react-vendor';
          }
          // Three.js — only loaded when a planet modal is opened (lazy)
          if (id.includes('node_modules/three') ||
              id.includes('node_modules/@react-three/')) {
            return 'three-vendor';
          }
          // Animation + icon libraries
          if (id.includes('node_modules/framer-motion')) return 'framer-motion';
          if (id.includes('node_modules/lucide-react') ||
              id.includes('node_modules/react-icons')) {
            return 'icons';
          }
          // Radix UI components (used by shadcn/ui)
          if (id.includes('node_modules/@radix-ui/')) return 'radix-ui';
        },
      },
    },
    chunkSizeWarningLimit: 600,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,       // Two compression passes for smaller output
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
