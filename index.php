<?php

/**
 * Kirby Swiper Block Plugin
 *
 * A custom layout block that renders a full-featured Swiper 12 slider
 * with server-side image cropping via Kirby thumb presets.
 */

use Kirby\Cms\App as Kirby;

Kirby::plugin('ianhobbsmedia/swiper-block', [

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

    // ── Block models ────────────────────────────────────────────────────────
    'blockModels' => [
        'swiper' => Kirby\Cms\Block::class,
    ],

    // ── Snippets ─────────────────────────────────────────────────────────────
    // Kirby auto-discovers blueprints/blocks/ and snippets/blocks/
    // so no explicit registration is needed; listed here for clarity.

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
