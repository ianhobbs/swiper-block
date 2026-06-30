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

// ── aspectStyle ───────────────────────────────────────────────────────────────

test('aspectStyle outputs a ratio percentage or a fixed height', function () {
    expect(makeBlock(['aspect_ratio' => '16:9'])->aspectStyle())->toBe('--swiper-block-ratio:56.25%');
    expect(makeBlock(['aspect_ratio' => 'custom', 'custom_height' => '500'])->aspectStyle())
        ->toBe('--swiper-block-height:500px');
});

// ── orientation → thumb presets ───────────────────────────────────────────────

test('thumb presets follow the orientation', function () {
    $h = makeBlock(['orientation' => 'horizontal']);
    expect($h->srcsetName())->toBe('swiper-horiz');
    expect($h->lqipPreset())->toBe('swiper-lqip-horiz');

    $v = makeBlock(['orientation' => 'vertical']);
    expect($v->srcsetName())->toBe('swiper-vert');
    expect($v->lqipPreset())->toBe('swiper-lqip-vert');
});

// ── uid ───────────────────────────────────────────────────────────────────────

test('uid is a stable sb-prefixed id', function () {
    expect(makeBlock()->uid())->toMatch('/^sb-[a-f0-9]{8}$/');
});
