# Development Guide — kirby-swiper-block

## How this repo is laid out

The repo root is **only the plugin** — the files Kirby loads and the files a consumer
downloads. It has no test suite, no dev dependencies and no build scripts in its
`composer.json`.

Everything needed to develop the plugin lives in **`dev/`**: its own Composer project, its own
Kirby install, and the Pest suite. That folder is a normal Kirby project layout (`kirby/`,
`vendor/`, and optionally `site/` and `content/` at its root), so nothing site-shaped leaks
into the plugin.

```text
kirby-swiper-block/
├── index.php  index.js  index.css     ← plugin entry + built Panel bundle
├── assets/  blueprints/  classes/  snippets/
├── src/                              ← Panel Vue source (built into index.js)
├── composer.json                     ← plugin manifest only, no dev tooling
└── dev/                              ← the whole development environment
    ├── composer.json                 ← getkirby/cms + pestphp/pest
    ├── phpunit.xml
    ├── tests/
    ├── kirby/  vendor/               ← generated, gitignored
    └── site/  content/  media/       ← optional visual site, gitignored
```

`dev/` is tracked so the suite is versioned alongside the code it tests, but
`.gitattributes` marks it `export-ignore`, so consumers who `composer require` the plugin
never receive it.

---

## Prerequisites

- PHP ≥ 8.3
- Composer
- Node ≥ 18 — only if you are changing the Panel component (`src/`)

---

## Setup

```bash
git clone https://github.com/ianhobbs/swiper-block.git kirby-swiper-block
cd kirby-swiper-block/dev
composer install
```

That installs Kirby into `dev/kirby/` (Kirby depends on `getkirby/composer-installer`, which
places `type: kirby-cms` packages there) and Pest into `dev/vendor/`.

**The plugin root needs no `composer install`.** Its only dependency is the installer that
consumers use to place the plugin in `site/plugins/`.

## Run the tests

```bash
cd dev
composer test              # 53 tests
composer test:coverage     # requires xdebug or pcov
```

The suite never touches a real Kirby site. `dev/tests/bootstrap.php` loads Kirby from
`dev/kirby/`, registers the plugin by requiring the repo root's `index.php` directly, and
boots Kirby against the fixture roots in `dev/tests/fixtures/`. No symlink, no content, no
Panel account.

### What is tested

| Suite | File | Covers |
|---|---|---|
| Plugin | `tests/Feature/PluginTest.php` | Registration, version, blueprints, snippets, icon; guards against re-adding a `thumbs` extension or a custom field type |
| Blueprint | `tests/Feature/BlueprintTest.php` | YAML validity, tabs, field types, conditional `when:` logic |
| Block model | `tests/Feature/BlockModelTest.php` | `jsConfig`, `imgSizes`, `aspectStyle`, `sliderHeight`, native-mode thumbs, `uid` |
| Snippet | `tests/Feature/SnippetTest.php` | HTML output, aria roles, JS config JSON, slider height, nav/pagination |

### Test helpers

`dev/tests/Pest.php` provides two global helpers:

```php
// Create a block with default swiper content — override any field
$block = makeBlock(['effect' => 'fade', 'loop' => 'true']);

// Render the snippet and return HTML
$html = renderBlock($block);
```

Structure fields (like `slides`) are passed as PHP arrays — `makeBlock()` YAML-encodes them
automatically, matching how Kirby stores content on disk.

Keep the `makeBlock()` defaults in sync with the blueprint. Fields left in there after being
removed from `blueprints/blocks/swiper.yml` will silently keep dead code paths alive and make
tests pass against behaviour that can no longer be reached.

### Notes on `Plugin::version()`

Kirby's `Plugin::version()` reads from the plugin's `composer.json` or Composer's
`installed.json`. We intentionally omit a `"version"` field from `composer.json` (Packagist
reads versions from git tags only), so `Plugin::version()` returns `null` in development.

In production — when someone installs via `composer require ianhobbs/kirby-swiper-block` —
Composer writes the resolved tag version to `installed.json` and the Panel displays it.

Tests assert the version via `$plugin->extends()['version']`, which reads the `'version'` key
set in `index.php`'s `Kirby::plugin()` call.

---

## Optional: a visual test site

