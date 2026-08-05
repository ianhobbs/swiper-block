#!/usr/bin/env bash
#
# Scaffold the local Kirby dev site used for visual testing of the swiper block.
#
# The generated site lives in dev/ and is gitignored — it holds real images and
# Panel accounts, none of which belong in the plugin repo. This script recreates
# it from scratch after a clone. Existing files are never overwritten, so the
# content you add through the Panel survives a re-run.
#
#   composer dev:setup    # scaffold dev/
#   composer dev          # serve it on http://localhost:8000
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEV="$ROOT/dev"

if [ ! -f "$ROOT/kirby/bootstrap.php" ]; then
  echo "Kirby is missing. Run: composer install" >&2
  exit 1
fi

mkdir -p \
  "$DEV/content/1_home" \
  "$DEV/site/blueprints/pages" \
  "$DEV/site/config" \
  "$DEV/site/plugins" \
  "$DEV/site/templates" \
  "$DEV/media"

# The plugin loads the same way it will on a real site: as a directory under
# site/plugins. A symlink keeps a single source of truth — edits to the plugin
# are live in the dev site with no copy step.
if [ ! -e "$DEV/site/plugins/kirby-swiper-block" ]; then
  ln -s ../../.. "$DEV/site/plugins/kirby-swiper-block"
fi

write_if_missing() {
  if [ -e "$1" ]; then
    echo "  skip  ${1#$ROOT/}"
  else
    cat > "$1"
    echo "  new   ${1#$ROOT/}"
  fi
}

write_if_missing "$DEV/index.php" <<'PHP'
<?php

require __DIR__ . '/../kirby/bootstrap.php';

echo (new Kirby([
    'roots' => [
        'index'   => __DIR__,
        'base'    => __DIR__,
        'content' => __DIR__ . '/content',
        'site'    => __DIR__ . '/site',
        'media'   => __DIR__ . '/media',
    ],
]))->render();
PHP

write_if_missing "$DEV/site/config/config.php" <<'PHP'
<?php

return [
    // Lets the Panel installer run at /panel so you can create the first account.
    'debug' => true,

    // Thumbs are regenerated constantly while tweaking the block — don't cache.
    'thumbs' => [
        'srcsets' => [],
    ],
];
PHP

write_if_missing "$DEV/site/blueprints/site.yml" <<'YAML'
title: Swiper Block Dev
sections:
  pages:
    type: pages
    templates:
      - home
  files:
    label: Test images
    type: files
    layout: cards
    info: "{{ file.dimensions }}"
YAML

write_if_missing "$DEV/site/blueprints/pages/home.yml" <<'YAML'
title: Dev Home
options:
  changeSlug: false
  changeStatus: false
  delete: false
sections:
  content:
    type: fields
    fields:
      slider:
        label: Swiper blocks
        type: blocks
        fieldsets:
          - swiper
YAML

write_if_missing "$DEV/site/templates/home.php" <<'PHP'
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Swiper Block — dev</title>
  <style>
    body { margin: 0; font: 16px/1.5 system-ui, sans-serif; }
    .dev-bar { padding: .75rem 1rem; background: #111; color: #fff; font-size: .8rem; }
    .dev-bar a { color: #7db8ff; }
    main { max-width: 1100px; margin: 2rem auto; padding: 0 1rem; }
    main > * + * { margin-top: 3rem; }
  </style>
</head>
<body>
  <div class="dev-bar">
    Swiper block dev site — edit in the <a href="/panel">Panel</a>.
    Assets are injected by the block snippet, exactly as on a real site.
  </div>
  <main>
    <?php if ($page->slider()->isNotEmpty()) : ?>
      <?= $page->slider()->toBlocks() ?>
    <?php else : ?>
      <p>No blocks yet. Add a Swiper block in the <a href="/panel">Panel</a>,
         upload a few images, then reload.</p>
    <?php endif ?>
  </main>
</body>
</html>
PHP

write_if_missing "$DEV/content/1_home/home.txt" <<'TXT'
Title: Dev Home

----

Slider:
TXT

echo
echo "Dev site ready at $DEV"
echo "  composer dev     →  http://localhost:8000  (Panel at /panel)"
