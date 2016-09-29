<?php

namespace Superglue;

require_once "MergedPDF.php";

/**
 * PDFBinder
 */
class Binder
{

  public static function merge($basePath, $paths) {
    $binder = new Binder($basePath);
    return $binder->merge_pdfs($paths);
  }

  function __construct($basePath)
  {
    $this->$basePath = $basePath;
  }

  public function merge_pdfs($paths)
  {
    return new MergedPDF($path);
  }
}
