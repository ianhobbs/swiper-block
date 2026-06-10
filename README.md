![Packagist Version](https://img.shields.io/packagist/v/ianhobbs/kirby-swiper-block)
![Kirby 4+](https://img.shields.io/badge/Kirby-4%2B-black)
![License MIT](https://img.shields.io/badge/license-MIT-green)

# Kirby Swiper Block

A Kirby CMS layout block plugin that renders a full-featured [Swiper 12](https://swiperjs.com/) slider with a Panel editor, responsive image cropping, lazy loading, and LQIP blur-up placeholders.

Swiper is loaded via CDN — no npm or build step required to use the plugin.

**Requires:** Kirby 4 or 5 · PHP 8.1+

---

## Installation 


### Via Composer (recommended)

```bash
composer require ianhobbs/kirby-swiper-block

```

### Manual

Clone into your site's `site/plugins/` directory:

```bash
git clone https://github.com/ianhobbs/swiper-block site/plugins/swiper-block
```

---

## Zero-config setup

No template changes needed. When a page contains a Swiper block, the snippet automatically injects the Swiper CDN scripts and plugin CSS **once per page load** using a static flag. Everything is self-contained.

If you prefer to control asset placement (e.g. move them to `<head>` for performance), add these lines to your layout template and set `SWIPER_ASSETS_LOADED` in your config — see [Manual asset loading](#manual-asset-loading) below.

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
| Image | Single image — min. 1920 × 810 px recommended |
| Heading | Slide title |
| Subtext / Caption | Optional body text |
| CTA Link + Label | Optional call-to-action button |
| Content Position | Left / Centre / Right |

### Tab 2 — Layout

| Field | Default | Description |
|---|---|---|
| Aspect Ratio | 16:9 | 21:9 / 16:9 / 4:3 / 1:1 / Custom height |
| Custom Height | 600 px | Fixed height in px (when Aspect Ratio = Custom) |
| Slide Direction | Horizontal | Scroll direction — Horizontal or Vertical |
| Orientation | Horizontal | Image crop set — Horizontal (16:9 → `swiper-horiz`) or Vertical (9:16 → `swiper-vert`) |
| Slides Visible | 1 | 1 / 2 / 3 / 4 / Auto |
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

## Image presets (required config)

The snippet serves responsive images with Kirby's native `srcset()`, generating
**webp** crops in two orientations. Because Kirby plugins can't register global
`thumbs.presets` / `thumbs.srcsets`, **you must add these to your site's
`site/config/config.php`** — the snippet reads them by name:

```php
return [
    'thumbs' => [
        'presets' => [
            // Blurred LQIP placeholders (blur-up effect)
            'swiper-lqip-horiz' => ['width' => 40, 'height' => 23, 'crop' => true, 'quality' => 30, 'blur' => 4, 'format' => 'webp'],
            'swiper-lqip-vert'  => ['width' => 23, 'height' => 40, 'crop' => true, 'quality' => 30, 'blur' => 4, 'format' => 'webp'],
        ],
        'srcsets' => [
            // Landscape (16:9) — used when Orientation = Horizontal
            'swiper-horiz' => [
                '640w'  => ['width' =>  640, 'height' =>  360, 'crop' => true, 'quality' => 80, 'format' => 'webp'],
                '900w'  => ['width' =>  900, 'height' =>  506, 'crop' => true, 'quality' => 82, 'format' => 'webp'],
                '1400w' => ['width' => 1400, 'height' =>  788, 'crop' => true, 'quality' => 85, 'format' => 'webp'],
                '1920w' => ['width' => 1920, 'height' => 1080, 'crop' => true, 'quality' => 85, 'format' => 'webp'],
            ],
            // Portrait (9:16) — used when Orientation = Vertical
            'swiper-vert' => [
                '480w'  => ['width' =>  480, 'height' =>  854, 'crop' => true, 'quality' => 80, 'format' => 'webp'],
                '640w'  => ['width' =>  640, 'height' => 1138, 'crop' => true, 'quality' => 82, 'format' => 'webp'],
                '810w'  => ['width' =>  810, 'height' => 1440, 'crop' => true, 'quality' => 85, 'format' => 'webp'],
                '1080w' => ['width' => 1080, 'height' => 1920, 'crop' => true, 'quality' => 85, 'format' => 'webp'],
            ],
        ],
    ],
];
```

**How it maps to the Panel:**

- The **Orientation** field (Layout tab) selects which srcset the slide uses —
  `swiper-horiz` (Horizontal) or `swiper-vert` (Vertical), plus the matching
  `swiper-lqip-*` placeholder.
- The largest entry in the chosen srcset doubles as the `<img src>` fallback for
  browsers that don't support `srcset`.
- All crops are **webp** for smaller payloads (the 1920px landscape crop is
  typically ~20% the size of the source JPG).

> The descriptor keys (`640w`, `900w`, …) must be valid srcset width descriptors —
> Kirby uses them verbatim in the generated `srcset` attribute. Keep the names
> `swiper-horiz`, `swiper-vert`, `swiper-lqip-horiz`, `swiper-lqip-vert` exactly,
> since the snippet looks them up by name.

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


## Notes

The slider container height and width needs to be defined. 
So you'll need to add custom classes to your layout field.

Css parent hooks are available.

---

## For plugin developers

Node is only required if you are modifying the **Panel editor** component (`src/SwiperBlock.vue`). The frontend JS (`assets/js/swiper-block.js`) is plain hand-authored JavaScript — no build step needed.

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

---

## License

MIT © [Ian Hobbs](https://ianhobbsmedia.com.au)
