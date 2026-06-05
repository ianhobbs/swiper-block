import { defineConfig } from 'vite';
import { resolve } from 'path';

/**
 * Vite config for the FRONTEND bundle (not the panel).
 *
 * Outputs:
 *   assets/js/swiper-block.js   — ESM, loaded in your template
 *   assets/css/swiper-block.css — extracted styles (Swiper CSS + custom)
 *
 * Usage in your Kirby site/snippets/footer.php (or via $kirby->assets()):
 *   <link  rel="stylesheet" href="<?= $kirby->url('assets') ?>/css/swiper-block.css">
 *   <script type="module"   src="<?= $kirby->url('assets') ?>/js/swiper-block.js"></script>
 */
export default defineConfig({
  build: {
    outDir: 'assets',
    emptyOutDir: false,
    lib: {
      entry:   resolve(import.meta.dirname, 'frontend/swiper-block.js'),
      name:    'SwiperBlock',
      formats: ['es'],
      fileName: () => 'js/swiper-block.js',
    },
    rollupOptions: {
      // Swiper is bundled — no external deps expected on the frontend
      output: {
        assetFileNames: (asset) =>
          asset.name?.endsWith('.css') ? 'css/swiper-block.css' : asset.name,
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
});
