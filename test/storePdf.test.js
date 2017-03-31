'use strict';

import chai from 'chai';
import { expect } from 'chai';
import fs from 'fs';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import storePdf from '../lib/storePdf';

chai.use(sinonChai);

describe('storePdf module', function () {
  it('returns function', function () {
    const storage = () => {};
    expect(storePdf({ storage })).be.an.instanceOf(Function);
  });

  it('calls the returned function and returns the PDF URL', function (done) {
    const storage = sinon.spy();
    const store = storePdf({ storage });
    const buffer = fs.readFileSync(`${__dirname}/fixtures/hello.pdf`);

    store({ buffer }).then(function (response) {
      expect(storage).to.have.been.calledWith(sinon.match(/.+\.pdf/, buffer));
      done();
    });
  });
});
