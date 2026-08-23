![Packagist Version](https://img.shields.io/packagist/v/ianhobbs/kirby-swiper-block)
![Kirby 5](https://img.shields.io/badge/Kirby-5-black)
![License MIT](https://img.shields.io/badge/license-MIT-green)

# Kirby Swiper Block

A [Kirby CMS](https://getkirby.com). layout block plugin that renders a full-featured [Swiper 14](https://swiperjs.com/) carousel with a Panel editor, responsive WebP images, lazy loading, and LQIP blur-up placeholders.

Swiper ships pre-bundled with the plugin — no CDN, no npm, and no build step required to use it. No site config required either: images are handled entirely by the plugin.

**Requires:** Kirby 5 · PHP 8.3+

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

No template changes needed. When a page contains a Swiper block, the snippet automatically injects Swiper and the plugin CSS **once per page load** — the first block to render claims the injection, so a page with several Swiper blocks down it still loads Swiper once. Everything is self-contained.

The whole frontend is **two same-origin files** — `assets/dist/swiper-block.css` and `assets/dist/swiper-block.js` — each bundling Swiper 14.1.0 (MIT) with the block's own code. No CDN dependency, and **nothing to allow in a Content-Security-Policy**. See [Content-Security-Policy](#content-security-policy).

Only the Swiper modules the block can actually use are compiled in; the rest (cube/flip/cards effects, thumbs, zoom, parallax, scrollbar, grid, virtual, hash and history navigation) are dropped at build time — roughly a quarter off both the JavaScript and the CSS, gzipped.

### Browser support

Swiper 14 targets the last couple of years of evergreen browsers: **Chrome/Edge 110+,
Safari 16.4+ (iOS 16.4+), Firefox 110+**. Sites that still need older browsers should stay on
kirby-swiper-block **1.4.x**, which bundles Swiper 12.

If you prefer to control asset placement (e.g. move them to `<head>` for performance), see [Manual asset loading](#manual-asset-loading) below.

---

## Usage in the Panel

Add the `swiper` block type to any blocks or layout field in your blueprint:

```yaml
fields:
  content:
    type: layout
    fieldsets:
      - swiper
```

> **One Swiper block per layout row.** Several **down** a page are fine and fully
> independent; two in the *same* row are not — the second is skipped. See
> [Using the block in a layout field](#using-the-block-in-a-layout-field).

The block editor opens with **5 tabs** covering all configuration options:

### Tab 1 — Slides (per-slide settings)

| Field | Description |
|---|---|
| Image | Single image — min. 1920 px wide recommended. JPG, PNG or WebP |
| Caption Heading | Slide title |
| Subtext / Caption | Optional body text |
| CTA Link + Label | Optional call-to-action button |
| Content Position | Left / Centre / Right |
| Vertical Position | Top / Middle / Bottom — see [Caption colour, placement & type](#caption-colour-placement--type) |
| Caption Colour | Colour picker (with alpha) for this slide's heading, subtext and CTA. Empty inherits the page |

Uploads use the plugin's `swiper-image` file blueprint, which adds an **Alt text** field. Alt text falls back to the slide heading when left empty.

### Tab 2 — Layout

| Field | Default | Description |
|---|---|---|
| Column Width | Auto | How much of the layout row the block fills. Auto reads the real column. See [Column-aware image sizes](#column-aware-image-sizes) |
| Fixed Height | 0 (auto) | Explicit container height — `0` means each slide keeps its image's own ratio. See [Fixed height & avoiding collapse](#fixed-height--avoiding-collapse) |
| Height Unit | px | Unit for Fixed Height — px / vh / svh |
| Separate Mobile Height | Off | Reveals the mobile height field. Shown only when Height Unit is `px` |
| Mobile Fixed Height | 0 | Height in px below 768px viewport width. `0` falls back to Fixed Height |
| Slide Direction | Horizontal | Scroll direction — Horizontal or Vertical |
| Slides Visible | 1 | 1 / 2 / 3 / 4 / Auto (by width) |
| Advance Per Click | 1 | Slides to jump per navigation action |
| Gap Between Slides | 0 px | Spacing between slides |
| Centre Active Slide | Off | Keeps the active slide centred |
| Starting Slide | 0 | Zero-based index of the first visible slide |
| Caption Font | `font-sans` | Font family for the whole caption — a Tailwind class name. See [Caption colour, placement & type](#caption-colour-placement--type) |
| Heading Size | `text-sm` | Caption heading size, shared by every slide — a Tailwind class name |
| Subtext Size | `text-lg` | Caption subtext size, shared by every slide |

### Tab 3 — Animation

| Field | Default | Description |
|---|---|---|
| Transition Effect | Slide | Slide / Fade / Creative (zoom) / Coverflow |
| Transition Speed | 600 ms | 100–3000 ms |
| Easing | Smooth | Shape of the slide transition — Smooth / Gentle / Swiper default / Linear |
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
| Long Swipes | On | Long swipe gestures advance slides |
| Edge Resistance | On | Drag resistance at the first and last slide |

---

## How images are handled

**No `thumbs` configuration is required.** Earlier versions asked you to copy named
`thumbs.presets` / `thumbs.srcsets` into `site/config/config.php`. That is no longer the
case — the block builds every thumb inline, so it works on a stock Kirby install.

In **auto** height mode images are **never cropped**. Each slide keeps its source image's own
aspect ratio: the snippet reads the image's real dimensions and sets them as an inline
`aspect-ratio` on the slide's `<figure>`, so a portrait and a landscape image can sit in the
same block without either being re-framed. Set a **Fixed Height** (or a custom fixed image
height) and the box stops following the image — the image then fills that box and is
centre-cropped on whichever axis overflows.

What the block generates per slide, all **WebP**:

| Purpose | Output |
|---|---|
| `srcset` | Width-only variants at 640 / 900 / 1400 / 1920 px (quality 80–85) |
| `<img src>` fallback | Uncropped 1920 px (quality 85) |
| LQIP placeholder | 48 px wide, blurred, quality 30 |

Further behaviour worth knowing:

- The `sizes` attribute is computed per block from the **layout column** the block sits in,
  plus **Slides Visible** (`slidesPerView`) and **Gap Between Slides** (`spaceBetween`), so the
  browser downloads an image matched to the slot it actually fills — not the whole viewport.
  See [Column-aware image sizes](#column-aware-image-sizes).
- The sharp image is `object-fit: cover`, so it always fills the slide box — full width and
  the full designated height — with no letterbox bars; the overflowing axis is centre-cropped.
  The blurred LQIP sits behind it, also `object-fit: cover`, so the placeholder and the final
  image are framed identically through the fade-in.
- The first slide loads with `loading="eager"` / `decoding="sync"`; every later slide is
  `lazy` / `async`.

Thumbs are generated on demand by Kirby's media manager and cached under `/media`.

---

## Using the block in a layout field

The block's normal home is a **layout field**, in a column of some fraction width. Two things
follow from that.

### One Swiper block per layout row

**Only the first Swiper block in a layout row renders.** A second one in the same row — in
another column, or stacked in the same column — is skipped, leaving an HTML comment in its
place. With `debug` on it also renders a visible note on the page, so the block doesn't just
silently vanish while you're building.

Side-by-side blocks compete for the same drag and keyboard gestures, and each ends up in a
column too narrow to show its imagery. Put each one in **a row of its own**; as many rows
down a page as you like, all fully independent.

### Column-aware image sizes

The `sizes` hint tells the browser how wide the image will actually be, so a block in a
one-third column doesn't download a full-viewport image. The block finds its own layout column
and sizes accordingly:

| Column | Slides Visible | `sizes` |
| --- | --- | --- |
| Full row | 1 | `100vw` |
| Full row | 3, 16 px gap | `calc((100vw - 32px) / 3)` |
| 1/2 | 1 | `(max-width: 768px) 100vw, 50vw` |
| 1/3 | 2 | `(max-width: 768px) calc(100vw / 2), calc(33.3333vw / 2)` |

Part-width columns emit **two candidates**, because layout rows stack on small screens: the
full-width size below the breakpoint, the column fraction above it. The breakpoint defaults to
`768px` — set it to whatever your layout CSS actually uses:

```php
return [
    'ianhobbs.kirby-swiper-block.stackBreakpoint' => '60rem',
];
```

**Column Width** (Layout tab) overrides the detection. Leave it on **Auto** unless the block
sits inside a wrapper of your own that is narrower than its column — Auto can only see the
column, not your CSS. It affects the `sizes` hint only, never the rendered width: the block is
always `width: 100%` of whatever contains it.

Outside a layout field — in a plain `blocks` field, say — there is no column to detect and the
block assumes a full-width row.

---

## Caption colour, placement & type

**Colour is per slide, type is per block.** Each slide sits over a different image and needs
its own text colour; the type scale should stay consistent down the block, so it is set once.

- **Caption Colour** (Slides tab) — a Panel colour picker with alpha. The value is written as
  an inline `color` on the caption wrapper, and the heading, subtext and CTA all inherit it.
  Left empty, nothing is emitted and the caption inherits your page's text colour. Only hex
  and `rgb()` / `hsl()` values are accepted; anything else in the content file is dropped.
- The caption area carries **`1rem` of padding** (border-box), so text never sits flush against
  the slide edge and the padding stays inside whatever layout column the block is dropped into.
- **Content Position** + **Vertical Position** (Slides tab) — horizontal and vertical placement,
  giving nine zones. Vertical placement only bites when the caption has room to move inside —
  i.e. when **Fixed Height** is set and the caption overlays the media. In auto height the
  caption sits below the image in normal flow, so Top / Middle / Bottom look the same.

### Font sizes and families are Tailwind class names

**Heading Size** and **Subtext Size** (Layout tab) emit the Tailwind utility of the same name
onto the element, and **Caption Font** emits one onto the caption wrapper, so the heading,
subtext and CTA all share a single face:

```html
<div class="swiper-slide-caption swiper-slide-caption--center swiper-slide-caption--middle font-sans">
  <p class="swiper-slide-heading text-sm">…</p>
  <p class="swiper-slide-subtext text-lg">…</p>
</div>
```

On a Tailwind site those classes are already yours — Tailwind styles them, and the plugin
stays out of the way. 
If you are not using TW **Tailwind is not required.** `swiper-block.css` ships a fallback table
covering the same scale at Tailwind's own values:

```css
:where(.swiper-slide-caption .text-sm) { font-size: 0.875rem; line-height: 1.25rem; }

```

The `:where()` wrapper gives those rules **zero specificity**, so a real Tailwind utility — or
any rule of your own targeting `.swiper-slide-heading` — always wins, whatever order the
stylesheets load in. The fallback only applies when nothing else has an opinion.

#### Overriding the caption fonts

The four font classes resolve a custom property before falling back to a stock stack, so you
can point them at your own faces without writing a selector or fighting specificity:

```css
:root {
  --swiper-block-font-sans:  "Your Sans Face", system-ui, sans-serif;
  --swiper-block-font-body:  "Your Body Face", Georgia, serif;
  --swiper-block-font-serif: "Your Serif", Georgia, serif;
  --swiper-block-font-mono:  "Your Mono", ui-monospace, monospace;
}
```

`font-body` has no Tailwind stock definition — it is the conventional name for a theme's body
face. Its fallback is `inherit`, so a site that defines neither the utility nor the custom
property simply keeps the page's own font.

If you use Tailwind with a content scan, the class names come from this plugin's PHP rather
than your own templates, so add the plugin to your `content` / `@source` paths (or safelist
`text-xs` through `text-3xl` plus `font-sans` / `font-body` / `font-serif` / `font-mono`) to
stop them being purged.

---

## Manual asset loading

By default the snippet injects the asset tags at the point the block is rendered in the page body. For performance-sensitive sites you may want to place them in `<head>` instead. Add this to your head snippet:

```php
<link rel="stylesheet" href="<?= $kirby->plugin('ianhobbs/kirby-swiper-block')->asset('dist/swiper-block.css')->url() ?>">
```

And before `</body>`:

```php
<script src="<?= $kirby->plugin('ianhobbs/kirby-swiper-block')->asset('dist/swiper-block.js')->url() ?>" defer></script>
```

Then suppress auto-injection in `site/config/config.php`:

```php
return [
    'ianhobbs.kirby-swiper-block.injectAssets' => false,
];
```

### Easing

Swiper has **no JavaScript easing option** — the slide transition is an ordinary CSS
transition on `.swiper-wrapper`, and Swiper 14 exposes a custom property for its timing
function. The **Easing** field sets that property on the block, which cascades down:

| Option | Timing function | |
|---|---|---|
| Smooth | `cubic-bezier(0.22, 1, 0.36, 1)` | Default. Decelerates hard into place |
| Gentle | `cubic-bezier(0.65, 0, 0.35, 1)` | Symmetric ease-in-out |
| Swiper default | *(none emitted)* | Swiper's own `ease` — stops more abruptly |
| Linear | `linear` | Constant speed |

Easing shapes the motion; **Transition Speed** sets its duration. If a slide still feels
abrupt on Smooth, raise the speed — the curve can only distribute the time it's given.

To use a curve that isn't offered, override the property yourself — it's Swiper's own, so
nothing in this plugin needs to know:

```css
.swiper-block {
  --swiper-wrapper-transition-timing-function: cubic-bezier(0.87, 0, 0.13, 1);
}
```

---

## Content-Security-Policy

The plugin is designed to pass a strict CSP with **no extra hosts and no policy changes**.
Both files it loads — Swiper included, since it's compiled in — come from `/media/plugins/`,
which `'self'` already covers.

Two details are worth knowing if you use a strict-CSP plugin such as
[`akibeo/kirby-csp`](https://github.com/wdebusschere/kirby-csp), whose defaults are:

```
script-src 'self' 'nonce-{nonce}' 'strict-dynamic' https: 'unsafe-inline'
style-src  'self' 'unsafe-inline'
```

**Scripts get a nonce.** When `cspNonce()` exists, the injected `<script>` tags carry
`nonce="…"` automatically. This is required even though the files are same-origin:
`'strict-dynamic'` tells the browser to ignore host expressions *including* `'self'`, so a
nonce is the only thing that trusts a script under that policy. Sites without a CSP plugin
get no nonce attribute and are unaffected.

**Stylesheets can't use one.** There is no nonce or `'strict-dynamic'` in `style-src`, so an
off-origin stylesheet has nothing to fall back on — which is why loading Swiper's CSS from a
CDN reported violations, and why it is bundled locally now. Inline `style` attributes (the
block emits a few, carrying its height and caption colour) are covered by the
`'unsafe-inline'` that policy already includes.

---

## Fixed height & avoiding collapse

Swiper containers have **no intrinsic height** — a block whose slides have nothing to give
them height collapses to zero. The block handles that in two ways, both applied automatically
to the `.swiper-block` parent `<div>` via an inline CSS custom property (no template or
layout-class changes required):

- **Auto** (`Fixed Height = 0`, the default) — each slide's height comes from its **image**,
  at the image's own aspect ratio. Because this is image-driven, a **text-only or empty slide
  has no height and collapses.**
- **Fixed Height** — sets an **explicit height on the container** (in `px`, `vh`, or `svh`),
  decoupled from the images. Use it for text-only slides, mixed-content blocks, or
  fixed-height heroes. When set, the media fills the slide box and the caption overlays it.

> You don't need to add custom classes to your layout field to give the block a height — set
> **Fixed Height** in the Layout tab instead. The plugin's CSS reads the value from the parent
> `.swiper-block` element, so per-block height control lives entirely in the Panel.

### A different height on phones

A pixel height chosen for a desktop hero is usually far too tall on a phone. Switch
**Separate Mobile Height** on and set **Mobile Fixed Height**; below `768px` the block uses
that instead.

Both fields appear only when **Height Unit** is `px` — `vh` and `svh` already track the
viewport, so an override would just fight them. The toggle exists because Kirby's `when:`
conditions match a field's *value*, not whether it has one, so revealing the number field
needs an explicit trigger. All three must hold (px unit, toggle on, non-zero number) before
anything is emitted.

This is a CSS media query, not a Swiper setting. Swiper's `breakpoints` only accepts layout
parameters — `slidesPerView`, `slidesPerGroup`, `spaceBetween`, `grid.rows` — and its
standalone `height` option is documented as making the instance non-responsive. Nothing runs
on resize to maintain it.

`768px` matches the default `stackBreakpoint`. If you've moved that option, realign the rule
at your own breakpoint — the custom property is readable either way:

```css
@media (max-width: 60rem) {
  .swiper-block[style*="--swiper-block-mobile-height"] {
    height: var(--swiper-block-mobile-height);
  }
}
```

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

This plugin is published as free, open-source software under the MIT License. It is provided "as is", without warranty of any kind, express or implied. You are free to use, copy, modify, merge, publish, and distribute it in personal and commercial projects. If you find it useful in a commercial context, please consider supporting Kirby by purchasing a license at [getkirby.com/buy](https://getkirby.com/buy) — this plugin is not affiliated with or endorsed by the Kirby team.

## Credit 

The final credit should go to the original developer of the source code.
Copyright (c) 2019 Vladimir Kharlampidi - thanks for a well considered slider kit.!!

Ian Hobbs