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

test('plugin version is set to 1.2.0 in registration', function () {
    // Plugin::version() reads from composer.json (not present in dev/test env).
    // The 'version' key in Kirby::plugin() lives in extends() — test that.
    $plugin = App::instance()->plugin('ianhobbs/kirby-swiper-block');
    expect($plugin->extends()['version'])->toBe('1.2.0');
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

test('swiper-slide-image field type is registered', function () {
    $plugin = App::instance()->plugin('ianhobbs/kirby-swiper-block');
    $fields = $plugin->extends()['fields'] ?? [];
    expect($fields)->toHaveKey('swiper-slide-image');
    expect($fields['swiper-slide-image']['extends'])->toBe('files');
});
