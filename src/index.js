/**
 * Kirby Panel — Swiper Block component registration
 *
 * Compiled by kirbyup into index.js / index.css in the plugin root,
 * which Kirby auto-loads when the plugin is active.
 */
import SwiperBlock from './SwiperBlock.vue';

window.panel.plugin('ianhobbs/kirby-swiper-block', {

  blocks: {
    swiper: SwiperBlock,
  },
});
