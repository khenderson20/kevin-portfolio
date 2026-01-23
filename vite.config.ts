import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
 
export default defineConfig(({ mode }) => {
  // NOTE:
  // - `splitVendorChunkPlugin()` was deprecated; we keep deterministic chunking via `manualChunks` below.
  // - Vite already exposes `import.meta.env.MODE`; this keeps a legacy `VITE_APP_ENV` alias if the app expects it.
  const appEnv = process.env.VITE_APP_ENV ?? mode

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg'],
        manifest: {
          name: 'Kevin Henderson Portfolio',
          short_name: 'Kevin Portfolio',
          theme_color: '#000000',
          background_color: '#000000',
          display: 'standalone',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
    define: {
      'import.meta.env.VITE_APP_ENV': JSON.stringify(appEnv),
    },
    css: {
      postcss: './postcss.config.js',
    },
    build: {
      chunkSizeWarningLimit: 400,
      minify: 'esbuild',
      cssCodeSplit: true,
      // Avoid leaking source code via production sourcemaps
      sourcemap: false,
      emptyOutDir: true,
      assetsInlineLimit: 2048,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client'],
            animations: ['gsap'],
            ui: ['@material-tailwind/react'],
            icons: ['react-icons'],
          },
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
          // Rollup uses `[extname]` (includes the leading dot)
          assetFileNames: 'assets/[name].[hash][extname]',
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
      exclude: ['@material-tailwind/react'],
    },
  }
})
