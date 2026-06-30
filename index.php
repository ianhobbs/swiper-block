<?php

@include_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/classes/SwiperBlock.php';

/**
 * Kirby Swiper Block Plugin
 *
 * A custom layout block that renders a full-featured Swiper 12 slider
 * with server-side image cropping via Kirby thumb presets.
 */

use Kirby\Cms\App as Kirby;
use IanHobbs\Swiper\SwiperBlock;

Kirby::plugin('ianhobbs/kirby-swiper-block', [

    'version' => '1.2.0',

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
        'blocks/swiper' => __DIR__ . '/blueprints/blocks/swiper.yml',
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
