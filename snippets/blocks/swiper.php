<?php
/**
 * Swiper Block Snippet
 *
 * Renders a Swiper 12 slider from a Kirby layout block.
 * CDN scripts and plugin CSS are injected automatically on first use —
 * no manual changes to your templates are required.
 *
 * @var \Kirby\Cms\Block $block
 */

// ── Bail if no slides ────────────────────────────────────────────────────────
$slides = $block->slides()->toStructure();
if ($slides->count() === 0) return;

// ── Inject CDN + plugin assets once per page ─────────────────────────────────
// Uses a static flag so multiple blocks on the same page only load assets once.
static $swiperAssetsLoaded = false;
if (!$swiperAssetsLoaded) {
    $swiperAssetsLoaded = true;
    $plugin = kirby()->plugin('ianhobbs/kirby-swiper-block');
    echo '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css">' . "\n";
    echo '<link rel="stylesheet" href="' . $plugin->asset('css/swiper-block.css')->url() . '">' . "\n";
    echo '<script src="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js" defer></script>' . "\n";
    echo '<script src="' . $plugin->asset('js/swiper-block.js')->url() . '" defer></script>' . "\n";
}

// ── Tab 2: Layout ─────────────────────────────────────────────────────────────
$spvRaw         = $block->slides_per_view()->or('1')->value();
$slidesPerView  = $spvRaw === 'auto' ? 'auto' : (int) $spvRaw;
$slidesPerGroup = (int) $block->slides_per_group()->or(1)->value();
$spaceBetween   = (int) $block->space_between()->or(0)->value();
$centeredSlides = $block->centered_slides()->isTrue();
$direction      = $block->direction()->or('horizontal')->value();
$initialSlide   = (int) $block->initial_slide()->or(0)->value();
$aspectRatio    = $block->aspect_ratio()->or('16:9')->value();
$customHeight   = (int) $block->custom_height()->or(600)->value();

// Responsive image set — see thumbs.srcsets in the site config.
// Landscape (swiper-horiz) vs portrait (swiper-vert) crops, plus the
// matching blurred LQIP preset. All output as webp.
$orientation      = $block->orientation()->or('horizontal')->value();
$srcsetName       = $orientation === 'vertical' ? 'swiper-vert' : 'swiper-horiz';
$lqipPreset       = $orientation === 'vertical' ? 'swiper-lqip-vert' : 'swiper-lqip-horiz';
// Largest entry in the set doubles as the non-srcset fallback src.
$srcsetSizes      = kirby()->option("thumbs.srcsets.{$srcsetName}", []);
$baseThumbOptions = $srcsetSizes ? end($srcsetSizes) : null;

// Responsive `sizes` hint for the slide images.
// Each slide's rendered width is deterministic from slidesPerView + spaceBetween
// (the slider uses one fixed slidesPerView, no breakpoints), so we tell the
// browser the real fraction it occupies instead of always assuming full width.
// Hybrid rule: a single full-width slide stays 100vw (crisp heroes); 2+ per view
// size to their true fraction; 'auto' assumes 3 across — a safe floor of at least
// three images per page width when the real width isn't knowable server-side.
$sizesN = $slidesPerView === 'auto' ? 3 : max(1, (int) $slidesPerView);
if ($sizesN <= 1) {
    $imgSizes = '100vw';
} elseif ($spaceBetween > 0) {
    $imgSizes = sprintf('calc((100vw - %dpx) / %d)', ($sizesN - 1) * $spaceBetween, $sizesN);
} else {
    $imgSizes = sprintf('calc(100vw / %d)', $sizesN);
}

// ── Tab 3: Animation ──────────────────────────────────────────────────────────
$effect         = $block->effect()->or('slide')->value();
$speed          = (int) $block->speed()->or(600)->value();
$loop           = $block->loop()->isTrue();
$autoplay       = $block->autoplay()->isTrue();
$autoplayDelay  = (int) $block->autoplay_delay()->or(4000)->value();
$autoplayPause  = $block->autoplay_pause_on_hover()->isTrue();
$freeMode       = $block->free_mode()->isTrue();
$freeMomentum   = $block->free_mode_momentum()->isTrue();

// ── Tab 4: Controls ───────────────────────────────────────────────────────────
$showNav         = $block->show_navigation()->isTrue();
$showPagination  = $block->show_pagination()->isTrue();
$paginationType  = $block->pagination_type()->or('bullets')->value();
$dynamicBullets  = $block->dynamic_bullets()->isTrue();
$keyboardControl = $block->keyboard_control()->isTrue();
$mousewheel      = $block->mousewheel()->isTrue();

// ── Tab 5: Touch & Input ──────────────────────────────────────────────────────
$grabCursor    = $block->grab_cursor()->isTrue();
$simulateTouch = $block->simulate_touch()->isTrue();
$threshold     = (int) $block->threshold()->or(5)->value();
$longSwipes    = $block->long_swipes()->isTrue();
$resistance    = $block->resistance()->isTrue();

// ── Build JS config object ────────────────────────────────────────────────────
// Keys that map 1:1 to Swiper options are passed through directly.
// Keys prefixed with context (autoplay*, pagination*, free*) are transformed
// into proper Swiper sub-objects by swiper-block.js.

