<?php

// Routes

require_once "Superglue/Binder.php";

$app->post('/merge', function ($request, $response, $args) {
    $params = $request->getParsedBody();
    $pdf_paths = $params['pdfPaths'];
    $uri = $request->getUri();
    $url = $uri->getBaseUrl();

    $base_path = realpath($this['settings']['pdfBasePath']);
    $pdf = Superglue\Binder::merge($base_path, $pdf_paths);

    return $response->withJson(array('mergedPDF' => $url . $pdf->path()))
                    ->withHeader('Content-type', 'application/json');
});
