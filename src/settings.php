<?php
return [
    'settings' => [
        'pdfDestination' => __DIR__ . '/../public/merged/',
        'pdfBasePath' => __DIR__ . '/../tests/fixtures/',
        'basePath' => __DIR__ . '/../public/',
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],
    ],
];
