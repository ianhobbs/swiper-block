<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Swiper Block — dev</title>
  <style>
    /* The host site owns layout CSS — the plugin ships none. This is a minimal
       stand-in for a real site's 12-column grid, enough to see the block behave
       at each column width. Rows stack below 768px, matching the plugin's
       default `stackBreakpoint` (the `sizes` hint assumes they do). */
    body { margin: 0; font: 16px/1.5 system-ui, sans-serif; }
    .dev-bar { padding: .75rem 1rem; background: #111; color: #fff; font-size: .8rem; }
    .dev-bar a { color: #7db8ff; }
    main { max-width: 1100px; margin: 2rem auto; padding: 0 1rem; }
    main > * + * { margin-top: 3rem; }

    .layout {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 1.5rem;
    }
    .layout__column { grid-column: span var(--span, 12); min-width: 0; }

    @media (max-width: 768px) {
      .layout__column { grid-column: span 12; }
    }

    /* The themes from the layout field's settings */
    .layout--plain-blocks-padded { padding: 1rem 0; }
    .layout--card-blocks .layout__column {
      padding: 1rem;
      background: #f4f4f5;
      border-radius: .5rem;
    }
    .layout--full-bleed-grid {
      max-width: none;
      margin-inline: calc(50% - 50vw);
      padding-inline: 0;
      gap: 0;
    }

    /* Only shown when a second block lands in the same row (debug only) */
    .swiper-block-warning {
      padding: .75rem 1rem;
      color: #7a2e0e;
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
    }
  </style>
</head>
<body>
  <div class="dev-bar">
    Swiper block dev site — edit in the <a href="/panel">Panel</a>.
    Assets are injected by the block snippet, exactly as on a real site.
  </div>
  <main>
    <?php if ($page->layout()->isNotEmpty()) : ?>
      <?php foreach ($page->layout()->toLayouts() as $layout) : ?>
        <div class="layout layout--<?= $layout->attrs()->theme()->or('plain-blocks')->value() ?>">
          <?php foreach ($layout->columns() as $column) : ?>
            <div class="layout__column" style="--span:<?= $column->span() ?>">
              <?= $column->blocks()->toHtml() ?>
            </div>
          <?php endforeach ?>
        </div>
      <?php endforeach ?>
    <?php else : ?>
      <p>No layout yet. Add a row with a Swiper block in the <a href="/panel">Panel</a>,
         upload a few images, then reload.</p>
    <?php endif ?>
  </main>
</body>
</html>