The automated suite covers logic and markup. For Panel UI, real images and Swiper behaviour in
a browser, add a site around the Kirby install already in `dev/`. All of it is gitignored, so
your images and Panel account never enter the repo.

**1. Point Kirby at `dev/` as the site root**

```php
<?php // dev/index.php
require __DIR__ . '/kirby/bootstrap.php';

echo (new Kirby([
    'roots' => [
        'index'   => __DIR__,
        'base'    => __DIR__,
        'content' => __DIR__ . '/content',
        'site'    => __DIR__ . '/site',
        'media'   => __DIR__ . '/media',
    ],
]))->render();
```

**2. Symlink the plugin into the site**

```bash
mkdir -p dev/site/plugins
ln -s ../../.. dev/site/plugins/kirby-swiper-block
```

The relative target resolves to the repo root, so the plugin loads exactly the way it will on
a real site — asset injection and media publishing included. (On Windows, symlinks need
Developer Mode or an elevated shell.)

**3. Add a page that renders blocks**

`dev/site/blueprints/pages/home.yml` with a `blocks` field whose `fieldsets` include `swiper`,
a matching `dev/site/templates/home.php` that echoes `$page->yourField()->toBlocks()`, and a
`dev/content/1_home/home.txt`. Set `'debug' => true` in `dev/site/config/config.php` so the
Panel installer will run.

**4. Serve it**

```bash
cd dev
php -S localhost:8000 kirby/router.php
```

Use **Kirby's own `router.php`** — it sets `$_SERVER['SCRIPT_NAME'] = '/index.php'`, which
Kirby needs to parse request paths. A hand-rolled router that omits this serves `/` fine but
404s every `/media/plugins/...` asset URL.

Then open `http://localhost:8000/panel`, create an account and add a Swiper block.

### Visual checklist

- [ ] Swiper Slider block appears in the block picker, with its custom icon
- [ ] The edit drawer opens with all five tabs (Slides, Layout, Animation, Controls, Touch & Input)
- [ ] A slide with image, heading, subtext and CTA saves and renders
- [ ] Collapsed block preview shows slide count, height and effect
- [ ] Navigation arrows and pagination appear when enabled
- [ ] Autoplay, loop and effect settings behave as configured
- [ ] Slides keep their source aspect ratio; setting Slider Height overrides it
- [ ] Text-only slides do not collapse when Slider Height is set

---

## Panel asset build

The Panel Vue component is pre-built and committed to `index.js` and `index.css` in the plugin
root — the only locations Kirby auto-loads Panel assets from. End users do not need Node.

```bash
npm install
npm run build      # index.js + index.css (plugin root)
npm run dev        # kirbyup dev server, hot-reloads on src/ changes
```

Built with [kirbyup](https://github.com/johannschopplich/kirbyup), the official Kirby Panel
plugin bundler. It compiles SFCs against the Panel's bundled Vue 2.7 runtime (instead of
shipping a second copy of Vue) and strips `process.env` references that would crash in the
browser.

When you remove a field from the blueprint, check `src/SwiperBlock.vue` for computed properties
still reading it — the Panel preview fails silently, falling back to a default that no longer
matches what the frontend renders.

---

## Release checklist

1. Update `'version' => 'x.y.z'` in `index.php` and `"version"` in `package.json`
2. `cd dev && composer test` — all tests must pass
3. `npm run build` if `src/` changed, and commit `index.js` / `index.css`
4. Check the README still matches the blueprint — fields removed from
   `blueprints/blocks/swiper.yml` have to leave the docs too
5. Commit everything, **then** tag — the tag must contain the version bump:

   ```bash
   git tag -a vx.y.z -m "vx.y.z — summary"
   git push origin main --follow-tags
   ```

6. Verify the tag is what you think it is:

   ```bash
   git show vx.y.z:index.php | grep version
   git archive --format=tar vx.y.z | tar -t     # no dev/, no src/
   ```

Packagist picks up the new tag automatically. Do **not** add a `"version"` field to
`composer.json` — Packagist reads versions from git tags only.

> Tagging before the version bump is committed produces a release whose `index.php` reports the
> *previous* version. A published tag can't be moved safely once Packagist has cached it — cut
> a new patch release instead of re-pointing it.
