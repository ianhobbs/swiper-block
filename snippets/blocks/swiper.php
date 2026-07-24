<?php
/**
 * Swiper Block Snippet
 *
 * Renders a Swiper 12 slider from a Kirby layout block. All computed values
 * (JS config, aspect CSS, thumb presets, responsive `sizes`) come from the
 * SwiperBlock model — see classes/SwiperBlock.php — so this snippet stays
 * markup-only. CDN scripts and plugin CSS are injected automatically on first
 * use; no manual template changes are required.
 *
 * @var \IanHobbs\Swiper\SwiperBlock $block
 */

// ── Bail if no slides ────────────────────────────────────────────────────────
$slides = $block->slidesData();
if ($slides->count() === 0) return;

// ── Inject CDN + plugin assets once per page ─────────────────────────────────
// Uses a static flag so multiple blocks on the same page only load assets once.
// Honour the injectAssets option — sites that load Swiper themselves can disable it.
static $swiperAssetsLoaded = false;
if (!$swiperAssetsLoaded && kirby()->option('ianhobbs.kirby-swiper-block.injectAssets', true)) {
    $swiperAssetsLoaded = true;
    $plugin = kirby()->plugin('ianhobbs/kirby-swiper-block');
    echo '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css">' . "\n";
    echo '<link rel="stylesheet" href="' . $plugin->asset('css/swiper-block.css')->url() . '">' . "\n";
    echo '<script src="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js" defer></script>' . "\n";
    echo '<script src="' . $plugin->asset('js/swiper-block.js')->url() . '" defer></script>' . "\n";
}

// Per-slide image params — resolved once; identical for every slide in the block.
$effect           = $block->effectName();
$srcsetName       = $block->srcsetName();
$lqipPreset       = $block->lqipPreset();
$baseThumbOptions = $block->baseThumbOptions();
$imgSizes         = $block->imgSizes();
?>

<div
  class="swiper swiper-block<?= $effect !== 'slide' ? ' swiper-block--' . $effect : '' ?>"
  id="<?= $block->uid() ?>"
  style="<?= $block->aspectStyle() ?>"
  data-swiper-config="<?= htmlspecialchars($block->jsConfig(), ENT_QUOTES, 'UTF-8') ?>"
  aria-roledescription="carousel"
  aria-label="<?= $slides->count() ?> slides"
>

  <?php if ($block->showNav()) : ?>
  <button class="swiper-button-prev" aria-label="Previous slide"></button>
  <button class="swiper-button-next" aria-label="Next slide"></button>
  <?php endif ?>

  <?php if ($block->showPagination()) : ?>
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
      <figure class="swiper-slide-media" aria-hidden="true"<?php if ($block->isNative()) : ?> style="aspect-ratio:<?= $imageField->width() ?>/<?= $imageField->height() ?>"<?php endif ?>>

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
