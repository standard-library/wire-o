<?php

namespace Superglue;

use iio\libmergepdf\Merger;

/**
 * PDFBinder
 */
class Binder
{

  public static function merge($basePath, $destination, $paths) {
    $binder = new Binder($basePath);
    return $binder->merge_pdfs($destination, $paths);
  }

  function __construct($basePath)
  {
    $this->basePath = $basePath;
  }

  public function merge_pdfs($destination, $paths)
  {
    $merger = new Merger();
    $basePath = $this->basePath;

    foreach ($paths as $path) {
      // TODO: Patch security hole where input can access any file
      $merger->addFromFile($basePath . $path);
    }

    $filepath = $destination . '/' . md5(serialize($paths)) . '/' . 'reader.pdf';

    if (!file_exists(dirname($filepath))) {
      mkdir(dirname($filepath), 0777, true);
    }

    return MergedPDF::write($filepath, $merger->merge());
  }
}
