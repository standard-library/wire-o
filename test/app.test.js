'use strict';

import { expect } from 'chai';
import lambdaContext from 'aws-lambda-mock-context';
import AWS from 'aws-sdk';
import sinon from 'sinon';

import app from '../lib/app';

describe('app', function () {
  context('with valid pdf URLS', function () {
    it('should merge a set of PDFs', function (done) {
      const expectedUrl = 'https://s3.amazonaws.com/superglue/foo.pdf';
      const ctx = lambdaContext();
      const s3promise = {
        promise: function () {
          return new Promise(function (resolve, _) {
            return resolve({ Location: 'https://s3.amazonaws.com/superglue/foo.pdf' });
          })
        }
      };

      const params = { body: { pdfUrls: ['https://s3.amazonaws.com/superglue/PCAH_PDF_TEMPLATE.pdf'] }};

      AWS.S3.prototype.upload = sinon.stub().returns(s3promise);

      ctx.Promise.then(function (response) {
        expect(response["mergedPdf"]).to.equal(expectedUrl);
        done();
      });

      app.handler(params, ctx);
    });
  });
});
