'use strict';

import { expect } from 'chai';
import fs from 'fs';
import sinon from 'sinon';

import storePdf from '../lib/storePdf';

describe('storePdf module', function () {
  it('returns function', function () {
    const storage = () => {};
    expect(storePdf({ storage })).be.an.instanceOf(Function);
  });

  it('calls the returned function', function (done) {
    const storage = sinon.spy();
    const store = storePdf({ storage });
    const buffer = fs.readFileSync(`${__dirname}/fixtures/hello.pdf`);
    store({ buffer }).then(function (response) {
      expect(storage.called).to.equal(true);
      done();
    });
  });
}); 