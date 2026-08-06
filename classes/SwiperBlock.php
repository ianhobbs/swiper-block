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
    /**
     * Font sizes offered in the Panel, as Tailwind utility class names. The class
     * is emitted verbatim so a Tailwind site styles it natively; swiper-block.css
     * carries a zero-specificity `:where()` fallback for the same names, so the
     * scale also works on sites without Tailwind. Anything outside this list is
     * ignored — the value lands in a class attribute.
     */
    public const HEADING_SIZES = [
        'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl',
        'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl',
    ];

    public const SUBTEXT_SIZES = [
        'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl',
    ];

    /**
     * Whether the shared CDN + plugin assets have already been injected in this
     * request. Lives here, not as a `static` inside the snippet: Kirby renders
     * snippets through `F::loadIsolated()`, which `include`s the file afresh
     * every time, so a snippet-local static resets between blocks and a page
     * with several sliders emitted the CDN tags once per block.
     */
    protected static bool $assetsInjected = false;

    /**
     * Claim the one asset injection for this request. Returns true exactly once
     * — the first caller renders the tags, every later block gets false.
     */
    public static function claimAssets(): bool
    {
        if (static::$assetsInjected === true) {
            return false;
        }

        return static::$assetsInjected = true;
    }

    /** Forget the claim — a fresh page/request. Used by the test suite. */
    public static function forgetAssets(): void
    {
        static::$assetsInjected = false;
    }

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
     * the column the block sits in (twelfths of the row) plus slidesPerView and
     * spaceBetween, so we tell the browser the real fraction it fills instead of
     * assuming the full viewport. 'auto' slidesPerView assumes 3 across — a safe
     * floor of at least three images per slider width.
     *
     * A slider in a part-width column emits two candidates, because layout rows
     * stack on small screens: the stacked (full-width) size below the breakpoint,
     * the column-fraction size above it.
     */
    public function imgSizes(): string
    {
        $spvRaw = $this->slides_per_view()->or('1')->value();
        $n      = $spvRaw === 'auto' ? 3 : max(1, (int) $spvRaw);
        $gap    = (int) $this->space_between()->or(0)->value();

        // The width of one slide, given the slider's own width as a CSS length.
        $perSlide = function (string $sliderWidth) use ($n, $gap): string {
            if ($n <= 1) {
                return $sliderWidth;
            }
            if ($gap > 0) {
                return sprintf('calc((%s - %dpx) / %d)', $sliderWidth, ($n - 1) * $gap, $n);
            }
            return sprintf('calc(%s / %d)', $sliderWidth, $n);
        };

        $span = $this->columnSpan();

        if ($span >= 12) {
            return $perSlide('100vw');
        }

        // Below the host layout's stacking breakpoint the column is full width.
        $breakpoint = kirby()->option('ianhobbs.kirby-swiper-block.stackBreakpoint', '768px');
        $columnVw   = rtrim(rtrim(number_format($span / 12 * 100, 4, '.', ''), '0'), '.') . 'vw';

        return sprintf(
            '(max-width: %s) %s, %s',
            $breakpoint,
            $perSlide('100vw'),
            $perSlide($columnVw)
        );
    }

    // ── Layout column context ────────────────────────────────────────────────

    /**
     * Per-request cache of the layout scan, keyed by the parent field. Scanning
     * walks every layout, column and block, so it runs once per field however
     * many sliders that field holds.
     *
     * @var array<int, array<string, array{span: int, firstInRow: bool}>>
     */
    protected static array $layoutScans = [];

    /**
     * Where this block sits in its layout field: the width of its column in
     * twelfths, and whether it is the first slider in its layout row.
     *
     * Kirby hands the block snippet nothing but the block, so we find the block
     * again from the other end — through the field it came from. A block in a
     * plain `blocks` field (or one built ad hoc, with no field) has no column,
     * and falls back to a full-width row of its own.
     *
     * @return array{span: int, firstInRow: bool}
     */
    protected function layoutContext(): array
    {
        $default = ['span' => 12, 'firstInRow' => true];
        $field   = $this->field();

        if ($field === null) {
            return $default;
        }

        $key = spl_object_id($field);

        if (isset(static::$layoutScans[$key]) === false) {
            $scan = [];

            foreach ($field->toLayouts() as $layout) {
                $rowHasSlider = false;

                foreach ($layout->columns() as $column) {
                    foreach ($column->blocks() as $block) {
                        if ($block->type() !== 'swiper') {
                            continue;
                        }

                        $scan[$block->id()] = [
                            'span'       => $column->span(),
                            'firstInRow' => $rowHasSlider === false,
                        ];

                        $rowHasSlider = true;
                    }
                }
            }

            static::$layoutScans[$key] = $scan;
        }

        return static::$layoutScans[$key][$this->id()] ?? $default;
    }

    /**
     * How much of the layout row the slider fills, in twelfths. The Column Width
     * field wins when the editor sets it; `auto` (the default) reads the real
     * column from the layout field.
     */
    public function columnSpan(): int
    {
        $manual = $this->column_width()->or('auto')->value();

        if ($manual !== 'auto' && is_numeric($manual)) {
            return max(1, min(12, (int) $manual));
        }

        return $this->layoutContext()['span'];
    }

    /**
     * Whether this slider is a second (or third…) one in the same layout row.
     * One slider per row is the supported arrangement — several side by side
     * fight over the same drag/keyboard gestures and force each into a column too
     * narrow for the imagery. Sliders stacked down a page are fine and unlimited.
     */
    public function isRowDuplicate(): bool
    {
        return $this->layoutContext()['firstInRow'] === false;
    }

    /** Drop the cached layout scan — a fresh page/request. Used by the tests. */
    public static function forgetLayoutScans(): void
    {
        static::$layoutScans = [];
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

    // ── Caption typography & colour ──────────────────────────────────────────

    /** Tailwind size class for slide headings, validated against HEADING_SIZES. */
    public function headingSizeClass(): string
    {
        $value = $this->heading_size()->or('text-4xl')->value();
        return in_array($value, self::HEADING_SIZES, true) ? $value : 'text-4xl';
    }

    /** Tailwind size class for slide subtext, validated against SUBTEXT_SIZES. */
    public function subtextSizeClass(): string
    {
        $value = $this->subtext_size()->or('text-lg')->value();
        return in_array($value, self::SUBTEXT_SIZES, true) ? $value : 'text-lg';
    }

    /**
     * Vertical caption placement for a slide (top|middle|bottom). Only visible
     * when Slider Height is set — that's the mode where the caption overlays a
     * full-height slide box; in auto mode it sits below the image in flow.
     */
    public static function verticalPosition(?string $value): string
    {
        return in_array($value, ['top', 'middle', 'bottom'], true) ? $value : 'middle';
    }

    /**
     * A per-slide caption colour, safe to interpolate into a style attribute, or
     * null when unset/unrecognised. The Panel's colour field stores hex, rgb() or
     * hsl(); anything else is dropped rather than passed through, so a hand-edited
     * content file can't inject arbitrary CSS (or close the attribute).
     */
    public static function cssColor(?string $value): ?string
    {
        $value = trim((string) $value);

        if ($value === '') {
            return null;
        }

        $hex       = '/^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i';
        $functional = '/^(?:rgb|hsl)a?\(\s*[0-9a-z%.,\s\/+-]+\)$/i';

        if (preg_match($hex, $value) || preg_match($functional, $value)) {
            return $value;
        }

        return null;
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
