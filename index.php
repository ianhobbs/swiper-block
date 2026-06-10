<?php

@include_once __DIR__ . '/vendor/autoload.php';

/**
 * Kirby Swiper Block Plugin
 *
 * A custom layout block that renders a full-featured Swiper 12 slider
 * with server-side image cropping via Kirby thumb presets.
 */

use Kirby\Cms\App as Kirby;

Kirby::plugin('ianhobbs/kirby-swiper-block', [

    'version' => '1.1.0',

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

    // ── Custom field type ────────────────────────────────────────────────────
    // Extends the built-in files field so Kirby will look for the
    // k-swiper-slide-image-field-preview Vue component when rendering the
    // structure table column — giving us a proper image thumbnail preview
    // instead of the default filename text.
    'fields' => [
        'swiper-slide-image' => [
            'extends' => 'files',
        ],
    ],

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
    'blockModels' => [
        'swiper' => \Kirby\Cms\Block::class,
    ],
]);
