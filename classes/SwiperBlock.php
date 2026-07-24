<?php

namespace IanHobbs\Swiper;

use Kirby\Cms\Block;
use Kirby\Cms\Structure;

/**
 * Swiper block model
 *
 * Centralises everything the snippet would otherwise compute inline: the Swiper
 * JS config object, the aspect-ratio CSS, the per-orientation thumb presets and
 * the responsive `sizes` hint. Keeping it here makes the values unit-testable in
 * isolation and leaves the snippet focused on markup.
 *
 * Field accessors (e.g. `$this->effect()`) resolve to content fields via the
 * parent's `__call`; the methods below are named distinctly so they never shadow
 * a field of the same name.
 */
class SwiperBlock extends Block
{
    /** The slides as a structure collection. */
    public function slidesData(): Structure
    {
        return $this->slides()->toStructure();
    }

    /** Transition effect value (slide|fade|creative|coverflow). */
    public function effectName(): string
    {
        return $this->effect()->or('slide')->value();
    }

    /** Whether the arrow navigation should render. */
    public function showNav(): bool
    {
        return $this->show_navigation()->isTrue();
    }

    /** Whether the pagination should render. */
    public function showPagination(): bool
    {
        return $this->show_pagination()->isTrue();
    }

    // ── Images ───────────────────────────────────────────────────────────────

    /** Orientation value (horizontal|vertical). */
    protected function orientationValue(): string
    {
        return $this->orientation()->or('horizontal')->value();
    }

    /**
     * Native mode: crop nothing — each image keeps its own ratio. Thumbs are
     * built width-only (inline, no site config) and the figure takes the
     * image's real aspect-ratio (set per slide in the snippet).
     */
    public function isNative(): bool
    {
        return $this->aspect_ratio()->or('native')->value() === 'native';
    }

    /**
     * Responsive srcset. Fixed-ratio modes use the named, cropped per-orientation
     * srcset from site config. Native mode returns a width-only set inline so the
     * source ratio survives — no config, no crop.
     */
    public function srcsetName(): string|array
    {
        if ($this->isNative()) {
            return [
                '640w'  => ['width' =>  640, 'format' => 'webp', 'quality' => 80],
                '900w'  => ['width' =>  900, 'format' => 'webp', 'quality' => 82],
                '1400w' => ['width' => 1400, 'format' => 'webp', 'quality' => 85],
                '1920w' => ['width' => 1920, 'format' => 'webp', 'quality' => 85],
            ];
        }
        return $this->orientationValue() === 'vertical' ? 'swiper-vert' : 'swiper-horiz';
    }

    /** LQIP placeholder. Native uses a width-only tiny (keeps the image ratio). */
    public function lqipPreset(): string|array
    {
        if ($this->isNative()) {
            return ['width' => 48, 'blur' => 4, 'quality' => 30, 'format' => 'webp'];
        }
        return $this->orientationValue() === 'vertical' ? 'swiper-lqip-vert' : 'swiper-lqip-horiz';
    }

    /**
     * Largest thumb — the non-srcset `<img src>` fallback. Native uses a
     * width-only 1920 (uncropped); fixed modes use the largest entry of the
     * named srcset. Null when the site hasn't defined that srcset.
     */
    public function baseThumbOptions(): array|null
    {
        if ($this->isNative()) {
            return ['width' => 1920, 'format' => 'webp', 'quality' => 85];
        }
        $srcset = kirby()->option('thumbs.srcsets.' . $this->srcsetName(), []);
        return $srcset ? end($srcset) : null;
    }

    /**
     * Responsive `sizes` hint. Each slide's rendered width is deterministic from
     * slidesPerView + spaceBetween (one fixed slidesPerView, no breakpoints), so
     * we tell the browser the real fraction it fills instead of assuming 100vw.
     * Hybrid rule: a single full-width slide stays 100vw; 2+ per view size to
     * their true fraction; 'auto' assumes 3 across — a safe floor of at least
     * three images per page width when the real width isn't knowable server-side.
     */
    public function imgSizes(): string
    {
        $spvRaw = $this->slides_per_view()->or('1')->value();
        $n      = $spvRaw === 'auto' ? 3 : max(1, (int) $spvRaw);
        $gap    = (int) $this->space_between()->or(0)->value();

        if ($n <= 1) {
            return '100vw';
        }
        if ($gap > 0) {
            return sprintf('calc((100vw - %dpx) / %d)', ($n - 1) * $gap, $n);
        }
        return sprintf('calc(100vw / %d)', $n);
    }

