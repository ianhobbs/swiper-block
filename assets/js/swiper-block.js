/**
 * swiper-block.js — Kirby Swiper Block frontend init
 *
 * Reads per-block configuration from data-swiper-config and initialises
 * Swiper using the CDN global (window.Swiper) loaded by the snippet.
 *
 * No build step required. Served directly as a Kirby plugin asset:
 *   kirby()->plugin('ianhobbs/kirby-swiper-block')->asset('js/swiper-block.js')
 *
 * The swiper-bundle CDN script pre-registers all modules, so no explicit
 * modules array is needed in the config object.
 */
(function () {
  'use strict';

  /**
   * Initialise all .swiper-block elements not yet initialised.
   * Safe to call multiple times (Turbo, htmx, manual re-init).
   */
  function initSwiperBlocks() {
    if (typeof window.Swiper === 'undefined') {
      console.warn('[swiper-block] window.Swiper not found. Ensure the CDN <script> loads before this file.');
      return;
    }

    document.querySelectorAll('.swiper-block').forEach(function (el) {

      // ── Skip already-initialised instances ─────────────────────────────────
      if (el._swiperInstance) return;

      // ── Parse PHP-injected config ───────────────────────────────────────────
      var raw = {};
      try {
        if (el.dataset.swiperConfig) {
          raw = JSON.parse(el.dataset.swiperConfig);
        }
      } catch (e) {
        console.warn('[swiper-block] Could not parse data-swiper-config on', el, e);
      }

      // ── Build Swiper config ─────────────────────────────────────────────────
      var config = {

        // ── Layout ────────────────────────────────────────────────────────────
        // Captions sit below the figure, so slide heights vary — let Swiper grow
        // the container to fit the active slide.
        //
        // Off when the block has an explicit Fixed Height. autoHeight measures
        // the active slide and writes an inline height onto .swiper-wrapper, but
        // in fixed-height mode the stylesheet gives .swiper-slide height:100% of
        // that same wrapper — so the measurement depends on the value it is
        // producing. With `observer` on (below), each write is a style mutation
        // that triggers another update, and the height oscillates every tick:
        // the mobile flicker. Fixed height already sizes the container, so
        // autoHeight has nothing to contribute there.
        autoHeight:     !raw.fixedHeight,
        direction:      raw.direction     || 'horizontal',
        slidesPerView:  raw.slidesPerView || 1,       // int or 'auto'
        slidesPerGroup: raw.slidesPerGroup || 1,
        spaceBetween:   raw.spaceBetween  || 0,
        centeredSlides: !!raw.centeredSlides,
        initialSlide:   raw.initialSlide  || 0,

        // ── Animation ─────────────────────────────────────────────────────────
        effect: raw.effect || 'slide',
        speed:  raw.speed  || 600,
        loop:   !!raw.loop,

        // Autoplay — expand boolean + sub-options into Swiper object
        autoplay: raw.autoplay
          ? {
              delay:                raw.autoplayDelay || 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter:    !!raw.autoplayPauseOnHover,
            }
          : false,

        // Free mode — expand into Swiper object
        freeMode: raw.freeMode
          ? { enabled: true, momentum: raw.freeModeMomentum !== false }
          : false,

        // ── Controls ──────────────────────────────────────────────────────────

        // Navigation — pass the elements directly (scoped to this block,
        // so multiple blocks on a page never collide)
        navigation: raw.showNavigation
          ? {
              nextEl: el.querySelector('.swiper-button-next'),
              prevEl: el.querySelector('.swiper-button-prev'),
            }
          : false,

        // Pagination
        pagination: raw.showPagination
          ? {
              el:             el.querySelector('.swiper-pagination'),
              type:           raw.paginationType || 'bullets',
              clickable:      true,
              dynamicBullets: raw.dynamicBullets !== false
                              && (raw.paginationType || 'bullets') === 'bullets',
            }
          : false,

        // Keyboard
        keyboard: raw.keyboardControl !== false
          ? { enabled: true, onlyInViewport: true }
          : false,

        // Mousewheel
        mousewheel: raw.mousewheel
          ? { releaseOnEdges: true }
          : false,

        // ── Touch & Input ─────────────────────────────────────────────────────
        grabCursor:    !!raw.grabCursor,
        simulateTouch: raw.simulateTouch !== false,
        threshold:     raw.threshold     || 5,
        longSwipes:    raw.longSwipes    !== false,
        resistance:    raw.resistance    !== false,

        // ── Accessibility ─────────────────────────────────────────────────────
        a11y: {
          enabled:          true,
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
        },

        // ── Effect configs ────────────────────────────────────────────────────

        // Creative (zoom) — PHP only includes this key when effect === 'creative'
        creativeEffect: raw.creativeEffect || {
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ['100%', 0, 0] },
        },

        // Coverflow defaults — editors choose this effect via the Panel
        coverflowEffect: {
          rotate:       50,
          stretch:      0,
          depth:        100,
          modifier:     1,
          slideShadows: true,
        },

        // ── Stability ─────────────────────────────────────────────────────────
        // observer re-inits the instance when the block's own styles or child
        // elements change — what makes the block survive being revealed from a
        // tab or accordion. observeParents extended that to every ancestor,
        // which on mobile meant an update on each address-bar resize (a vh/svh
        // Fixed Height changes with it) for no benefit the block relies on.
        observer:       true,
        observeParents: false,
      };

      // ── Initialise ───────────────────────────────────────────────────────────
      var swiper = new window.Swiper(el, config);
      el._swiperInstance = swiper;

      // ── LQIP blur-up ─────────────────────────────────────────────────────────
      // Reveal the full-res image once loaded, fading out the blurred placeholder.
      el.querySelectorAll('.swiper-slide__img').forEach(function (img) {
        var media = img.closest('.swiper-slide-media');
        if (!media) return;
        if (img.complete) {
          media.classList.add('is-loaded');
        } else {
          img.addEventListener('load', function () {
            media.classList.add('is-loaded');
          }, { once: true });
        }
      });

    }); // end forEach
  }

  // ── Lifecycle hooks ─────────────────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwiperBlocks);
  } else {
    initSwiperBlocks();
  }

  // Turbo (used by the Kirby Starterkit)
  document.addEventListener('turbo:render',       initSwiperBlocks);
  document.addEventListener('turbo:frame-render', initSwiperBlocks);

  // htmx
  document.addEventListener('htmx:afterSettle',  initSwiperBlocks);

  // Expose for manual re-init if needed
  window.initSwiperBlocks = initSwiperBlocks;

}());
