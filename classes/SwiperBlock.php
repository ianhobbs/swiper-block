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
        'text-xs', 'text-sm', 'text-base', 'text-lg',
    ];

    public const SUBTEXT_SIZES = [
        'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl',
    ];

    /**
     * Caption font families offered in the Panel, as Tailwind utility class
     * names. Same contract as the sizes: a Tailwind site resolves them from its
     * own theme, and swiper-block.css defines each one as a `:where()` fallback
     * pointing at a `--swiper-block-font-*` custom property, so a site without
     * Tailwind can restyle the whole set by setting those properties.
     *
     * `font-body` is not a Tailwind stock utility — it is the conventional name
     * for a theme's body face, and is included because most Kirby themes define
     * one. On a site that doesn't, the CSS fallback keeps it rendering.
     */
    public const CAPTION_FONTS = [
        'font-sans', 'font-body', 'font-serif', 'font-mono',
    ];

    /**
     * Slide transition easing, as Panel value => CSS timing function.
     *
     * Swiper has no JS easing option — the slide transition is a plain CSS
     * transition on `.swiper-wrapper`, and Swiper 14 exposes
     * `--swiper-wrapper-transition-timing-function` for it, defaulting to
     * `initial` (i.e. `ease`). Setting that property on the block cascades to
     * the wrapper, so this is styling, not scripting.
     *
     * The value lands in a style attribute, so it is never taken from content:
     * the stored key selects one of these, and anything unrecognised falls back.
     */
    public const EASINGS = [
        'smooth'  => 'cubic-bezier(0.22, 1, 0.36, 1)',
        'gentle'  => 'cubic-bezier(0.65, 0, 0.35, 1)',
        'ease'    => 'ease',
        'linear'  => 'linear',
    ];

    /**
     * Whether the shared CDN + plugin assets have already been injected in this
     * request. Lives here, not as a `static` inside the snippet: Kirby renders
     * snippets through `F::loadIsolated()`, which `include`s the file afresh
     * every time, so a snippet-local static resets between blocks and a page
     * with several Swiper blocks emitted the CDN tags once per block.
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
     * floor of at least three images per block width.
     *
     * A block in a part-width column emits two candidates, because layout rows
     * stack on small screens: the stacked (full-width) size below the breakpoint,
     * the column-fraction size above it.
     */
    public function imgSizes(): string
    {
        $spvRaw = $this->slides_per_view()->or('1')->value();
        $n      = $spvRaw === 'auto' ? 3 : max(1, (int) $spvRaw);
        $gap    = (int) $this->space_between()->or(0)->value();

        // The width of one slide, given the block's own width as a CSS length.
        $perSlide = function (string $blockWidth) use ($n, $gap): string {
            if ($n <= 1) {
                return $blockWidth;
            }
            if ($gap > 0) {
                return sprintf('calc((%s - %dpx) / %d)', $blockWidth, ($n - 1) * $gap, $n);
            }
            return sprintf('calc(%s / %d)', $blockWidth, $n);
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
     * many Swiper blocks that field holds.
     *
     * @var array<int, array<string, array{span: int, firstInRow: bool}>>
     */
    protected static array $layoutScans = [];

    /**
     * Where this block sits in its layout field: the width of its column in
     * twelfths, and whether it is the first Swiper block in its layout row.
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
                $rowHasSwiper = false;

                foreach ($layout->columns() as $column) {
                    foreach ($column->blocks() as $block) {
                        if ($block->type() !== 'swiper') {
                            continue;
                        }

                        $scan[$block->id()] = [
                            'span'       => $column->span(),
                            'firstInRow' => $rowHasSwiper === false,
                        ];

                        $rowHasSwiper = true;
                    }
                }
            }

            static::$layoutScans[$key] = $scan;
        }

        return static::$layoutScans[$key][$this->id()] ?? $default;
    }

    /**
     * How much of the layout row the block fills, in twelfths. The Column Width
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
     * Whether this block is a second (or third…) Swiper block in the same layout
     * row. One per row is the supported arrangement — several side by side fight
     * over the same drag/keyboard gestures and force each into a column too
     * narrow for the imagery. Blocks stacked down a page are fine and unlimited.
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

        // Explicit container height (Fixed Height field) — decouples the block
        // height from the image box so text-only / empty slides don't collapse.
        // Emitted first; the stylesheet lets it take precedence over the ratio.
        if ($height = $this->sliderHeight()) {
            $styles[] = "--swiper-block-fixed-height:{$height}";

            // Small-screen override, applied by a media query in the stylesheet.
            // Swiper itself can't carry this: `breakpoints` only accepts layout
            // params (slidesPerView, spaceBetween, grid.rows), and the `height`
            // option is documented as making Swiper non-responsive. So it stays
            // CSS — which also means no JS runs on resize to maintain it.
            if ($mobile = $this->mobileHeight()) {
                $styles[] = "--swiper-block-mobile-height:{$mobile}";
            }
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
     * parent <div> so the block never collapses when slides have no image.
     *
     * The `slider_height` content keys are v1 legacy — v2 renames them to
     * `height` / `height_unit` and this method to `fixedHeight()`.
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

    /**
     * Small-screen height override as a CSS length, or null when it doesn't
     * apply. Three things must all hold, and the toggle alone isn't enough —
     * an editor can leave it on after clearing the number, or after switching
     * the unit away from px:
     *
     *  - the unit is px. vh/svh already track the viewport, so an override
     *    would only fight the thing that makes them work.
     *  - the toggle is on. Kirby's `when:` can't test "the field has a value",
     *    so the Panel needs an explicit trigger to reveal the number field.
     *  - the number is above zero. Zero means "no override" and falls through
     *    to the desktop height, matching how Fixed Height itself reads 0.
     *
     * Callers should only emit this when sliderHeight() is set — with no fixed
     * height there is nothing to override.
     */
    public function mobileHeight(): ?string
    {
        if ($this->slider_height_unit()->or('px')->value() !== 'px') {
            return null;
        }

        if ($this->mobile_height_enable()->isTrue() === false) {
            return null;
        }

        $value = (int) $this->mobile_height()->or(0)->value();

        return $value > 0 ? "{$value}px" : null;
    }

    /**
     * The slide transition easing as a CSS custom property declaration, or ''
     * when the editor chose Swiper's own default and there is nothing to say.
     */
    public function easingStyle(): string
    {
        $key = $this->easing()->or('smooth')->value();

        if (isset(self::EASINGS[$key]) === false) {
            $key = 'smooth';
        }

        if ($key === 'ease') {
            return '';
        }

        return '--swiper-wrapper-transition-timing-function:' . self::EASINGS[$key];
    }

    /**
     * Everything the block needs on its inline `style` attribute: the height
     * custom properties plus the easing. Kept separate from aspectStyle() so
     * that method stays about layout only.
     */
    public function blockStyle(): string
    {
        return implode(';', array_filter([
            $this->aspectStyle(),
            $this->easingStyle(),
        ]));
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
        $value = $this->heading_size()->or('text-sm')->value();
        return in_array($value, self::HEADING_SIZES, true) ? $value : 'text-sm';
    }

    /** Tailwind size class for slide subtext, validated against SUBTEXT_SIZES. */
    public function subtextSizeClass(): string
    {
        $value = $this->subtext_size()->or('text-lg')->value();
        return in_array($value, self::SUBTEXT_SIZES, true) ? $value : 'text-lg';
    }

    /**
     * Tailwind font-family class for the whole caption. Emitted on the caption
     * wrapper, so the heading, subtext and CTA all inherit one face.
     */
    public function captionFontClass(): string
    {
        $value = $this->caption_font()->or('font-sans')->value();
        return in_array($value, self::CAPTION_FONTS, true) ? $value : 'font-sans';
    }

    /**
     * Vertical caption placement for a slide (top|middle|bottom). Only visible
     * when Fixed Height is set — that's the mode where the caption overlays a
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
            // Whether the block carries an explicit container height. Drives
            // autoHeight in swiper-block.js: with a fixed height the slides are
            // height:100% of the wrapper, so measuring the active slide to size
            // that same wrapper is circular and oscillates on every observer
            // tick. Fixed height ⇒ autoHeight off.
            'fixedHeight'    => $this->sliderHeight() !== null,
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
