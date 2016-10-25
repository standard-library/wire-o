'use strict';

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';

var downloadPdfs = require('./lib/downloadPdfs');
var mergePdfs = require('./lib/mergePdfs');
var uploadToS3 = require('./lib/uploadToS3')({ bucket: 'superglue' });
var storePDF = require('./lib/storePdf')({ storage: uploadToS3 });
var formatResponse = require('./lib/formatResponse');

exports.handler = function(event, context) {
  console.time('Lambda runtime');

  downloadPdfs(event.pdfUrls)
    .then(mergePdfs)
    .then(storePDF)
    .then(formatResponse)
    .then(function (response) {
      context.succeed(response);
      console.log('Response:', response);
      console.timeEnd('Lambda runtime');
    })
    .catch(function (error) {
      console.log('Something went wrong:', error);
    });
}
