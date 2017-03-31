'use strict';

import { expect } from 'chai';

import formatResponse from '../lib/formatResponse';

describe('formatResponse module', function () {
  it('returns formatted URL', function () {
    const expectedResponse = { mergedPdf: 'https://s3.amazonaws.com/superglue/foo.pdf' };
    const formattedResponse = formatResponse('https://s3.amazonaws.com/superglue/foo.pdf');
    expect(formattedResponse).to.deep.equal(expectedResponse);
  });
});
