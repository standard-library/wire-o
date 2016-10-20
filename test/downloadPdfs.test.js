'use strict';

var expect = require('chai').expect;
var lambdaToTest = require('../app');
var downloadPdfs = require('../lib/downloadPdfs');
var uuid = require('node-uuid');
var sinon = require('sinon');

describe('downloadPDfs module', function() {
     it('returns an array of path names', function() {
       var urls =  [ "https://s3.amazonaws.com/superglue/PCAH_PDF_TEMPLATE.pdf" ];
       var downloadStub = sinon.stub().returns(['/tmp/36b5d1c5-f1ed-460b-b95d-f7f9ff4b52ad/556c8d0a-71e0-4a31-ae51-c4ec75f85563.pdf' ]);
       downloadStub.call(urls);
    });
 });
