'use strict';

import { expect } from 'chai';

import TmpDirectory from '../lib/tmpDirectory';

describe('tmpDirectory module', function () {
  it('has a name', function (done) {
    const tmpDirectory = new TmpDirectory();
    expect(tmpDirectory.name).to.be.a('string');
    done();
  });
});
