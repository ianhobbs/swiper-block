/**
 * Kirby Panel — Swiper Block component registration
 *
 * Compiled by @kirbyup/cli into panel/index.js, which Kirby auto-loads
 * when the plugin is active.
 */
import SwiperBlock from './SwiperBlock.vue';

window.panel.plugin('ianhobbsmedia/swiper-block', {
  blocks: {
    swiper: SwiperBlock,
  },
});
