<?php

/**
 * Blueprint structure tests
 *
 * Verifies that the swiper block blueprint YAML is valid
 * and contains all expected tabs and fields.
 */

use Kirby\Data\Yaml;

beforeEach(function () {
    $this->blueprint = Yaml::read(
        __DIR__ . '/../../../blueprints/blocks/swiper.yml'
    );
});

test('blueprint file is valid yaml', function () {
    expect($this->blueprint)->toBeArray()->not->toBeEmpty();
});

test('blueprint has a name', function () {
    expect($this->blueprint)->toHaveKey('name');
    expect($this->blueprint['name'])->toBeString()->not->toBeEmpty();
});

test('blueprint defines five tabs', function () {
    expect($this->blueprint)->toHaveKey('tabs');
    expect($this->blueprint['tabs'])->toHaveKeys([
        'slides', 'layout', 'animation', 'controls', 'touch',
    ]);
});

test('slides tab has slides structure field', function () {
    $fields = $this->blueprint['tabs']['slides']['fields'];
    expect($fields)->toHaveKey('slides');
    expect($fields['slides']['type'])->toBe('structure');
});

test('slides structure has required sub-fields', function () {
    $fields = $this->blueprint['tabs']['slides']['fields']['slides']['fields'];
    expect($fields)->toHaveKeys(['image', 'heading', 'subtext', 'link', 'link_text', 'content_position']);
});

test('slides structure has per-slide caption colour and vertical position', function () {
    $fields = $this->blueprint['tabs']['slides']['fields']['slides']['fields'];

    expect($fields['caption_color']['type'])->toBe('color');
    expect($fields['caption_color']['alpha'])->toBeTrue();

    $values = array_column($fields['content_position_y']['options'], 'value');
    expect($values)->toBe(['top', 'middle', 'bottom']);
    expect($fields['content_position_y']['default'])->toBe('middle');
});

test('layout tab offers Tailwind-named caption sizes', function () {
    $fields = $this->blueprint['tabs']['layout']['fields'];

    expect($fields['heading_size']['default'])->toBe('text-sm');
    expect($fields['subtext_size']['default'])->toBe('text-lg');

    // Every offered value must be one the model accepts, and one the CSS
    // fallback table covers — otherwise a non-Tailwind site gets no size at all.
    $headings = array_column($fields['heading_size']['options'], 'value');
    $subtexts = array_column($fields['subtext_size']['options'], 'value');
    expect($headings)->toBe(IanHobbs\Swiper\SwiperBlock::HEADING_SIZES);
    expect($subtexts)->toBe(IanHobbs\Swiper\SwiperBlock::SUBTEXT_SIZES);

    $css = file_get_contents(__DIR__ . '/../../../assets/css/swiper-block.css');
    foreach (array_unique([...$headings, ...$subtexts]) as $class) {
        expect($css)->toContain(".swiper-slide-caption .{$class})");
    }
});

test('the mobile height fields are revealed by the unit and the toggle', function () {
    $fields = $this->blueprint['tabs']['layout']['fields'];

    // The toggle appears only for absolute heights — vh/svh already scale.
    expect($fields['mobile_height_enable']['when'])->toBe(['slider_height_unit' => 'px']);
    expect($fields['mobile_height_enable']['default'])->toBeFalse();

    // The number needs both: Kirby ANDs the conditions.
    expect($fields['mobile_height']['when'])->toBe([
        'slider_height_unit'   => 'px',
        'mobile_height_enable' => true,
    ]);

    // Every unit the toggle can be gated on must exist in the unit field, or the
    // condition silently never fires.
    $units = array_column($fields['slider_height_unit']['options'], 'value');
    expect($units)->toContain('px');
});

test('the stylesheet applies the mobile height below the stacking breakpoint', function () {
    // Swiper can't carry this — `breakpoints` takes layout params only, and the
    // `height` option makes the instance non-responsive. It has to be a media
    // query, so the property the model emits must actually be consumed by one.
    $css = file_get_contents(__DIR__ . '/../../../assets/css/swiper-block.css');

    expect($css)->toContain('@media (max-width: 768px)')
                ->toContain('--swiper-block-mobile-height');
});

test('layout tab offers caption fonts the model accepts and the CSS defines', function () {
    $field = $this->blueprint['tabs']['layout']['fields']['caption_font'];

    expect($field['default'])->toBe('font-sans');

    $values = array_column($field['options'], 'value');
    expect($values)->toBe(IanHobbs\Swiper\SwiperBlock::CAPTION_FONTS);

    // Same contract as the sizes: every offered class needs a fallback rule, or
    // a non-Tailwind site picks a font and sees nothing change.
    $css = file_get_contents(__DIR__ . '/../../../assets/css/swiper-block.css');
    foreach ($values as $class) {
        expect($css)->toContain(".swiper-slide-caption.{$class})");
    }
});

test('layout tab has no fixed-ratio directives (native by default)', function () {
    $fields = $this->blueprint['tabs']['layout']['fields'];
    // Ratio/orientation controls were removed — each slide uses its image's
    // native ratio. Only the explicit Fixed Height override remains.
    expect($fields)->not->toHaveKey('aspect_ratio');
    expect($fields)->not->toHaveKey('custom_height');
    expect($fields)->not->toHaveKey('orientation');
});

test('layout tab has the column width hint, defaulting to auto-detect', function () {
    $field = $this->blueprint['tabs']['layout']['fields']['column_width'];

    expect($field['default'])->toBe('auto');

    // Every option must be 'auto' or a twelfth the model accepts.
    foreach (array_column($field['options'], 'value') as $value) {
        expect($value === 'auto' || ((int) $value >= 1 && (int) $value <= 12))->toBeTrue();
    }
});

test('layout tab keeps the fixed height override', function () {
    $fields = $this->blueprint['tabs']['layout']['fields'];
    expect($fields)->toHaveKey('slider_height');
    expect($fields['slider_height']['type'])->toBe('number');
});

test('animation tab has effect field with slide fade creative options', function () {
    $effects = $this->blueprint['tabs']['animation']['fields']['effect']['options'];
    $values  = array_column($effects, 'value');
    expect($values)->toContain('slide')
                   ->toContain('fade')
                   ->toContain('creative');
});

test('autoplay fields exist and are toggles', function () {
    $fields = $this->blueprint['tabs']['animation']['fields'];
    expect($fields['autoplay']['type'])->toBe('toggle');
    expect($fields['autoplay_delay']['type'])->toBe('number');
    expect($fields['autoplay_pause_on_hover']['type'])->toBe('toggle');
});

test('autoplay_delay only shows when autoplay is on', function () {
    $when = $this->blueprint['tabs']['animation']['fields']['autoplay_delay']['when'];
    expect($when)->toHaveKey('autoplay');
});

test('controls tab has navigation and pagination toggles', function () {
    $fields = $this->blueprint['tabs']['controls']['fields'];
    expect($fields['show_navigation']['type'])->toBe('toggle');
    expect($fields['show_pagination']['type'])->toBe('toggle');
});

test('pagination_type field has bullets fraction progressbar options', function () {
    $options = $this->blueprint['tabs']['controls']['fields']['pagination_type']['options'];
    $values  = array_column($options, 'value');
    expect($values)->toContain('bullets')
                   ->toContain('fraction')
                   ->toContain('progressbar');
});

test('touch tab has grab_cursor and simulate_touch fields', function () {
    $fields = $this->blueprint['tabs']['touch']['fields'];
    expect($fields)->toHaveKeys(['grab_cursor', 'simulate_touch', 'threshold']);
});
