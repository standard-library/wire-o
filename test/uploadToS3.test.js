'use strict';

import { expect } from 'chai';

import uploadToS3 from '../lib/uploadToS3';

describe('uploadToS3 module', function () {
  it('returns function', function (done) {
    expect(uploadToS3({ bucket: 'foo-bar'})).to.be.an.instanceof(Function);
    done();
  });
});
