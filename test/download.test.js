'use strict';

import { expect } from 'chai';

import download from '../lib/download';

describe('download module', function () {
  it('returns a promise', function (done) {
    expect(download("https://s3.amazonaws.com/superglue/hello.pdf")).to.be.an.instanceof(Promise);
    done();
  });

  it('returns the request response', function (done) {
    download("https://s3.amazonaws.com/superglue/hello.pdf").then(function (response) {
      expect(response).to.be.instanceof(Buffer);
    });
    done();
  });
 });