    // ── Layout / wrapper ─────────────────────────────────────────────────────

    /** Inline style carrying the aspect-ratio (or fixed height) CSS custom props. */
    public function aspectStyle(): string
    {
        $styles = [];

        // Explicit container height (Slider Height field) — decouples the slider
        // height from the image box so text-only / empty slides don't collapse.
        // Emitted first; the stylesheet lets it take precedence over the ratio.
        if ($height = $this->sliderHeight()) {
            $styles[] = "--swiper-block-fixed-height:{$height}";
        }

        $aspect = $this->aspect_ratio()->or('native')->value();

        if ($aspect === 'custom') {
            $custom    = (int) $this->custom_height()->or(600)->value();
            $styles[]  = "--swiper-block-height:{$custom}px";
        }
        // 'native' (default): no container ratio — each figure sets its own
        // aspect-ratio from the image's real dimensions (see the snippet).
        // Named ratios (16:9 etc) removed from the design plan.

        return implode(';', $styles);
    }

    /**
     * Explicit container height as a CSS length (e.g. "600px", "80vh"), or null
     * when the editor left it at auto (0). Drives an explicit height on the
     * parent <div> so the slider never collapses when slides have no image.
     */
    public function sliderHeight(): ?string
    {
        $value = (int) $this->slider_height()->or(0)->value();
        if ($value <= 0) {
            return null;
        }

        $unit = $this->slider_height_unit()->or('px')->value();
        $unit = in_array($unit, ['px', 'vh', 'svh', 'dvh'], true) ? $unit : 'px';

        return "{$value}{$unit}";
    }

    /** Stable unique id so multiple blocks on a page don't collide. */
    public function uid(): string
    {
        return 'sb-' . substr(md5($this->id()), 0, 8);
    }

    // ── JS config ────────────────────────────────────────────────────────────

    /**
     * The Swiper options object as a JSON string for the `data-swiper-config`
     * attribute. Keys map 1:1 to Swiper options; context-prefixed keys
     * (autoplay*, pagination*, free*) are expanded into sub-objects by
     * swiper-block.js.
     */
    public function jsConfig(): string
    {
        $spvRaw        = $this->slides_per_view()->or('1')->value();
        $slidesPerView = $spvRaw === 'auto' ? 'auto' : (int) $spvRaw;
        $effect        = $this->effectName();

        $config = [
            // Layout
            'direction'      => $this->direction()->or('horizontal')->value(),
            'slidesPerView'  => $slidesPerView,
            'slidesPerGroup' => (int) $this->slides_per_group()->or(1)->value(),
            'spaceBetween'   => (int) $this->space_between()->or(0)->value(),
            'centeredSlides' => $this->centered_slides()->isTrue(),
            'initialSlide'   => (int) $this->initial_slide()->or(0)->value(),

            // Animation
            'effect'               => $effect,
            'speed'                => (int) $this->speed()->or(600)->value(),
            'loop'                 => $this->loop()->isTrue(),
            'autoplay'             => $this->autoplay()->isTrue(),
            'autoplayDelay'        => (int) $this->autoplay_delay()->or(4000)->value(),
            'autoplayPauseOnHover' => $this->autoplay_pause_on_hover()->isTrue(),
            'freeMode'             => $this->free_mode()->isTrue(),
            'freeModeMomentum'     => $this->free_mode_momentum()->isTrue(),

            // Controls
            'showNavigation'  => $this->show_navigation()->isTrue(),
            'showPagination'  => $this->show_pagination()->isTrue(),
            'paginationType'  => $this->pagination_type()->or('bullets')->value(),
            'dynamicBullets'  => $this->dynamic_bullets()->isTrue(),
            'keyboardControl' => $this->keyboard_control()->isTrue(),
            'mousewheel'      => $this->mousewheel()->isTrue(),

            // Touch
            'grabCursor'    => $this->grab_cursor()->isTrue(),
            'simulateTouch' => $this->simulate_touch()->isTrue(),
            'threshold'     => (int) $this->threshold()->or(5)->value(),
            'longSwipes'    => $this->long_swipes()->isTrue(),
            'resistance'    => $this->resistance()->isTrue(),
        ];

        // Creative effect config — only included when needed
        if ($effect === 'creative') {
            $config['creativeEffect'] = [
                'prev' => ['shadow' => true, 'translate' => [0, 0, -400]],
                'next' => ['translate' => ['100%', 0, 0]],
            ];
        }

        return json_encode($config, JSON_HEX_QUOT | JSON_HEX_TAG);
    }
}
