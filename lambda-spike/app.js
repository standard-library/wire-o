'use strict';

const exec = require('child_process').exec;

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';

const pdfMerge = require('pdf-merge');
const request = require('request');
const async = require('async');
const zlib = require('zlib');
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const uuid = require('node-uuid');
// const targz = require('tar.gz');
// const tar = require('tar');
// const unzip = require('unzip');

exports.handler = function(event, context) {

  const base64Data = event.data;

  async.each(base64Data, function (pdfData, callback) {
    let buff = new Buffer(pdfData, 'base64');
    zlib.unzip(buff, function (err, buffed) {
      if (!err) {
        const params = { Bucket: 'superglue', Key: uuid.v4() + ".pdf", Body: buffed };
        s3.putObject(params, function (err, s3Data) {
          if (err) {
            console.log(err);
          } else {
            console.log('s3 data: ' + s3Data)
            console.log('Successfully uploaded.');
          }
        });
      } else {
        console.log('error');
      }
    });
  });

  var PDFMerge = require('pdf-merge');
  var pdftkPath = './bin/pdftk'
  // var pdftkPath = 'C:\\PDFtk\\bin\\pdftk.exe';
  // var pdfFiles = [__dirname + '/pdf1.pdf', __dirname + '/pdf2.pdf'];
  // var pdfMerge = new PDFMerge(pdfFiles, pdftkPath);

  // pdfMerge
  //   .asBuffer()
  //   .merge(function(error, buffer) {
  //fs.writeFileSync(__dirname + '/merged.pdf', buffer);
});

}
