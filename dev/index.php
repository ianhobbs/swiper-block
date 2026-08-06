<?php

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
