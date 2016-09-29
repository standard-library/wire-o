<?php

namespace Superglue;

/**
 * MergedPDF
 */
class MergedPDF
{

  public $path;

  public static function write($filename, $contents) {
    file_put_contents($filename, $contents);
    return new MergedPDF($filename, $contents);
  }

  function __construct($path, $contents)
  {
    $this->path = $path;
    $this->contents = $contents;
  }
}
