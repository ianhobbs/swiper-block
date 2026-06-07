<?php

/**
 * Snippet rendering tests
 *
 * Verifies the HTML output of snippets/blocks/swiper.php
 * across a range of block configurations.
 */

// ── Empty block ───────────────────────────────────────────────────────────────

test('renders nothing when slides is empty', function () {
    $html = renderBlock(makeBlock(['slides' => []]));
    expect($html)->toBeEmpty();
});

// ── Wrapper structure ─────────────────────────────────────────────────────────

test('renders swiper-block wrapper div', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'Test Slide', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '30', 'content_position' => 'center'],
    ]]));
    expect($html)->toContain('class="swiper-block"');
});

test('wrapper has unique id attribute', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
    ]]));
    expect($html)->toMatch('/id="sb-[a-f0-9]{8}"/');
});

test('wrapper has aria carousel role', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
    ]]));
    expect($html)->toContain('aria-roledescription="carousel"');
});

// ── data-swiper-config ────────────────────────────────────────────────────────

test('data-swiper-config attribute contains valid json', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
    ]]));

    preg_match('/data-swiper-config="([^"]+)"/', $html, $m);
    expect($m)->not->toBeEmpty('data-swiper-config attribute missing');

    $config = json_decode(html_entity_decode($m[1]), true);
    expect(json_last_error())->toBe(JSON_ERROR_NONE);
    expect($config)->toBeArray();
});

test('data-swiper-config reflects effect setting', function () {
    $html = renderBlock(makeBlock([
        'effect' => 'fade',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
        ],
    ]));

    preg_match('/data-swiper-config="([^"]+)"/', $html, $m);
    $config = json_decode(html_entity_decode($m[1]), true);
    expect($config['effect'])->toBe('fade');
});

test('data-swiper-config includes loop setting', function () {
    $html = renderBlock(makeBlock([
        'loop'   => 'true',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
        ],
    ]));

    preg_match('/data-swiper-config="([^"]+)"/', $html, $m);
    $config = json_decode(html_entity_decode($m[1]), true);
    expect($config['loop'])->toBeTrue();
});

// ── Aspect ratio ──────────────────────────────────────────────────────────────

test('16:9 aspect ratio sets css ratio variable', function () {
    $html = renderBlock(makeBlock([
        'aspect_ratio' => '16:9',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
        ],
    ]));
    expect($html)->toContain('--swiper-block-ratio:');
});

test('custom aspect ratio sets css height variable', function () {
    $html = renderBlock(makeBlock([
        'aspect_ratio'  => 'custom',
        'custom_height' => '500',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
        ],
    ]));
    expect($html)->toContain('--swiper-block-height:500px');
});

// ── Navigation & pagination ───────────────────────────────────────────────────

test('navigation buttons render when show_navigation is true', function () {
    $html = renderBlock(makeBlock([
        'show_navigation' => 'true',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
        ],
    ]));
    expect($html)->toContain('swiper-button-prev')
                 ->toContain('swiper-button-next');
});

test('navigation buttons are hidden when show_navigation is false', function () {
    $html = renderBlock(makeBlock([
        'show_navigation' => 'false',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
        ],
    ]));
    expect($html)->not->toContain('swiper-button-prev');
});

test('pagination div renders when show_pagination is true', function () {
    $html = renderBlock(makeBlock([
        'show_pagination' => 'true',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
        ],
    ]));
    expect($html)->toContain('swiper-pagination');
});

test('pagination is absent when show_pagination is false', function () {
    $html = renderBlock(makeBlock([
        'show_pagination' => 'false',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
        ],
    ]));
    expect($html)->not->toContain('swiper-pagination');
});

// ── Slide content ─────────────────────────────────────────────────────────────

test('heading renders in slide', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'My Heading', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
    ]]));
    expect($html)->toContain('My Heading');
});

test('subtext renders in slide', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => '', 'image' => [], 'subtext' => 'Caption text', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
    ]]));
    expect($html)->toContain('Caption text');
});

test('cta link renders when provided', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => '', 'image' => [], 'subtext' => '', 'link' => 'https://example.com', 'link_text' => 'Click here', 'overlay_opacity' => '0', 'content_position' => 'center'],
    ]]));
    expect($html)->toContain('https://example.com')
                 ->toContain('Click here');
});

test('cta link is absent when link field is empty', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'Title', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
    ]]));
    expect($html)->not->toContain('swiper-slide__cta');
});

test('multiple slides render multiple swiper-slide divs', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'Slide 1', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
        ['heading' => 'Slide 2', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
        ['heading' => 'Slide 3', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
    ]]));
    expect(substr_count($html, 'class="swiper-slide"'))->toBe(3);
});

// ── Accessibility ─────────────────────────────────────────────────────────────

test('slide has aria role group and roledescription', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'A11y Slide', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
    ]]));
    expect($html)->toContain('role="group"')
                 ->toContain('aria-roledescription="slide"');
});

test('slide label contains correct index', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'First',  'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
        ['heading' => 'Second', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
    ]]));
    expect($html)->toContain('Slide 1 of 2')
                 ->toContain('Slide 2 of 2');
});

// ── Effect-specific CSS class ─────────────────────────────────────────────────

test('non-slide effect adds modifier class to wrapper', function () {
    $html = renderBlock(makeBlock([
        'effect' => 'fade',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
        ],
    ]));
    expect($html)->toContain('swiper-block--fade');
});

test('default slide effect does not add modifier class', function () {
    $html = renderBlock(makeBlock([
        'effect' => 'slide',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'overlay_opacity' => '0', 'content_position' => 'center'],
        ],
    ]));
    expect($html)->not->toContain('swiper-block--slide');
});
