<?php

/**
 * Layout-field integration tests
 *
 * The block is never used on its own: it is inserted into a host site's layout
 * field, inside a column of some fraction width, under a theme that adds its own
 * padding or background. fixtures/site/blueprints/fields/layout.yml is a copy of
 * such a field — these tests render the block through it rather than in isolation,
 * so column widths, multiple sliders per row and theme wrappers are all covered.
 */

use IanHobbs\Swiper\SwiperBlock;
use Kirby\Cms\Fieldsets;
use Kirby\Data\Yaml;

beforeEach(function () {
    // Each test is its own "page load": asset injection is claimed once per
    // request, and the layout scan is cached per field for the same reason.
    SwiperBlock::forgetAssets();
    SwiperBlock::forgetLayoutScans();
});

// ── The host field blueprint ─────────────────────────────────────────────────

test('the layout field offers the swiper block as a fieldset', function () {
    $blueprint = Yaml::read(__DIR__ . '/../fixtures/site/blueprints/fields/layout.yml');

    expect($blueprint['type'])->toBe('layout');
    // Without this the block can't be inserted at all.
    expect($blueprint['fieldsets'])->toContain('swiper');
});

test('the fixture page resolves the layout field, so Kirby loads the blueprint', function () {
    $field = page('home')->blueprint()->field('layout');

    expect($field['type'])->toBe('layout');
    expect($field['fieldsets'])->toContain('swiper');
    expect($field['layouts'])->toContain('1/3, 1/3, 1/3');
});

test('the block blueprint resolves through the host field, tabs and all', function () {
    // Resolving the host field's fieldsets is what the Panel does when it opens
    // the layout field: it loads blocks/swiper.yml from the plugin. A broken or
    // unregistered blueprint fails here — one step closer to the Panel than
    // BlueprintTest, which reads the YAML file directly.
    $fieldsets = Fieldsets::factory(page('home')->blueprint()->field('layout')['fieldsets']);
    $swiper    = $fieldsets->get('swiper');

    expect($swiper)->not->toBeNull();
    expect($swiper->name())->toBe('Swiper Slider');
    expect(array_keys($swiper->tabs()))->toBe(['slides', 'layout', 'animation', 'controls', 'touch']);
});

// ── Rendering inside a column ────────────────────────────────────────────────

