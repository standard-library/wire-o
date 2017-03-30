'use strict';

import { expect } from 'chai';

import storePdf from '../lib/storePdf';
import uploadToS3 from '../lib/uploadToS3';

describe('storePdf module', function () {
  it('returns function', function (done) {
    const storage = uploadToS3({ bucket: 'foo-bar'});
    expect(storePdf(storage)).be.an.instanceOf(Function);
    done();
  });
});
