![Packagist Version](https://img.shields.io/packagist/v/codey/swiper-block)
![Kirby 4+](https://img.shields.io/badge/Kirby-4%2B-black)
![License MIT](https://img.shields.io/badge/license-MIT-green)

# Kirby Swiper Block

A Kirby CMS layout block plugin that renders a full-featured [Swiper 12](https://swiperjs.com/) slider with a Panel editor, responsive image cropping, lazy loading, and LQIP blur-up placeholders.

**Requires:** Kirby 4 or 5 · PHP 8.1+ · Node 18+

---

## Installation

### Via Composer (recommended)

```bash
composer require codey/swiper-block
```

### Manual

1. Download or clone this repository into your site's `site/plugins/` directory:

```bash
git clone https://github.com/ianhobbsmedia/kirby-swiper-block site/plugins/swiper-block
```

2. Build the frontend and Panel assets (see [Build assets](#build-assets) below).

---

## Frontend assets

The pre-built CSS and JS are committed to the repository, so no build step is needed when installing via Composer. Add them to your site templates using Kirby's plugin asset helper. In `site/snippets/footer.php` (or wherever you load assets):

```php
<?php $plugin = $kirby->plugin('ianhobbsmedia/swiper-block') ?>
<link rel="stylesheet" href="<?= $plugin->asset('css/swiper-block.css')->url() ?>">
<script type="module" src="<?= $plugin->asset('js/swiper-block.js')->url() ?>"></script>
```

Kirby serves these automatically from `site/plugins/swiper-block/assets/` — no copying required.

---

## For plugin developers

### Requirements
- Node.js 18+
- npm (included with Node.js)

### Build setup

If you are modifying the plugin source, install Node dependencies and rebuild the assets:

```bash
npm install
npm run build
```

This builds two separate bundles via Vite:

1. **`panel/index.js`** — Pre-compiled Panel editor (from `src/index.js` + `src/SwiperBlock.vue`)
   - IIFE bundle with Vue 3 + all dependencies bundled
   - No `.vue` files on live server (security)
   - Kirby auto-loads this when the plugin is active

2. **`assets/js/swiper-block.js`** — Frontend ESM module (from `frontend/swiper-block.js`)
   - Swiper 12 library injected and bundled
   - Loaded in your site template as `<script type="module">`

3. **CSS outputs** (`panel/style.css`, `assets/css/swiper-block.css`)
   - Panel UI styles + frontend slider styles

### Development workflow

Run both watchers in parallel during development:

```bash
npm run dev
```

This rebuilds `panel/` and `assets/` whenever source files change.

### Deployment

Always commit the pre-built outputs to version control:

```bash
git add panel/index.js panel/style.css assets/
git commit -m "Build: update plugin assets"
```

When deploying, Kirby will never see `.vue` files or source code — only the static compiled bundles.

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

Each slide supports:

| Field | Description |
|---|---|
| Image | Single image (min. 1920 × 810 px recommended) |
| Heading | Slide title |
| Subtext / Caption | Optional body text |
| CTA Link + Label | Optional call-to-action button |
| Overlay Opacity | Dark overlay on the image (0–90%) |
| Content Position | Left / Centre / Right text alignment |

Global slider options:

| Option | Values |
|---|---|
| Transition Effect | Slide, Fade, Creative (zoom) |
| Transition Speed | 100–3000 ms |
| Autoplay | On / Off (configurable delay) |
| Loop | On / Off |
| Arrows | Visible / Hidden |
| Pagination dots | Visible / Hidden |
| Aspect Ratio | 21:9, 16:9, 4:3, 1:1, or custom height |

---

## Image presets

The plugin registers five thumb presets used for responsive image serving:

| Preset | Size | Use |
|---|---|---|
| `swiper-xl` | 1920 × 810 | Full-width hero (≥1400 px viewport) |
| `swiper-lg` | 1400 × 590 | Desktop (≥900 px) |
| `swiper-md` | 900 × 506 | Tablet (≥640 px) |
| `swiper-sm` | 640 × 480 | Mobile fallback |
| `swiper-lqip` | 40 × 17 | Blurred placeholder |

Thumbs are pre-generated on image upload so the first page load never stalls.

---

## License

MIT © [Ian Hobbs](https://ianhobbsmedia.com.au)
