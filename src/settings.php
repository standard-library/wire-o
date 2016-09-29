<?php

error_reporting(E_ALL ^ E_DEPRECATED);

return [
    'settings' => [
        'pdfDestination' => __DIR__ . '/../public/merged/',
        'pdfBasePath' => __DIR__ . '/../tests/fixtures/',
        'basePath' => __DIR__ . '/../public/',
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],
    ],
];
