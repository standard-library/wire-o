'use strict';

var exec = require('child_process').exec;

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';

var async = require('async');
var Promise = require('bluebird');

var downloadPdfs = require('./lib/downloadPdfs');
var mergePdfs = require('./lib/mergePdfs');
var uploadPdf = require('./lib/uploadPdf');

exports.handler = function(event, context) {
  console.time('Lambda runtime');

  downloadPdfs(event.pdfUrls)
    .then(function (filePaths) {
      async.waterfall([
        function getFilePaths(callback) {
          callback(null, filePaths);
        },
        mergePdfs,
        uploadPdf
      ], function (error, result) {
        if (error) {
          console.log(error);
        } else {
          console.timeEnd('Lambda runtime');
          context.succeed(result);
        }
      });
    });
}
