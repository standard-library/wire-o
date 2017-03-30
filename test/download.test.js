'use strict';

import { expect } from 'chai';

import download from '../lib/download';

describe('download module', function () {
  it('returns a promise', function (done) {
    expect(download("https://s3.amazonaws.com/superglue/PCAH_PDF_TEMPLATE.pdf")).to.be.an.instanceof(Promise);
    done();
  });
 });
