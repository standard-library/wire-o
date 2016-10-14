'use strict';

var expect = require('chai').expect;
var lambdaContext = require('aws-lambda-mock-context');
var AWS = require('aws-sdk');
var sinon = require('sinon');

var app = require('../app');

describe('app', function () {
  context('with valid pdf URLS', function () {
    it('should merge a set of PDFs', function (done) {
      var ctx = lambdaContext();
      var s3promise = {
        promise: function () {
          return new Promise(function (resolve, _) {
            return resolve("foo.pdf");
          })
        }
      };

      AWS.S3.prototype.putObject = sinon.stub().returns(s3promise);

      app.handler({ pdfUrls: ["https://s3.amazonaws.com/superglue/PCAH_PDF_TEMPLATE.pdf"] }, ctx);

      ctx.Promise.then(function (url) {
        expect(url).to.match(/https:\/\/s3\.amazonaws\.com\/superglue\/merged\/.+\-.+\-.+\-.+\-.+\.pdf/);
        done();
      });
    });
  });
});
