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
        __DIR__ . '/../../blueprints/blocks/swiper.yml'
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
    expect($fields)->toHaveKeys(['image', 'heading', 'subtext', 'link', 'link_text', 'overlay_opacity', 'content_position']);
});

test('layout tab has aspect_ratio select field', function () {
    $fields = $this->blueprint['tabs']['layout']['fields'];
    expect($fields)->toHaveKey('aspect_ratio');
    expect($fields['aspect_ratio']['type'])->toBe('select');
});

test('aspect_ratio includes 16:9 option', function () {
    $options = $this->blueprint['tabs']['layout']['fields']['aspect_ratio']['options'];
    $values  = array_column($options, 'value');
    expect($values)->toContain('16:9');
});

test('aspect_ratio includes custom height option', function () {
    $options = $this->blueprint['tabs']['layout']['fields']['aspect_ratio']['options'];
    $values  = array_column($options, 'value');
    expect($values)->toContain('custom');
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
