<?php

/**
 * SwiperBlock model tests
 *
 * Verifies the computed values the snippet relies on — JS config, responsive
 * `sizes`, aspect CSS and thumb presets — in isolation, without rendering HTML.
 */

use IanHobbs\Swiper\SwiperBlock;

test('swiper blocks resolve to the SwiperBlock model', function () {
    expect(makeBlock())->toBeInstanceOf(SwiperBlock::class);
});

// ── jsConfig ────────────────────────────────────────────────────────────────

test('jsConfig returns valid JSON of Swiper options', function () {
    $data = json_decode(makeBlock([
        'effect'          => 'fade',
        'slides_per_view' => '3',
        'speed'           => '800',
        'loop'            => 'true',
    ])->jsConfig(), true);

    expect($data)->toBeArray();
    expect($data['effect'])->toBe('fade');
    expect($data['slidesPerView'])->toBe(3);          // cast to int
    expect($data['speed'])->toBe(800);
    expect($data['loop'])->toBeTrue();                 // toggle → bool
});

test('jsConfig keeps slidesPerView "auto" as a string', function () {
    $data = json_decode(makeBlock(['slides_per_view' => 'auto'])->jsConfig(), true);
    expect($data['slidesPerView'])->toBe('auto');
});

test('jsConfig includes creativeEffect only for the creative effect', function () {
    $plain = json_decode(makeBlock(['effect' => 'slide'])->jsConfig(), true);
    $creative = json_decode(makeBlock(['effect' => 'creative'])->jsConfig(), true);

    expect($plain)->not->toHaveKey('creativeEffect');
    expect($creative)->toHaveKey('creativeEffect');
});

// ── imgSizes (responsive sizes hint) ──────────────────────────────────────────

test('imgSizes reflects slidesPerView and the gap', function () {
    expect(makeBlock(['slides_per_view' => '1'])->imgSizes())->toBe('100vw');
    expect(makeBlock(['slides_per_view' => '3'])->imgSizes())->toBe('calc(100vw / 3)');
    expect(makeBlock(['slides_per_view' => '3', 'space_between' => '16'])->imgSizes())
        ->toBe('calc((100vw - 32px) / 3)');
    expect(makeBlock(['slides_per_view' => 'auto'])->imgSizes())->toBe('calc(100vw / 3)');
});

// ── native ratio ──────────────────────────────────────────────────────────────

test('blocks are native-ratio now that the aspect ratio field is gone', function () {
    expect(makeBlock()->isNative())->toBeTrue();
});

// ── aspectStyle ───────────────────────────────────────────────────────────────

test('aspectStyle is empty in native mode with no explicit height', function () {
    // Native mode sets no container ratio — each figure carries its own
    // aspect-ratio inline, from the image's real dimensions (see the snippet).
    expect(makeBlock()->aspectStyle())->toBe('');
});

// ── sliderHeight (explicit container height) ──────────────────────────────────

test('sliderHeight returns a CSS length, or null when auto (0)', function () {
    expect(makeBlock(['slider_height' => '0'])->sliderHeight())->toBeNull();
    expect(makeBlock(['slider_height' => '600'])->sliderHeight())->toBe('600px');
    expect(makeBlock(['slider_height' => '80', 'slider_height_unit' => 'vh'])->sliderHeight())->toBe('80vh');
    // Unknown unit falls back to px
    expect(makeBlock(['slider_height' => '50', 'slider_height_unit' => 'bogus'])->sliderHeight())->toBe('50px');
});

test('aspectStyle carries only the explicit container height', function () {
    // Auto (0) emits nothing at all
    expect(makeBlock(['slider_height' => '0'])->aspectStyle())->toBe('');

    expect(makeBlock(['slider_height' => '720'])->aspectStyle())
        ->toBe('--swiper-block-fixed-height:720px');

    // Chosen unit is carried through
    expect(makeBlock(['slider_height' => '80', 'slider_height_unit' => 'vh'])->aspectStyle())
        ->toBe('--swiper-block-fixed-height:80vh');
});

// ── thumb presets ─────────────────────────────────────────────────────────────

test('native mode builds thumbs inline so no site config is required', function () {
    $block = makeBlock();

    // Width-only srcset — no crop, so the source ratio survives.
    $srcset = $block->srcsetName();
    expect($srcset)->toBeArray()->toHaveKeys(['640w', '900w', '1400w', '1920w']);
    expect($srcset['1920w'])->not->toHaveKey('height');
    expect($srcset['1920w']['format'])->toBe('webp');

    // LQIP is width-only too, for the same reason.
    expect($block->lqipPreset())->toBeArray()->toHaveKey('blur');
    expect($block->lqipPreset())->not->toHaveKey('height');

    // <img src> fallback is an uncropped 1920 — no named srcset lookup.
    expect($block->baseThumbOptions())->toBe([
        'width' => 1920, 'format' => 'webp', 'quality' => 85,
    ]);
});

// ── uid ───────────────────────────────────────────────────────────────────────

test('uid is a stable sb-prefixed id', function () {
    expect(makeBlock()->uid())->toMatch('/^sb-[a-f0-9]{8}$/');
});
