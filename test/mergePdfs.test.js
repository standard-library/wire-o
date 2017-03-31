'use strict';

import { expect } from 'chai';

import mergePdfs from '../lib/mergePdfs';

describe('mergePdfs module', function () {
  it('returns buffer', function (done) {
    const pdfPath = `${__dirname}/fixtures/hello.pdf`;
    mergePdfs([ pdfPath ]).then(function (result) {
      expect(result).to.be.an.instanceof(Buffer);
      done();
    });
  });
});
