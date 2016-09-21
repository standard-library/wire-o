'use strict';

var exec = require('child_process').exec;

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';

var PDFMerge = require('pdf-merge');
var request = require('request');
var async = require('async');
var zlib = require('zlib');
var fs = require('fs');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var uuid = require('node-uuid');
// var targz = require('tar.gz');
// var tar = require('tar');
// var unzip = require('unzip');

exports.handler = function(event, context) {

  var base64Pdfs = event.data;
  async.each(base64Pdfs, function (base64Pdf, callback) {
    var pdfBuffer = new Buffer(base64Pdf, 'base64');
    zlib.unzip(pdfBuffer, function (err, buffer) {
      if (!err) {
        writeToTmp(buffer);
        console.log('File unzipped');
        callback();
      } else {
        callback('Error unzipping file.');
      }
    });
  }, function(err) {
    if (err) {
      console.log('File did not process.');
    } else {
      console.log('All files processed');
      mergeTmpFiles();
    }
  });

  function writeToTmp(buffer, callback) {
    var filePath = '/tmp/' + uuid.v4() + '.pdf'
    fs.writeFile(filePath, buffer, function (err) {
      if (err) return console.log(err);
      console.log('worked!?');
    });
  }

  function mergeTmpFiles() {
    // var pdftkPath = './bin/pdftk'
    // var pdftkPath = 'C:\\PDFtk\\bin\\pdftk.exe';
    // var pdfFiles = [/bin/ + '/pdf1.pdf', __dirname + '/pdf2.pdf'];
    // var pdfMerge = new PDFMerge(pdfFiles, pdftkPath);
    //
    // pdfMerge
    //   .asBuffer()
    //   .merge(function(error, buffer) {
    //     fs.writeFileSync(__dirname + '/merged.pdf', buffer);
    //   });

  }
}
