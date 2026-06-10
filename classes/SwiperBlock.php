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

    /** Named srcset for the chosen orientation. */
    public function srcsetName(): string
    {
        return $this->orientationValue() === 'vertical' ? 'swiper-vert' : 'swiper-horiz';
    }

    /** LQIP preset for the chosen orientation. */
    public function lqipPreset(): string
    {
        return $this->orientationValue() === 'vertical' ? 'swiper-lqip-vert' : 'swiper-lqip-horiz';
    }

    /**
     * Largest entry in the chosen srcset — doubles as the non-srcset `<img src>`
     * fallback. Null when the consuming site hasn't defined the srcset.
     */
    public function baseThumbOptions(): array|null
    {
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

    /** Inline style carrying the aspect-ratio (or fixed height) CSS custom prop. */
    public function aspectStyle(): string
    {
        $aspect = $this->aspect_ratio()->or('16:9')->value();

        if ($aspect === 'custom') {
            $height = (int) $this->custom_height()->or(600)->value();
            return "--swiper-block-height:{$height}px";
        }

        [$w, $h] = explode(':', $aspect);
        $pct     = round(((float) $h / (float) $w) * 100, 4);
        return "--swiper-block-ratio:{$pct}%";
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
