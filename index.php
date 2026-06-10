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
    // Referenced in the snippet as ->thumb('swiper-*')
    'thumbs' => [
        // Full-width hero crop  (16:9)
        'swiper-xl'   => ['width' => 1920, 'height' =>  810, 'crop' => true, 'quality' => 85],
        // Standard desktop     (16:9)
        'swiper-lg'   => ['width' => 1400, 'height' =>  590, 'crop' => true, 'quality' => 85],
        // Tablet               (4:3)
        'swiper-md'   => ['width' =>  900, 'height' =>  506, 'crop' => true, 'quality' => 82],
        // Mobile               (1:1)
        'swiper-sm'   => ['width' =>  640, 'height' =>  480, 'crop' => true, 'quality' => 80],
        // Low-quality placeholder for lazy-load blur-up
        'swiper-lqip' => ['width' =>   40, 'height' =>   17, 'crop' => true, 'quality' => 30, 'blur' => 4],
    ],

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

    // ── Hooks ────────────────────────────────────────────────────────────────
    // Pre-generate thumbs when a slide image is uploaded so the first
    // page-load never stalls on thumb generation.
    'hooks' => [
        'file.create:after' => function ($file) {
            if ($file->type() !== 'image') {
                return;
            }
            foreach (['swiper-xl', 'swiper-lg', 'swiper-md', 'swiper-sm', 'swiper-lqip'] as $preset) {
                try {
                    $file->thumb($preset);
                } catch (\Throwable $e) {
                    // Non-fatal — thumb will be generated on demand instead
                }
            }
        },
    ],
]);
