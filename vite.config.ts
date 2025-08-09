import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_APP_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          aws: ['aws-amplify', '@aws-amplify/ui-react', '@aws-amplify/core', '@aws-amplify/auth'],
          animations: ['gsap'],
          ui: ['@material-tailwind/react', 'react-icons'],
          utils: ['clsx', 'uuid']
        }
      }
    },
    chunkSizeWarningLimit: 600,
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: true,
    emptyOutDir: true,
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
