'use strict';

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';

var downloadPdfs = require('./downloadPdfs');
var mergePdfs = require('./mergePdfs');
var uploadToS3 = require('./uploadToS3')({ bucket: 'superglue' });
var storePDF = require('./storePdf')({ storage: uploadToS3 });
var formatResponse = require('./formatResponse');

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
