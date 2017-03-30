'use strict';

import { expect } from 'chai';
import fs from 'fs';
import sinon from 'sinon';

import storePdf from '../lib/storePdf';
import uploadToS3 from '../lib/uploadToS3';

describe('storePdf module', function () {
  it('returns function', function (done) {
    const storage = uploadToS3({ bucket: 'foo-bar'});
    expect(storePdf({ storage })).be.an.instanceOf(Function);
    done();
  });

  it('calls the returned function and returns the PDF URL', function (done) {
    const storageSpy = sinon.spy(uploadToS3);
    const storage = uploadToS3({ bucket: 'foo-bar'});
    const store = storePdf({ storage });
    const buffer = fs.readFileSync(`${__dirname}/fixtures/hello.pdf`);
    store({ buffer }).then(function (response) {
      expect(storageSpy.called).to.equal(true);
      expect(response).to.equal('https://s3.amazonaws.com/superglue/foo.pdf');
      done();
    });
  });
}); 