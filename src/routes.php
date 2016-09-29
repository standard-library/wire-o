<?php

// Routes

$app->post('/merge', function ($request, $response, $args) {
    $params = $request->getParsedBody();
    $pdfPaths = $params['pdfPaths'];
    $uri = $request->getUri();
    $url = $uri->getBaseUrl();

    $destination = realpath($this['settings']['pdfDestination']);
    $pdfBasePath = realpath($this['settings']['pdfBasePath']);
    $basePath = realpath($this['settings']['basePath']);

    $pdf = Superglue\Binder::merge($pdfBasePath, $destination, $pdfPaths);
    $publicPath = str_replace($basePath, "", $pdf->path);

    return $response->withJson(array('mergedPDF' => $url . $publicPath))
                    ->withHeader('Content-type', 'application/json');
});
