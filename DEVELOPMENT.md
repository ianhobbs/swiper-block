# Development Guide — kirby-swiper-block

## Overview

Development is split into two tiers with different requirements. Most work happens in **Tier 1** without needing a running Kirby site at all.

| Tier | What it covers | Requires |
|---|---|---|
| 1 — Logic tests | Snippet output, blueprint structure, plugin registration, JS config | PHP + Composer only |
| 2 — Visual tests | Panel UI, block editor, Swiper rendering in a browser | Full Kirby site + symlink |

---

## Prerequisites

- PHP ≥ 8.3
- Composer
- Node ≥ 18 (Panel asset builds only)

---

## Tier 1 — Logic tests (standalone)

No Kirby site required. The test suite boots its own minimal Kirby instance from `tests/bootstrap.php`.

### Setup

```bash
git clone https://github.com/ianhobbs/swiper-block.git kirby-swiper-block
cd kirby-swiper-block
composer install
```

### Run tests

```bash
composer test              # run all 46 tests
composer test:watch        # re-run on file change (requires pest/watch)
composer test:coverage     # generate coverage report
```

### What is tested

| Suite | File | Covers |
|---|---|---|
| Plugin | `tests/Feature/PluginTest.php` | Registration, version, blueprints, snippets, icon, hook, thumb presets |
| Blueprint | `tests/Feature/BlueprintTest.php` | YAML validity, tabs, field types, conditional `when:` logic |
| Snippet | `tests/Feature/SnippetTest.php` | HTML output, aria roles, JS config JSON, aspect ratio, nav/pagination |

### Test helpers

`tests/Pest.php` provides two global helpers:

```php
// Create a block with default swiper content — override any field
$block = makeBlock(['effect' => 'fade', 'loop' => 'true']);

// Render the snippet and return HTML
$html = renderBlock($block);
```

Structure fields (like `slides`) must be passed as PHP arrays — `makeBlock()` YAML-encodes them automatically, matching how Kirby stores content on disk.

### Notes on `Plugin::version()`

Kirby's `Plugin::version()` reads from the plugin's `composer.json` or Composer's `installed.json`. Since we intentionally omit a `"version"` field from `composer.json` (Packagist reads versions from git tags only), `Plugin::version()` returns `null` in development.

In production — when someone installs via `composer require ianhobbs/swiper-block` — Composer writes the resolved tag version to `installed.json` and the Panel displays it correctly.

Tests assert the version via `$plugin->extends()['version']`, which reads the `'version'` key set in `index.php`'s `Kirby::plugin()` call.

---

## Tier 2 — Visual tests (host Kirby site required)

Required for: Panel block editor UI, Vue component preview, Swiper frontend rendering, file upload hook, and `kirby-mcp` runtime tools.

### What you need

- A Kirby 5 site with `bnomei/kirby-mcp` installed as a dev dependency
- The plugin symlinked into that site's `site/plugins/` directory
- The site's dev server running

### Setup

**1. Clone the plugin**

```bash
git clone https://github.com/ianhobbs/swiper-block.git kirby-swiper-block
cd kirby-swiper-block
composer install
```

**2. Symlink the plugin into your Kirby site**

```bash
ln -s /path/to/kirby-swiper-block \
      /path/to/kirby-site/site/plugins/kirby-swiper-block
```

> The symlink bypasses Kirby's auto-discovery of `blueprints/` and `snippets/`. Both are registered explicitly in `index.php` using `__DIR__` paths, so they resolve correctly regardless of where the plugin physically lives.

**3. Install `kirby-mcp` in your Kirby site**

```bash
cd /path/to/kirby-site
composer require --dev bnomei/kirby-mcp
```

`kirby-mcp` belongs in the **host site**, not in this plugin's `composer.json`. It is a development tool for the site, not a dependency of the plugin.

**4. Start the dev server**

```bash
cd /path/to/kirby-site
composer start
# → PHP built-in server at http://localhost:8000
```

**5. Build the Panel bundle** (after any changes to `src/`)

```bash
cd /path/to/kirby-swiper-block
npm install
npm run build       # one-off build → index.js + index.css (plugin root)
npm run dev         # kirbyup dev server — hot-reloads on save
```

### Visual test checklist

Once the server is running, open `http://localhost:8000/panel` and verify:

- [ ] Swiper Slider block appears in the block picker
- [ ] Block shows the custom icon
- [ ] Clicking the block opens the edit drawer with all five tabs (Slides, Layout, Animation, Controls, Touch & Input)
- [ ] Adding a slide with an image, heading, subtext and CTA saves correctly
- [ ] The frontend page renders the slider with correct HTML structure
- [ ] Navigation arrows and pagination appear when enabled
- [ ] Autoplay, loop and effect settings behave as configured
- [ ] Uploading an image pre-generates all five thumb presets (`swiper-xl` through `swiper-lqip`)

### kirby-mcp runtime tools

With `kirby-mcp` installed in the host site you can use MCP tools to inspect and debug at runtime:

```
kirby_render_page    — render a page and capture HTML output
kirby_blueprint_read — confirm blocks/swiper blueprint is resolved correctly
kirby_plugins_index  — verify the plugin loads and its extensions are registered
mcp_dump()           — instrument templates/snippets for runtime inspection
```

---

## Panel asset build

The Panel Vue component is pre-built and committed to `index.js` and `index.css` in the plugin root — the only locations Kirby auto-loads Panel assets from. End users do not need Node.

| Command | Output |
|---|---|
| `npm run build` | `index.js`, `index.css` (plugin root) |
| `npm run dev` | kirbyup dev server — hot-reloads on `src/` changes |

The bundle is built with [kirbyup](https://github.com/johannschopplich/kirbyup), the official Kirby Panel plugin bundler. It compiles SFCs against the Panel's bundled Vue 2.7 runtime (instead of shipping a second copy of Vue) and strips `process.env` references that would crash in the browser.

---

## Release checklist

1. Update `'version' => 'x.x.x'` in `index.php`
2. Update `"version": "x.x.x"` in `package.json`
3. Run `composer test` — all tests must pass
4. Build Panel assets: `npm run build`
5. Commit all changes
6. Tag: `git tag vx.x.x && git push origin main --tags`

Packagist picks up the new tag automatically. Do **not** add a `"version"` field to `composer.json` — Packagist reads versions from git tags only.