$jsConfig = [
    // Layout
    'direction'      => $direction,
    'slidesPerView'  => $slidesPerView,
    'slidesPerGroup' => $slidesPerGroup,
    'spaceBetween'   => $spaceBetween,
    'centeredSlides' => $centeredSlides,
    'initialSlide'   => $initialSlide,

    // Animation
    'effect'               => $effect,
    'speed'                => $speed,
    'loop'                 => $loop,
    'autoplay'             => $autoplay,
    'autoplayDelay'        => $autoplayDelay,
    'autoplayPauseOnHover' => $autoplayPause,
    'freeMode'             => $freeMode,
    'freeModeMomentum'     => $freeMomentum,

    // Controls
    'showNavigation'  => $showNav,
    'showPagination'  => $showPagination,
    'paginationType'  => $paginationType,
    'dynamicBullets'  => $dynamicBullets,
    'keyboardControl' => $keyboardControl,
    'mousewheel'      => $mousewheel,

    // Touch
    'grabCursor'    => $grabCursor,
    'simulateTouch' => $simulateTouch,
    'threshold'     => $threshold,
    'longSwipes'    => $longSwipes,
    'resistance'    => $resistance,
];

// Creative effect config — only included when needed
if ($effect === 'creative') {
    $jsConfig['creativeEffect'] = [
        'prev' => ['shadow' => true, 'translate' => [0, 0, -400]],
        'next' => ['translate' => ['100%', 0, 0]],
    ];
}

$swiperConfig = json_encode($jsConfig, JSON_HEX_QUOT | JSON_HEX_TAG);

// ── Aspect-ratio CSS custom property ─────────────────────────────────────────
if ($aspectRatio === 'custom') {
    $aspectStyle = "--swiper-block-height:{$customHeight}px";
} else {
    [$w, $h]     = explode(':', $aspectRatio);
    $pct         = round(($h / $w) * 100, 4);
    $aspectStyle = "--swiper-block-ratio:{$pct}%";
}

// Unique ID so multiple blocks on one page don't collide
$uid = 'sb-' . substr(md5($block->id()), 0, 8);
?>

<div
  class="swiper swiper-block<?= $effect !== 'slide' ? ' swiper-block--' . $effect : '' ?>"
  id="<?= $uid ?>"
  style="<?= $aspectStyle ?>"
  data-swiper-config="<?= htmlspecialchars($swiperConfig, ENT_QUOTES, 'UTF-8') ?>"
  aria-roledescription="carousel"
  aria-label="<?= $slides->count() ?> slides"
>

  <?php if ($showNav) : ?>
  <button class="swiper-button-prev" aria-label="Previous slide"></button>
  <button class="swiper-button-next" aria-label="Next slide"></button>
  <?php endif ?>

  <?php if ($showPagination) : ?>
  <div class="swiper-pagination" role="tablist" aria-label="Slide navigation"></div>
  <?php endif ?>

  <div class="swiper-wrapper">

    <?php $index = 0; foreach ($slides as $slide) :
      $index++;

      // ── Image & thumb variants ────────────────────────────────────────────
      $imageField = $slide->image()->toFiles()->first();

      if ($imageField) {
          $lqip    = $imageField->thumb($lqipPreset);
          $base    = $baseThumbOptions ? $imageField->thumb($baseThumbOptions) : $imageField;
          $srcset  = $imageField->srcset($srcsetName);
          $altText = $imageField->alt()->or($slide->heading())->value();
      }

      $position = $slide->content_position()->or('center')->value();
    ?>

    <div
      class="swiper-slide"
      role="group"
      aria-roledescription="slide"
      aria-label="Slide <?= $index ?> of <?= $slides->count() ?>"
    >

      <?php if ($imageField) : ?>
      <figure class="swiper-slide-media" aria-hidden="true">

        <img
          class="swiper-slide__lqip"
          src="<?= $lqip->url() ?>"
          width="<?= $lqip->width() ?>"
          height="<?= $lqip->height() ?>"
          alt=""
          aria-hidden="true"
        >

        <img
          class="swiper-slide__img"
          src="<?= $base->url() ?>"
          srcset="<?= $srcset ?>"
          sizes="<?= $imgSizes ?>"
          width="<?= $base->width() ?>"
          height="<?= $base->height() ?>"
          alt="<?= htmlspecialchars($altText, ENT_QUOTES, 'UTF-8') ?>"
          loading="<?= $index === 1 ? 'eager' : 'lazy' ?>"
          decoding="<?= $index === 1 ? 'sync' : 'async' ?>"
        >

      </figure>
      <?php endif ?>

      <?php if ($slide->heading()->isNotEmpty() || $slide->subtext()->isNotEmpty() || $slide->link()->isNotEmpty()) : ?>
      <div class="swiper-slide-caption swiper-slide-caption--<?= $position ?>">

        <?php if ($slide->heading()->isNotEmpty()) : ?>
        <p class="swiper-slide-heading"><?= $slide->heading()->html() ?>
        <?php endif ?>
        <?php if ($slide->subtext()->isNotEmpty()) : ?>
        <span class="swiper-slide-subtext "><?= $slide->subtext()->html() ?></span></p>
        <?php endif ?>
        <?php if ($slide->link()->isNotEmpty()) : ?>
        <a
          class="swiper-slide__cta"
          href="<?= $slide->link()->url() ?>"
        ><?= $slide->link_text()->or('Learn more')->html() ?></a>
        <?php endif ?>

      </div>
      <?php endif ?>

    </div><!-- /.swiper-slide -->

    <?php endforeach ?>
  </div><!-- /.swiper-wrapper -->

</div><!-- /.swiper-block -->
