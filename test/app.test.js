'use strict';

const expect = require('chai').expect;
const lambdaContext = require('aws-lambda-mock-context');
const AWS = require('aws-sdk');
const sinon = require('sinon');

const app = require('../app');

describe('app', function () {
  context('with valid pdf URLS', function () {
    it('should merge a set of PDFs', function (done) {
      const expectedUrl = /https:\/\/s3\.amazonaws\.com\/superglue\/merged\/.+\-.+\-.+\-.+\-.+\.pdf/;
      const ctx = lambdaContext();
      const s3promise = {
        promise: function () {
          return new Promise(function (resolve, _) {
            return resolve("foo.pdf");
          })
        }
      };
      const params = { pdfUrls: ["https://s3.amazonaws.com/superglue/PCAH_PDF_TEMPLATE.pdf"] };

      AWS.S3.prototype.putObject = sinon.stub().returns(s3promise);

      ctx.Promise.then(function (response) {
        expect(response["mergedPDF"]).to.match(expectedUrl);
        done();
      });

      app.handler(params, ctx);
    });
  });
});
