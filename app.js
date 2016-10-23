'use strict';

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';

var downloadPdfs = require('./lib/downloadPdfs');
var mergePdfs = require('./lib/mergePdfs');
var uploadToS3 = require('./lib/uploadToS3')({ bucket: 'superglue' });
var uploadPdf = require('./lib/uploadPdf')({ uploader: uploadToS3 });
var formatResponse = require('./lib/formatResponse');

exports.handler = function(event, context, callback) {
  console.time('Lambda runtime');

  downloadPdfs(event.pdfUrls)
    .then(mergePdfs)
    .then(uploadPdf)
    .then(formatResponse)
    .then(callback)
    .then(function () {
      console.timeEnd('Lambda runtime');
    })
    .catch(function (error) {
      console.log(error);
    });
}
