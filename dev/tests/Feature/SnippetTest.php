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

test('renders container with both swiper and swiper-block classes', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'Test Slide', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
    ]]));
    // `swiper` (Swiper's convention, base CSS) + `swiper-block` (our override hook)
    expect($html)->toContain('class="swiper swiper-block"');
});

test('wrapper has unique id attribute', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
    ]]));
    expect($html)->toMatch('/id="sb-[a-f0-9]{8}"/');
});

test('wrapper has aria carousel role', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
    ]]));
    expect($html)->toContain('aria-roledescription="carousel"');
});

// ── data-swiper-config ────────────────────────────────────────────────────────

test('data-swiper-config attribute contains valid json', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
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
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
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
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
        ],
    ]));

    preg_match('/data-swiper-config="([^"]+)"/', $html, $m);
    $config = json_decode(html_entity_decode($m[1]), true);
    expect($config['loop'])->toBeTrue();
});

// ── Fixed height ─────────────────────────────────────────────────────────────

test('auto height emits no sizing custom properties', function () {
    $html = renderBlock(makeBlock([
        'slider_height' => '0',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
        ],
    ]));
    expect($html)->toContain('style=""')
                 ->not->toContain('--swiper-block-');
});

test('explicit fixed height sets the fixed-height custom property', function () {
    $html = renderBlock(makeBlock([
        'slider_height'      => '80',
        'slider_height_unit' => 'vh',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
        ],
    ]));
    expect($html)->toContain('--swiper-block-fixed-height:80vh');
});

// ── Navigation & pagination ───────────────────────────────────────────────────

test('navigation buttons render when show_navigation is true', function () {
    $html = renderBlock(makeBlock([
        'show_navigation' => 'true',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
        ],
    ]));
    expect($html)->toContain('swiper-button-prev')
                 ->toContain('swiper-button-next');
});

test('navigation buttons are hidden when show_navigation is false', function () {
    $html = renderBlock(makeBlock([
        'show_navigation' => 'false',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
        ],
    ]));
    expect($html)->not->toContain('swiper-button-prev');
});

test('pagination div renders when show_pagination is true', function () {
    $html = renderBlock(makeBlock([
        'show_pagination' => 'true',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
        ],
    ]));
    expect($html)->toContain('swiper-pagination');
});

test('pagination is absent when show_pagination is false', function () {
    $html = renderBlock(makeBlock([
        'show_pagination' => 'false',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
        ],
    ]));
    expect($html)->not->toContain('swiper-pagination');
});

// ── Slide content ─────────────────────────────────────────────────────────────

test('heading renders in slide', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'My Heading', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
    ]]));
    expect($html)->toContain('My Heading');
});

test('subtext renders in slide', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => '', 'image' => [], 'subtext' => 'Caption text', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
    ]]));
    expect($html)->toContain('Caption text');
});

test('cta link renders when provided', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => '', 'image' => [], 'subtext' => '', 'link' => 'https://example.com', 'link_text' => 'Click here', 'content_position' => 'center'],
    ]]));
    expect($html)->toContain('https://example.com')
                 ->toContain('Click here');
});

test('cta link is absent when link field is empty', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'Title', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
    ]]));
    expect($html)->not->toContain('swiper-slide__cta');
});

test('multiple slides render multiple swiper-slide divs', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'Slide 1', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
        ['heading' => 'Slide 2', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
        ['heading' => 'Slide 3', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
    ]]));
    expect(substr_count($html, 'class="swiper-slide"'))->toBe(3);
});

// ── Caption typography, colour & placement ────────────────────────────────────

test('caption carries both placement classes', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '',
         'content_position' => 'right', 'content_position_y' => 'bottom'],
    ]]));
    expect($html)->toContain('swiper-slide-caption--right')
                 ->toContain('swiper-slide-caption--bottom');
});

test('caption falls back to middle when no vertical position is stored', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
    ]]));
    expect($html)->toContain('swiper-slide-caption--middle');
});

test('heading and subtext carry the block-level Tailwind size classes', function () {
    $html = renderBlock(makeBlock([
        'heading_size' => 'text-6xl',
        'subtext_size' => 'text-xl',
        'slides' => [
            ['heading' => 'Big', 'image' => [], 'subtext' => 'Small', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
        ],
    ]));
    expect($html)->toContain('class="swiper-slide-heading text-6xl"')
                 ->toContain('class="swiper-slide-subtext text-xl"');
});

test('caption colour renders as an inline color when set', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '',
         'content_position' => 'center', 'caption_color' => '#ffcc00'],
    ]]));
    expect($html)->toContain('style="color:#ffcc00"');
});

test('no caption colour means no inline style, so the page colour is inherited', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
    ]]));
    expect($html)->not->toContain('style="color:');
});

test('an unsafe stored caption colour is dropped rather than emitted', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '',
         'content_position' => 'center', 'caption_color' => 'red;background:url(evil)'],
    ]]));
    expect($html)->not->toContain('background:url')
                 ->not->toContain('style="color:');
});

// ── Accessibility ─────────────────────────────────────────────────────────────

test('slide has aria role group and roledescription', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'A11y Slide', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
    ]]));
    expect($html)->toContain('role="group"')
                 ->toContain('aria-roledescription="slide"');
});

test('slide label contains correct index', function () {
    $html = renderBlock(makeBlock(['slides' => [
        ['heading' => 'First',  'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
        ['heading' => 'Second', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
    ]]));
    expect($html)->toContain('Slide 1 of 2')
                 ->toContain('Slide 2 of 2');
});

// ── Effect-specific CSS class ─────────────────────────────────────────────────

test('non-slide effect adds modifier class to wrapper', function () {
    $html = renderBlock(makeBlock([
        'effect' => 'fade',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
        ],
    ]));
    expect($html)->toContain('swiper-block--fade');
});

test('default slide effect does not add modifier class', function () {
    $html = renderBlock(makeBlock([
        'effect' => 'slide',
        'slides' => [
            ['heading' => 'Test', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
        ],
    ]));
    expect($html)->not->toContain('swiper-block--slide');
});
