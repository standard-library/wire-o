'use strict';

var expect = require('chai').expect,
lambdaToTest = require('../index')

const context = require('aws-lambda-mock-context');
const ctx = context();
// var pdfsToTmpSaver = require('../lib/pdfs_to_tmp_saver')

describe('pdfsToTmpSaver', function() {
  context('with valid pdf URLS', function() {
    it('creates a requestSettings object for each URL', function() {

      console.log(superApp.handler(event, cxt).pdfsToTmpSaver);

    });

    // var requestSettings = {
    //   method: 'GET',
    //   url: pdfUrl,
    //   encoding: null
    // };


  });
});
