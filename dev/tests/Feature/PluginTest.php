<?php

/**
 * Plugin registration tests
 *
 * Verifies that the plugin loads correctly and registers
 * all expected extensions with Kirby.
 */

use Kirby\Cms\App;

test('plugin registers with correct id', function () {
    $plugin = App::instance()->plugin('ianhobbs/kirby-swiper-block');
    expect($plugin)->not->toBeNull();
});

test('plugin version is set to 1.3.6 in registration', function () {
    // Plugin::version() reads from composer.json (not present in dev/test env).
    // The 'version' key in Kirby::plugin() lives in extends() — test that.
    $plugin = App::instance()->plugin('ianhobbs/kirby-swiper-block');
    expect($plugin->extends()['version'])->toBe('1.3.6');
});

test('blueprint blocks/swiper is registered', function () {
    $blueprints = App::instance()->extensions('blueprints');
    expect($blueprints)->toHaveKey('blocks/swiper');
});

test('snippet blocks/swiper is registered', function () {
    $snippets = App::instance()->extensions('snippets');
    expect($snippets)->toHaveKey('blocks/swiper');
});

test('swiper-block icon is registered', function () {
    // Icons are processed by Kirby internally; read from plugin extends() directly
    $plugin = App::instance()->plugin('ianhobbs/kirby-swiper-block');
    $icons  = $plugin->extends()['icons'] ?? [];
    expect($icons)->toHaveKey('swiper-block');
    expect($icons['swiper-block'])->toContain('<svg');
});

test('plugin does not register a thumbs extension', function () {
    // Kirby has no `thumbs` plugin-extension type — presets/srcsets must live in
    // the consuming site's config. Guard against re-introducing the dead key.
    $plugin = App::instance()->plugin('ianhobbs/kirby-swiper-block');
    expect($plugin->extends())->not->toHaveKey('thumbs');
});

test('plugin does not register a custom slide-image field type', function () {
    // The slide image uses the stock `files` field. A custom `swiper-slide-image`
    // type was tried (for a thumbnail column preview) but broke block editing with
    // "The fieldset undefined could not be found" — guard against re-introducing it.
    $plugin = App::instance()->plugin('ianhobbs/kirby-swiper-block');
    expect($plugin->extends())->not->toHaveKey('fields');
});
