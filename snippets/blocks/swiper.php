<?php
/**
 * Swiper Block Snippet
 *
 * Renders a Swiper 12 slider from a Kirby layout block.
 * Image cropping is handled via Kirby thumb presets defined in index.php.
 *
 * @var \Kirby\Cms\Block $block
 */

// ── Resolve slides ────────────────────────────────────────────────────────────
$slides = $block->slides()->toStructure();

if ($slides->count() === 0) {
    return; // Nothing to render
}

// ── Slider config from block fields ──────────────────────────────────────────
$effect          = $block->effect()->or('slide')->value();
$speed           = (int) $block->speed()->or(600)->value();
$autoplay        = $block->autoplay()->isTrue();
$autoplayDelay   = (int) $block->autoplay_delay()->or(4000)->value();
$loop            = $block->loop()->isTrue();
$showNav         = $block->show_navigation()->isTrue();
$showPagination  = $block->show_pagination()->isTrue();
$aspectRatio     = $block->aspect_ratio()->or('16:9')->value();
$customHeight    = (int) $block->custom_height()->or(600)->value();

// Build the data-config JSON passed to swiper-block.js
$swiperConfig = json_encode([
    'effect'     => $effect,
    'speed'      => $speed,
    'loop'       => $loop,
    'navigation' => $showNav,
    'pagination' => $showPagination,
    'autoplay'   => $autoplay ? ['delay' => $autoplayDelay, 'disableOnInteraction' => false] : false,
    'creativeEffect' => [
        'prev' => ['shadow' => true, 'translate' => [0, 0, -400]],
        'next' => ['translate' => ['100%', 0, 0]],
    ],
], JSON_HEX_QUOT | JSON_HEX_TAG);

// Aspect-ratio CSS custom property
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
  class="swiper-block<?= $effect !== 'slide' ? ' swiper-block--' . $effect : '' ?>"
  id="<?= $uid ?>"
  style="<?= $aspectStyle ?>"
  data-swiper-config="<?= htmlspecialchars($swiperConfig, ENT_QUOTES, 'UTF-8') ?>"
  aria-roledescription="carousel"
  aria-label="<?= $block->slides()->count() ?> slides"
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
          // Generate cropped/sized thumbs via presets from index.php
          $xlThumb   = $imageField->thumb('swiper-xl');
          $lgThumb   = $imageField->thumb('swiper-lg');
          $mdThumb   = $imageField->thumb('swiper-md');
          $smThumb   = $imageField->thumb('swiper-sm');
          $lqip      = $imageField->thumb('swiper-lqip');

          $altText   = $imageField->alt()->or($slide->heading())->value();
      }

      $opacity  = (int) $slide->overlay_opacity()->or(30)->value();
      $position = $slide->content_position()->or('center')->value();
    ?>

    <div
      class="swiper-slide"
      role="group"
      aria-roledescription="slide"
      aria-label="Slide <?= $index ?> of <?= $slides->count() ?>"
    >

      <?php if ($imageField) : ?>
      <figure class="swiper-slide__media" aria-hidden="true">

        <?php /* LQIP blur-up placeholder */ ?>
        <img
          class="swiper-slide__lqip"
          src="<?= $lqip->url() ?>"
          width="<?= $lqip->width() ?>"
          height="<?= $lqip->height() ?>"
          alt=""
          aria-hidden="true"
        >

        <?php /* Responsive picture with WebP + srcset */ ?>
        <picture>
          <?php if ($xlThumb) : ?>
          <source
            media="(min-width: 1400px)"
            srcset="<?= $xlThumb->url() ?>"
            width="<?= $xlThumb->width() ?>"
            height="<?= $xlThumb->height() ?>"
          >
          <?php endif ?>

          <source
            media="(min-width: 900px)"
            srcset="<?= $lgThumb->url() ?>"
            width="<?= $lgThumb->width() ?>"
            height="<?= $lgThumb->height() ?>"
          >

          <source
            media="(min-width: 640px)"
            srcset="<?= $mdThumb->url() ?>"
            width="<?= $mdThumb->width() ?>"
            height="<?= $mdThumb->height() ?>"
          >

          <img
            class="swiper-slide__img"
            src="<?= $smThumb->url() ?>"
            srcset="<?= $smThumb->url() ?> 640w, <?= $mdThumb->url() ?> 900w, <?= $lgThumb->url() ?> 1400w<?= $xlThumb ? ', ' . $xlThumb->url() . ' 1920w' : '' ?>"
            sizes="100vw"
            width="<?= $smThumb->width() ?>"
            height="<?= $smThumb->height() ?>"
            alt="<?= htmlspecialchars($altText, ENT_QUOTES, 'UTF-8') ?>"
            loading="<?= $index === 1 ? 'eager' : 'lazy' ?>"
            decoding="<?= $index === 1 ? 'sync' : 'async' ?>"
          >
        </picture>

        <?php if ($opacity > 0) : ?>
        <div
          class="swiper-slide__overlay"
          style="--overlay-opacity:<?= $opacity / 100 ?>"
          aria-hidden="true"
        ></div>
        <?php endif ?>

      </figure>
      <?php endif ?>

      <?php if ($slide->heading()->isNotEmpty() || $slide->subtext()->isNotEmpty() || $slide->link()->isNotEmpty()) : ?>
      <div class="swiper-slide__content swiper-slide__content--<?= $position ?>">

        <?php if ($slide->heading()->isNotEmpty()) : ?>
        <h2 class="swiper-slide__heading"><?= $slide->heading()->html() ?></h2>
        <?php endif ?>

        <?php if ($slide->subtext()->isNotEmpty()) : ?>
        <p class="swiper-slide__subtext"><?= $slide->subtext()->html() ?></p>
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
