'use strict';

const expect = require('chai').expect;
const downloadPdfs = require('../lib/downloadPdfs');

describe('downloadPDfs module', function () {
  it('returns an array of path names', function (done) {
    const urls = ["https://s3.amazonaws.com/superglue/PCAH_PDF_TEMPLATE.pdf"];
    const expectedFilePathPattern = /\/tmp\/.+\/.+.pdf/

    downloadPdfs(urls)
      .then(function (filepaths) {
        filepaths.forEach(function (path) {
          expect(path).to.match(expectedFilePathPattern);
        });

        done();
      });
  });
 });
