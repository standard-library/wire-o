'use strict';

var expect = require('chai').expect;
var downloadPdfs = require('../lib/downloadPdfs');

describe('downloadPDfs module', function () {
  it('returns an array of path names', function (done) {
    var urls = ["https://s3.amazonaws.com/superglue/PCAH_PDF_TEMPLATE.pdf"];
    var expectedFilePathPattern = /\/tmp\/.+\/.+.pdf/

    downloadPdfs(urls)
      .then(function (filepaths) {
        filepaths.forEach(function (path) {
          expect(path).to.match(expectedFilePathPattern);
        });

        done();
      });
  });
 });
