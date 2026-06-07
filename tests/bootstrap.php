<?php

/**
 * Kirby Swiper Block — Test Bootstrap
 *
 * Boots a minimal Kirby instance with the plugin loaded directly,
 * using fixture roots so no real site is required.
 */

// 1. Load Kirby (installed to kirby/ by getkirby/composer-installer)
require_once __DIR__ . '/../kirby/bootstrap.php';

// 2. Register the plugin (calls Kirby::plugin() — safe before new Kirby())
require_once __DIR__ . '/../index.php';

// 3. Boot a minimal Kirby instance pointing at fixture roots
new Kirby([
    'roots' => [
        'index'      => __DIR__ . '/fixtures',
        'base'       => __DIR__ . '/fixtures',
        'content'    => __DIR__ . '/fixtures/content',
        'site'       => __DIR__ . '/fixtures/site',
        'blueprints' => __DIR__ . '/fixtures/site/blueprints',
        'templates'  => __DIR__ . '/fixtures/site/templates',
        'snippets'   => __DIR__ . '/fixtures/site/snippets',
        'plugins'    => __DIR__ . '/fixtures/site/plugins',
        'accounts'   => __DIR__ . '/fixtures/site/accounts',
        'sessions'   => __DIR__ . '/fixtures/site/sessions',
        'media'      => __DIR__ . '/fixtures/media',
        'logs'       => __DIR__ . '/fixtures/logs',
        'cache'      => __DIR__ . '/fixtures/cache',
    ],
    'options' => [
        'debug' => false,
    ],
]);
