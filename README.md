![Packagist Version](https://img.shields.io/packagist/v/ianhobbs/kirby-swiper-block)
![Kirby 5](https://img.shields.io/badge/Kirby-5-black)
![License MIT](https://img.shields.io/badge/license-MIT-green)

# Kirby Swiper Block

A Kirby CMS layout block plugin that renders a full-featured [Swiper 12](https://swiperjs.com/) slider with a Panel editor, responsive WebP images, lazy loading, and LQIP blur-up placeholders.

Swiper is loaded via CDN — no npm or build step required to use the plugin. No site config required either: images are handled entirely by the plugin.

**Requires:** Kirby 5 · PHP 8.3+

This release line is pinned to Kirby 5. Composer will refuse to install it alongside Kirby 6 —
K6 moves the Panel to Vue 3 and will be supported by a separate `v2.x` line.

---

## Installation

### Via Composer (recommended)

```bash
composer require ianhobbs/kirby-swiper-block
```

This installs to `site/plugins/kirby-swiper-block/` — not `vendor/` — via
[`getkirby/composer-installer`](https://github.com/getkirby/composer-installer), so Kirby
auto-loads it.

### Manual

Clone into your site's `site/plugins/` directory:

```bash
git clone https://github.com/ianhobbs/swiper-block site/plugins/kirby-swiper-block
```

---

## Zero-config setup

No template changes needed. When a page contains a Swiper block, the snippet automatically injects the Swiper CDN scripts and plugin CSS **once per page load** using a static flag. Everything is self-contained.

If you prefer to control asset placement (e.g. move them to `<head>` for performance), see [Manual asset loading](#manual-asset-loading) below.

---

## Usage in the Panel

Add the `swiper` block type to any blocks or layout field in your blueprint:

```yaml
fields:
  content:
    type: blocks
    fieldsets:
      - swiper
```

The block editor opens with **5 tabs** covering all configuration options:

### Tab 1 — Slides (per-slide settings)

| Field | Description |
|---|---|
| Image | Single image — min. 1920 px wide recommended. JPG, PNG or WebP |
| Heading | Slide title |
| Subtext / Caption | Optional body text |
| CTA Link + Label | Optional call-to-action button |
| Content Position | Left / Centre / Right |

Uploads use the plugin's `swiper-image` file blueprint, which adds an **Alt text** field. Alt text falls back to the slide heading when left empty.

### Tab 2 — Layout

| Field | Default | Description |
|---|---|---|
| Slider Height | 0 (auto) | Explicit container height — `0` means each slide keeps its image's own ratio. See [Slider height & avoiding collapse](#slider-height--avoiding-collapse) |
| Height Unit | px | Unit for Slider Height — px / vh / svh |
| Slide Direction | Horizontal | Scroll direction — Horizontal or Vertical |
| Slides Visible | 1 | 1 / 2 / 3 / 4 / Auto (by width) |
| Advance Per Click | 1 | Slides to jump per navigation action |
| Gap Between Slides | 0 px | Spacing between slides |
| Centre Active Slide | Off | Keeps the active slide centred |
| Starting Slide | 0 | Zero-based index of the first visible slide |

### Tab 3 — Animation

| Field | Default | Description |
|---|---|---|
| Transition Effect | Slide | Slide / Fade / Creative (zoom) / Coverflow |
| Transition Speed | 600 ms | 100–3000 ms |
| Loop | On | Infinite loop |
| Autoplay | Off | Auto-advances slides |
| Autoplay Delay | 4000 ms | Delay between slides (when Autoplay is On) |
| Pause on Hover | On | Pauses autoplay on mouse enter (when Autoplay is On) |
| Free Mode | Off | Slides move freely without snapping |
| Free Mode Momentum | On | Momentum-based deceleration (when Free Mode is On) |

Fade and Creative effects require **Slides Visible = 1**.

### Tab 4 — Controls

| Field | Default | Description |
|---|---|---|
| Arrow Buttons | Visible | Previous / Next navigation arrows |
| Pagination | Visible | Pagination indicator |
| Pagination Style | Bullets | Bullets / Fraction (2/5) / Progress Bar |
| Dynamic Bullets | On | Active bullet enlarges relative to neighbours |
| Keyboard Navigation | On | Arrow keys navigate slides when in viewport |
| Mousewheel Control | Off | Scroll wheel advances slides |

### Tab 5 — Touch & Input

| Field | Default | Description |
|---|---|---|
| Grab Cursor | On | Shows a hand cursor when dragging on desktop |
| Touch on Desktop | On | Allows mouse drag to simulate touch |
| Swipe Threshold | 5 px | Minimum drag distance to register a swipe |
| Long Swipes | On | Long swipe gestures advance the slider |
| Edge Resistance | On | Drag resistance at the first and last slide |

---

## How images are handled

**No `thumbs` configuration is required.** Earlier versions asked you to copy named
`thumbs.presets` / `thumbs.srcsets` into `site/config/config.php`. That is no longer the
case — the block builds every thumb inline, so it works on a stock Kirby install.

Images are **never cropped**. Each slide keeps its source image's own aspect ratio: the
snippet reads the image's real dimensions and sets them as an inline `aspect-ratio` on the
slide's `<figure>`, so a portrait and a landscape image can sit in the same slider without
either being re-framed.

What the block generates per slide, all **WebP**:

| Purpose | Output |
|---|---|
| `srcset` | Width-only variants at 640 / 900 / 1400 / 1920 px (quality 80–85) |
| `<img src>` fallback | Uncropped 1920 px (quality 85) |
| LQIP placeholder | 48 px wide, blurred, quality 30 |

Further behaviour worth knowing:

- The `sizes` attribute is computed per block from **Slides Visible** (`slidesPerView`) and
  **Gap Between Slides** (`spaceBetween`), so the browser downloads an image matched to the
  slot it actually fills — not the whole viewport. A single full-width slide stays `100vw`;
  3-per-view becomes `calc((100vw − gaps) / 3)`; `auto` assumes 3 across, a safe floor of at
  least three images per page width.
- The sharp image is `object-fit: contain`, so it is shown in full. The blurred LQIP sits
  behind it as an `object-fit: cover` backdrop, so any letterbox area reads as intentional
  rather than as empty bars.
- The first slide loads with `loading="eager"` / `decoding="sync"`; every later slide is
  `lazy` / `async`.

Thumbs are generated on demand by Kirby's media manager and cached under `/media`.

---

## Manual asset loading

By default the snippet injects Swiper's CDN links at the point the block is rendered in the page body. For performance-sensitive sites you may want to place them in `<head>` instead. Add this to your head snippet:

```php
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css">
<link rel="stylesheet" href="<?= $kirby->plugin('ianhobbs/kirby-swiper-block')->asset('css/swiper-block.css')->url() ?>">
```

And before `</body>`:

```php
<script src="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js" defer></script>
<script src="<?= $kirby->plugin('ianhobbs/kirby-swiper-block')->asset('js/swiper-block.js')->url() ?>" defer></script>
```

Then suppress auto-injection in `site/config/config.php`:

```php
return [
    'ianhobbs.kirby-swiper-block.injectAssets' => false,
];
```

---

## Slider height & avoiding collapse

Swiper containers have **no intrinsic height** — a slider whose slides have nothing to give
them height collapses to zero. The block handles that in two ways, both applied automatically
to the `.swiper-block` parent `<div>` via an inline CSS custom property (no template or
layout-class changes required):

- **Auto** (`Slider Height = 0`, the default) — each slide's height comes from its **image**,
  at the image's own aspect ratio. Because this is image-driven, a **text-only or empty slide
  has no height and collapses.**
- **Slider Height** — sets an **explicit height on the container** (in `px`, `vh`, or `svh`),
  decoupled from the images. Use it for text-only slides, mixed-content sliders, or
  fixed-height heroes. When set, the media fills the slide box and the caption overlays it.

> You don't need to add custom classes to your layout field to give the slider a height — set
> **Slider Height** in the Layout tab instead. The plugin's CSS reads the value from the parent
> `.swiper-block` element, so per-block height control lives entirely in the Panel.

---

## For plugin developers

The repo root is the plugin only. The whole development environment — Kirby install and Pest
suite — lives in `dev/`, so the plugin's own `composer.json` carries no dev dependencies or
scripts:

```bash
cd dev
composer install     # Kirby + Pest, into dev/
composer test        # 53 tests
```

See [DEVELOPMENT.md](DEVELOPMENT.md) for the full guide, including how to add an optional
visual test site inside `dev/`.

Node is only required if you are modifying the **Panel editor** component
(`src/SwiperBlock.vue`). The frontend JS (`assets/js/swiper-block.js`) is plain hand-authored
JavaScript — no build step needed.

### Panel build

```bash
npm install
npm run build      # compiles src/ → index.js + index.css (plugin root)
npm run dev        # kirbyup dev server with hot reload
```

The bundle is built with [kirbyup](https://github.com/johannschopplich/kirbyup), Kirby's official Panel plugin bundler — it compiles against the Panel's own Vue 2.7 runtime, and Kirby auto-loads `index.js` / `index.css` from the plugin root.

### Deployment

Commit the compiled Panel output alongside your source changes:

```bash
git add index.js index.css assets/
git commit -m "Build: update panel and assets"
```

Kirby will never see `.vue` files on the live server — only the pre-compiled `index.js`.
Development material (`dev/`, `src/`, npm config) is stripped from the released package via
`.gitattributes` `export-ignore`, so `composer require` pulls only the runtime files.

---

## License

MIT © [Ian Hobbs](https://ianhobbsmedia.com.au)
