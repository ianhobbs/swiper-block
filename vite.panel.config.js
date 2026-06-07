import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

/**
 * Vite config for the PANEL bundle.
 *
 * Outputs:
 *   panel/index.js — Pre-built Panel plugin registration (with Vue + Swiper bundled)
 *
 * Security: This .vue file is compiled locally in development and committed
 * as a static .js file. Kirby will never process .vue files on the live server.
 *
 * Usage: Kirby auto-loads panel/index.js when the plugin is active.
 */
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'panel',
    emptyOutDir: false,
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.js'),
      name: 'SwiperBlockPanel',
      formats: ['iife'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      output: {
        // All dependencies (Vue, Swiper) are bundled into the single file
        // so Kirby only needs to load one script.
        // Ensure extracted CSS is named index.css so Kirby auto-loads it.
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith('.css') ? 'index.css' : assetInfo.name,
      },
    },
    sourcemap: false,
    minify: 'esbuild',
  },
});
