<?php

@include_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/classes/SwiperBlock.php';

/**
 * Kirby Swiper Block Plugin
 *
 * A custom layout block that renders a full-featured Swiper 14 carousel
 * with server-side image cropping via Kirby thumb presets.
 */

use Kirby\Cms\App as Kirby;
use IanHobbs\Swiper\SwiperBlock;

Kirby::plugin('ianhobbs/kirby-swiper-block', [

    'version' => '1.5.1',

    // Set injectAssets to false to skip the automatic asset injection entirely
    // (e.g. when Swiper is already bundled/loaded globally by the site).
    //
    // The block ships one stylesheet and one script in assets/dist, each
    // bundling Swiper (v14.1.0, MIT) with the block's own code. Both are served
    // from the site's own origin, so a strict CSP needs no extra hosts.
    'options' => [
        'injectAssets' => true,
    ],

    'icons' => [
        'swiper-block' => file_get_contents(__DIR__ . '/assets/icons/swiper-block.svg'),
    ],

    // ── Thumb presets ───────────────────────────────────────────────────────
    // NOTE: Kirby has no `thumbs` plugin-extension type, so a plugin cannot
    // register global thumb presets / srcsets. The snippet relies on named
    // srcsets (`swiper-horiz`, `swiper-vert`) and LQIP presets
    // (`swiper-lqip-horiz`, `swiper-lqip-vert`) that the consuming site must
    // define in its own site/config/config.php. See the README for the exact
    // block to copy.

    // ── Blueprints ───────────────────────────────────────────────────────────
    // Explicit registration required — auto-discovery fails when the plugin
    // is symlinked from outside site/plugins/ (rootRelativePath becomes null).
    'blueprints' => [
        'blocks/swiper'       => __DIR__ . '/blueprints/blocks/swiper.yml',
        'files/swiper-image'  => __DIR__ . '/blueprints/files/swiper-image.yml',
    ],

    // ── Snippets ─────────────────────────────────────────────────────────────
    // Same reason — must be explicit when symlinked outside site/plugins/.
    'snippets' => [
        'blocks/swiper' => __DIR__ . '/snippets/blocks/swiper.php',
    ],

    // ── Block models ────────────────────────────────────────────────────────
    // Custom model centralises the block's computed values (JS config, aspect
    // CSS, thumb presets, responsive `sizes`) so the snippet stays markup-only.
    'blockModels' => [
        'swiper' => SwiperBlock::class,
    ],
]);