test('a swiper block renders in full when nested in a layout column', function () {
    $html = renderLayout(makeLayout([
        ['width' => '1/1', 'blocks' => [
            ['slides' => [
                ['heading' => 'In a column', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
            ]],
        ]],
    ]));

    expect($html)->toContain('class="swiper swiper-block"')
                 ->toContain('data-swiper-config')
                 ->toContain('In a column');
});

test('the slider renders identically in a narrow column — width comes from CSS, not markup', function () {
    $slides = [
        ['heading' => 'Narrow', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
    ];

    $full   = renderLayout(makeLayout([['width' => '1/1',  'blocks' => [['slides' => $slides]]]]));
    $narrow = renderLayout(makeLayout([['width' => '3/12', 'blocks' => [['slides' => $slides]]]]));

    // Identical slider markup either way — only the surrounding column differs.
    // The block emits no width of its own (.swiper-block is width:100%), so the
    // column decides; a markup-level width would break the other layouts.
    $slider = function (string $html): string {
        preg_match('/<div\s+class="swiper swiper-block.*?<\/div><!-- \/\.swiper-block -->/s', $html, $m);
        return $m[0] ?? '';
    };

    expect($slider($narrow))->not->toBeEmpty()
                            ->not->toContain('width')
                            ->toBe($slider($full));
});

// ── One slider per layout row ────────────────────────────────────────────────

test('a second slider in the same row is skipped, whichever column it is in', function () {
    $html = renderLayout(makeLayout([
        ['width' => '1/2', 'blocks' => [['slides' => [
            ['heading' => 'Left', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
        ]]]],
        ['width' => '1/2', 'blocks' => [['slides' => [
            ['heading' => 'Right', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
        ]]]],
    ]));

    expect(substr_count($html, 'class="swiper swiper-block"'))->toBe(1);
    expect($html)->toContain('Left')
                 ->not->toContain('Right')
                 ->toContain('a layout row can hold only one slider');
});

test('two sliders stacked in one column: only the first renders', function () {
    $slide = fn (string $heading) => ['slides' => [
        ['heading' => $heading, 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
    ]];

    $html = renderLayout(makeLayout([
        ['width' => '1/1', 'blocks' => [$slide('First'), $slide('Second')]],
    ]));

    expect(substr_count($html, 'class="swiper swiper-block"'))->toBe(1);
    expect($html)->toContain('First')->not->toContain('Second');
});

test('the skip is silent in production and explained in debug', function () {
    $row = [
        ['width' => '1/2', 'blocks' => [['slides' => [['heading' => 'One', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center']]]]],
        ['width' => '1/2', 'blocks' => [['slides' => [['heading' => 'Two', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center']]]]],
    ];

    expect(renderLayout(makeLayout($row)))->not->toContain('swiper-block-warning');

    $default = kirby();
    $default->clone(['options' => ['debug' => true]]);
    restore_error_handler();
    restore_exception_handler();

    SwiperBlock::forgetAssets();
    SwiperBlock::forgetLayoutScans();
    expect(renderLayout(makeLayout($row)))->toContain('swiper-block-warning');

    $default->clone();
    restore_error_handler();
    restore_exception_handler();
});

// ── Sliders down a page ──────────────────────────────────────────────────────

test('one slider per row, several rows down a page: all of them render', function () {
    $html = renderLayout(makeLayoutRows([
        sliderRow('Hero'),
        // A slider beside an empty column is still the only slider in its row.
        [...sliderRow('Feature', '8/12'), ['width' => '4/12', 'blocks' => []]],
        sliderRow('Gallery'),
    ]));

    expect(substr_count($html, 'class="swiper swiper-block"'))->toBe(3);
    expect($html)->toContain('Hero')->toContain('Feature')->toContain('Gallery')
                 ->not->toContain('only one slider');
});

test('sliders down a page get distinct ids so their configs never collide', function () {
    $html = renderLayout(makeLayoutRows([sliderRow('One'), sliderRow('Two')]));

    preg_match_all('/id="(sb-[a-f0-9]{8})"/', $html, $m);
    expect($m[1])->toHaveCount(2);
    expect($m[1][0])->not->toBe($m[1][1]);
});

test('each slider down the page keeps its own settings', function () {
    $html = renderLayout(makeLayoutRows([
        [['width' => '1/1', 'blocks' => [[
            'effect' => 'fade',
            'slides' => [['heading' => 'Auto height', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center']],
        ]]]],
        [['width' => '1/1', 'blocks' => [[
            'effect'             => 'slide',
            'slider_height'      => '60',
            'slider_height_unit' => 'vh',
            'slides' => [['heading' => 'Fixed height', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center']],
        ]]]],
    ]));

    expect(substr_count($html, 'swiper-block--fade'))->toBe(1);
    expect(substr_count($html, '--swiper-block-fixed-height:60vh'))->toBe(1);
});

// ── Column-aware image sizes ─────────────────────────────────────────────────

test('the block finds its own column width in the layout field', function () {
    $spanOf = function (string $width, array $content = []): int {
        SwiperBlock::forgetLayoutScans();

        return firstSlider(makeLayoutRows([sliderRow('Slide', $width, $content)]))->columnSpan();
    };

    expect($spanOf('1/1'))->toBe(12);
    expect($spanOf('1/2'))->toBe(6);
    expect($spanOf('1/3'))->toBe(4);
    expect($spanOf('3/12'))->toBe(3);
    expect($spanOf('1/6'))->toBe(2);

    // Column Width overrides the detected column — for a slider inside a
    // narrower wrapper of the site's own.
    expect($spanOf('1/1', ['column_width' => '6']))->toBe(6);
    expect($spanOf('1/3', ['column_width' => 'auto']))->toBe(4);
});

test('a slider in a part-width column asks for a smaller image', function () {
    $sizes = function (string $width): string {
        SwiperBlock::forgetLayoutScans();

        return firstSlider(makeLayoutRows([sliderRow('Slide', $width)]))->imgSizes();
    };

    // Full width is unchanged — one candidate, the whole viewport.
    expect($sizes('1/1'))->toBe('100vw');

    // Part-width columns stack on small screens, so the stacked size comes first.
    expect($sizes('1/2'))->toBe('(max-width: 768px) 100vw, 50vw');
    expect($sizes('1/3'))->toBe('(max-width: 768px) 100vw, 33.3333vw');
    expect($sizes('1/6'))->toBe('(max-width: 768px) 100vw, 16.6667vw');
});

test('shared assets are injected once per page, however many sliders', function () {
    // Regression: the guard used to be a `static` inside the snippet, which Kirby
    // re-initialises on every render — so a page of three sliders emitted the CDN
    // <link>/<script> tags three times, loading and running Swiper three times.
    $html = renderLayout(makeLayoutRows([
        sliderRow('One'),
        sliderRow('Two'),
        sliderRow('Three'),
    ]));

    expect(substr_count($html, 'swiper-bundle.min.css'))->toBe(1);
    expect(substr_count($html, 'swiper-bundle.min.js'))->toBe(1);
    expect(substr_count($html, 'swiper-block.css'))->toBe(1);
    expect(substr_count($html, 'swiper-block.js'))->toBe(1);
    expect(substr_count($html, 'class="swiper swiper-block"'))->toBe(3);
});

test('a second page load injects the assets again', function () {
    $page = fn () => renderLayout(makeLayout([
        ['width' => '1/1', 'blocks' => [['slides' => [
            ['heading' => 'Slide', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
        ]]]],
    ]));

    expect(substr_count($page(), 'swiper-bundle.min.js'))->toBe(1);
    // Same request, already claimed — no repeat.
    expect(substr_count($page(), 'swiper-bundle.min.js'))->toBe(0);

    SwiperBlock::forgetAssets();
    expect(substr_count($page(), 'swiper-bundle.min.js'))->toBe(1);
});

test('the injectAssets option suppresses the tags without spending the claim', function () {
    $slides = [['heading' => 'Slide', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center']];
    $render = fn () => renderLayout(makeLayout([['width' => '1/1', 'blocks' => [['slides' => $slides]]]]));

    $default = kirby();

    // clone() rebuilds the app with the option set and makes it the current
    // instance; cloning the original back restores it for the other tests.
    // Every App constructor registers an error + exception handler and never
    // pops them, which PHPUnit reports as a risky test — so unwind them here.
    $reboot = function (array $options = []) use ($default) {
        $default->clone(['options' => $options]);
        restore_error_handler();
        restore_exception_handler();
    };

    $reboot(['ianhobbs.kirby-swiper-block.injectAssets' => false]);
    expect($render())->not->toContain('swiper-bundle.min.js');

    // Turning injection back on still works — an opted-out render must not have
    // consumed the one-shot claim.
    $reboot();
    expect(substr_count($render(), 'swiper-bundle.min.js'))->toBe(1);
});

// ── Captions inside a themed column ──────────────────────────────────────────

test('caption colour and placement survive the layout wrapper', function () {
    $html = renderLayout(makeLayout([
        ['width' => '1/2', 'blocks' => [[
            'heading_size' => 'text-3xl',
            'slides' => [
                ['heading' => 'Themed', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '',
                 'content_position' => 'left', 'content_position_y' => 'bottom', 'caption_color' => '#ffcc00'],
            ],
        ]]],
    ], 'card-blocks'));

    expect($html)->toContain('class="card-blocks"')
                 ->toContain('swiper-slide-caption--left')
                 ->toContain('swiper-slide-caption--bottom')
                 ->toContain('style="color:#ffcc00"')
                 ->toContain('class="swiper-slide-heading text-3xl"');
});

test('an empty column renders no slider markup', function () {
    $html = renderLayout(makeLayout([
        ['width' => '1/2', 'blocks' => []],
        ['width' => '1/2', 'blocks' => [['slides' => [
            ['heading' => 'Only one', 'image' => [], 'subtext' => '', 'link' => '', 'link_text' => '', 'content_position' => 'center'],
        ]]]],
    ]));

    expect(substr_count($html, 'class="swiper swiper-block"'))->toBe(1);
});
