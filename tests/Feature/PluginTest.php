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

test('plugin version is set to 1.1.0 in registration', function () {
    // Plugin::version() reads from composer.json (not present in dev/test env).
    // The 'version' key in Kirby::plugin() lives in extends() — test that.
    $plugin = App::instance()->plugin('ianhobbs/kirby-swiper-block');
    expect($plugin->extends()['version'])->toBe('1.1.0');
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

test('file.create:after hook is registered', function () {
    $hooks = App::instance()->extensions('hooks');
    expect($hooks)->toHaveKey('file.create:after');
});

test('all five thumb presets are registered', function () {
    // Thumb presets are processed by Kirby internally; read from plugin extends() directly
    $plugin = App::instance()->plugin('ianhobbs/kirby-swiper-block');
    $thumbs = $plugin->extends()['thumbs'] ?? [];
    expect($thumbs)->toHaveKeys(['swiper-xl', 'swiper-lg', 'swiper-md', 'swiper-sm', 'swiper-lqip']);
});

test('thumb preset dimensions are correct', function () {
    $plugin = App::instance()->plugin('ianhobbs/kirby-swiper-block');
    $thumbs = $plugin->extends()['thumbs'];
    expect($thumbs['swiper-xl']['width'])->toBe(1920);
    expect($thumbs['swiper-lg']['width'])->toBe(1400);
    expect($thumbs['swiper-md']['width'])->toBe(900);
    expect($thumbs['swiper-sm']['width'])->toBe(640);
    expect($thumbs['swiper-lqip']['width'])->toBe(40);
});

test('lqip preset uses blur', function () {
    $plugin = App::instance()->plugin('ianhobbs/kirby-swiper-block');
    $thumbs = $plugin->extends()['thumbs'];
    expect($thumbs['swiper-lqip'])->toHaveKey('blur');
    expect($thumbs['swiper-lqip']['quality'])->toBeLessThan(50);
});

test('all presets use crop', function () {
    $plugin = App::instance()->plugin('ianhobbs/kirby-swiper-block');
    $thumbs = $plugin->extends()['thumbs'];
    foreach (['swiper-xl', 'swiper-lg', 'swiper-md', 'swiper-sm', 'swiper-lqip'] as $preset) {
        expect($thumbs[$preset]['crop'])->toBeTrue("Preset {$preset} should have crop: true");
    }
});
