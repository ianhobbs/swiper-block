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
