'use strict';

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';

var downloadPdfs = require('./lib/downloadPdfs');
var mergePdfs = require('./lib/mergePdfs');
var uploadPdf = require('./lib/uploadPdf')({ bucket: 'superglue' });

exports.handler = function(event, context) {
  console.time('Lambda runtime');

  downloadPdfs(event.pdfUrls)
    .then(mergePdfs)
    .then(uploadPdf)
    .then(function (url) {
      context.succeed(url);
      console.timeEnd('Lambda runtime');
    }).catch(function (error) {
      console.log(error);
    });
}
