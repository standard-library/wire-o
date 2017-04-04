'use strict';

import { expect } from 'chai';

import mergePDFs from '../lib/mergePdfs';

describe('mergePDFs module', function () {
  it('returns buffer', function (done) {
    const pdfPath = `${__dirname}/fixtures/hello.pdf`;
    mergePDFs([ pdfPath ]).then(function (result) {
      expect(result).to.be.an.instanceof(Buffer);
      done();
    });
  });
});
