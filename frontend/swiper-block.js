/**
 * swiper-block.js
 *
 * Frontend initialisation for the Kirby Swiper Block plugin.
 * Compiled by Vite into assets/js/swiper-block.js.
 *
 * Load in your template:
 *   <script type="module" src="/assets/js/swiper-block.js"><\/script>
 *   <link rel="stylesheet" href="/assets/css/swiper-block.css">
 */

// ── Swiper 12 core + modules ──────────────────────────────────────────────────
import Swiper from 'swiper';
import {
  Navigation,
  Pagination,
  Autoplay,
  A11y,
  Keyboard,
} from 'swiper/modules';

// Swiper base CSS + module CSS (conditionally loaded based on active features)
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/keyboard';

// Our custom overrides — defined at end of this file as a CSS string injected
// into <head> so tree-shaking can still strip unused CSS in other contexts.
import './swiper-block.css';

// ── Aspect-ratio helper ───────────────────────────────────────────────────────
/**
 * Apply the correct height to a slider wrapper based on the CSS custom
 * properties set by the PHP snippet.
 *
 * PHP sets either:
 *   --swiper-block-ratio: 56.25%   (for named ratios)
 *   --swiper-block-height: 600px   (for custom px height)
 */
function applyHeight(el) {
  const style = getComputedStyle(el);
  const ratio  = style.getPropertyValue('--swiper-block-ratio').trim();
  const fixedH = style.getPropertyValue('--swiper-block-height').trim();

  if (fixedH) {
    el.style.height = fixedH;
  } else if (ratio) {
    // Padding-bottom trick: use a pseudo-element via a CSS var instead
    // (the custom property is already set; CSS handles it via the stylesheet)
  }
}

// ── Main init ─────────────────────────────────────────────────────────────────
async function initSwiperBlocks() {
  const blocks = document.querySelectorAll('.swiper-block');

  for (const el of blocks) {
    // Prevent double-init (e.g. after Turbo / htmx navigation)
    if (el._swiperInstance) continue;

    applyHeight(el);

    // Read config injected by the PHP snippet
    let userConfig = {};
    try {
      const raw = el.dataset.swiperConfig;
      if (raw) userConfig = JSON.parse(raw);
    } catch (e) {
      console.warn('[swiper-block] Could not parse data-swiper-config', e);
    }

    // ── Resolve Swiper modules ────────────────────────────────────────────
    const modules = [A11y, Keyboard];

    if (userConfig.navigation) {
      modules.push(Navigation);
      await import('swiper/css/navigation');
    }

    if (userConfig.pagination) {
      modules.push(Pagination);
      await import('swiper/css/pagination');
    }

    if (userConfig.autoplay) {
      modules.push(Autoplay);
    }

    const effect = userConfig.effect ?? 'slide';
    if (effect === 'fade') {
      const { EffectFade } = await import('../node_modules/swiper/modules/effect-fade.mjs');
      modules.push(EffectFade);
      await import('swiper/css/effect-fade');
    } else if (effect === 'creative') {
      const { EffectCreative } = await import('../node_modules/swiper/modules/effect-creative.mjs');
      modules.push(EffectCreative);
      await import('swiper/css/effect-creative');
    }

    // ── Build final config ────────────────────────────────────────────────
    const config = {
      // Merge user config first, then layer in structural options
      ...userConfig,

      modules,

      // Wrapper / slide selectors — use Swiper 12 defaults
      wrapperClass: 'swiper-wrapper',
      slideClass:   'swiper-slide',

      // Navigation
      navigation: userConfig.navigation
        ? { nextEl: `#${el.id} .swiper-button-next`, prevEl: `#${el.id} .swiper-button-prev` }
        : false,

      // Pagination
      pagination: userConfig.pagination
        ? { el: `#${el.id} .swiper-pagination`, clickable: true, dynamicBullets: true }
        : false,

      // Autoplay (already structured correctly from PHP)
      autoplay: userConfig.autoplay || false,

      // Accessibility
      a11y: {
        enabled: true,
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
      },

      // Keyboard
      keyboard: { enabled: true, onlyInViewport: true },

      // Observer: re-init if DOM changes (useful with Turbo/Livewire)
      observer: true,
      observeParents: true,

      // Lazy loading (Swiper 12 native)
      lazyPreloadPrevNext: 1,

      // Creative effect defaults (PHP passes these but we also keep a fallback)
      creativeEffect: userConfig.creativeEffect ?? {
        prev: { shadow: true, translate: [0, 0, -400] },
        next: { translate: ['100%', 0, 0] },
      },
    };

    const swiper = new Swiper(el, config);
    el._swiperInstance = swiper;

    // ── LQIP blur-up: reveal full image once loaded ───────────────────────
    el.querySelectorAll('.swiper-slide__img').forEach((img) => {
      if (img.complete) {
        img.closest('.swiper-slide__media')?.classList.add('is-loaded');
      } else {
        img.addEventListener('load', () => {
          img.closest('.swiper-slide__media')?.classList.add('is-loaded');
        }, { once: true });
      }
    });
  }
}

// ── Lifecycle hooks for common SPA routers ────────────────────────────────────

// Standard DOM-ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSwiperBlocks);
} else {
  initSwiperBlocks();
}

// Turbo (Kirby Starterkit uses Turbo)
document.addEventListener('turbo:render',    initSwiperBlocks);
document.addEventListener('turbo:frame-render', initSwiperBlocks);

// htmx
document.addEventListener('htmx:afterSettle', initSwiperBlocks);

// Export for manual calls
export { initSwiperBlocks };
