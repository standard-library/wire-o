'use strict';

var exec = require('child_process').exec;

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';

var async = require('async');
var AWS = require('aws-sdk');

AWS.config.setPromisesDependency(null);

exports.handler = function(event, context) {
  console.time('lambda runtime');

  var downloadPdfs = require('./lib/download_pdfs');
  var mergePdfs = require('./lib/merge_pdfs');
  var uploadPdf = require('./lib/upload_pdf');

  async.waterfall([
    function getPdfUrls(callback) {
      callback(null, event.pdfUrls);
    },
    downloadPdfs,
    mergePdfs,
    uploadPdf
  ], function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log('waterfall success?');
      context.succeed(result);
    }
  });
}
