<?php
// Routes

$app->post('/merge', function ($request, $response, $args) {
    // Sample log message
    // $this->logger->info("Slim-Skeleton '/' route");

    return $response->withJson(array('one' => 'two'))
                    ->withHeader('Content-type', 'application/json');
});
