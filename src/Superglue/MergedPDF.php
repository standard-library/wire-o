<?php

namespace Superglue;

/**
 * MergedPDF
 */
class MergedPDF
{

  function __construct($paths)
  {
    $this->paths = $paths;
  }

  public function path()
  {
    return "/merged/" . md5(serialize($this->paths)) . "/reader.pdf";
  }
}
