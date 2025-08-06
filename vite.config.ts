import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_APP_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          aws: ['aws-amplify', '@aws-amplify/ui-react']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
