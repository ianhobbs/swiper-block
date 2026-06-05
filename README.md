# Kirby Swiper Block

A Kirby CMS layout block plugin that renders a full-featured [Swiper 12](https://swiperjs.com/) slider with a Panel editor, responsive image cropping, lazy loading, and LQIP blur-up placeholders.

**Requires:** Kirby 4 or 5 · PHP 8.1+ · Node 18+

---

## Installation

### Via Composer (recommended)

```bash
composer require ianhobbsmedia/swiper-block
```

### Manual

1. Download or clone this repository into your site's `site/plugins/` directory:

```bash
git clone https://github.com/ianhobbsmedia/kirby-swiper-block site/plugins/swiper-block
```

2. Build the frontend and Panel assets (see [Build assets](#build-assets) below).

---

## Build assets

Install dependencies and build both the Panel Vue component and the frontend bundle:

```bash
npm install
npm run build
```

This produces:
- `panel/index.js` — Panel block editor component
- `assets/js/swiper-block.js` — Frontend ESM bundle (Swiper + init logic)
- `assets/css/swiper-block.css` — Swiper styles + block styles

During development, run both watchers in parallel:

```bash
npm run dev
```

---

## Frontend assets

Add the built CSS and JS to your site templates. In `site/snippets/footer.php` (or wherever you load assets):

```php
<link rel="stylesheet" href="<?= $kirby->url('assets') ?>/css/swiper-block.css">
<script type="module" src="<?= $kirby->url('assets') ?>/js/swiper-block.js"></script>
```

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

MIT © [Ian Hobbs](https://ianhobbsmedia.com)
