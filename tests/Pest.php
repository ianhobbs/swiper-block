<?php

use Kirby\Data\Yaml;

/**
 * Pest configuration
 *
 * Sets the default test suite expectations and helper functions
 * available across all tests.
 */

uses()->beforeAll(function () {
    // Nothing extra — bootstrap.php boots Kirby
})->in('Feature');

/**
 * Create a minimal Kirby Block with swiper content.
 * Pass only the fields you need; defaults cover the rest.
 *
 * Structure fields must be YAML-encoded strings — Kirby stores all
 * content as strings and calls toString() before parsing.
 */
function makeBlock(array $content = []): Kirby\Cms\Block
{
    // Encode any array values (structure fields) to YAML strings
    $encoded = [];
    foreach ($content as $key => $value) {
        $encoded[$key] = is_array($value) ? Yaml::encode($value) : $value;
    }

    // factory() resolves the registered block model (SwiperBlock), so its
    // computed methods (jsConfig, imgSizes, …) are available in tests.
    return Kirby\Cms\Block::factory([
        'content' => array_merge([
            'slides'                  => '',
            'aspect_ratio'            => '16:9',
            'custom_height'           => '600',
            'direction'               => 'horizontal',
            'slides_per_view'         => '1',
            'slides_per_group'        => '1',
            'space_between'           => '0',
            'centered_slides'         => 'false',
            'initial_slide'           => '0',
            'effect'                  => 'slide',
            'speed'                   => '600',
            'loop'                    => 'false',
            'autoplay'                => 'false',
            'autoplay_delay'          => '4000',
            'autoplay_pause_on_hover' => 'false',
            'free_mode'               => 'false',
            'free_mode_momentum'      => 'false',
            'show_navigation'         => 'true',
            'show_pagination'         => 'true',
            'pagination_type'         => 'bullets',
            'dynamic_bullets'         => 'false',
            'keyboard_control'        => 'false',
            'mousewheel'              => 'false',
            'grab_cursor'             => 'false',
            'simulate_touch'          => 'true',
            'threshold'               => '5',
            'long_swipes'             => 'true',
            'resistance'              => 'true',
        ], $encoded),
        'id'   => 'test-block-id',
        'type' => 'swiper',
    ]);
}

/**
 * Render the swiper snippet for a block and return the HTML string.
 */
function renderBlock(Kirby\Cms\Block $block): string
{
    ob_start();
    snippet('blocks/swiper', ['block' => $block]);
    return ob_get_clean() ?: '';
}
