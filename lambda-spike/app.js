'use strict';

var exec = require('child_process').exec;

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';

var PDFMerge = require('pdf-merge');
var fs = require('fs');
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var s3 = new AWS.S3();
var async = require('async');

exports.handler = function(event, context) {
  console.time('lambda runtime');

  var pdfsToTmpSaver = require('./lib/pdfs_to_tmp_saver');

  function findTmpFiles() {
    console.time('get tmp file names');
    fs.readdir('/tmp/', function (err, files) {
      if (err) {
        console.log('Error reading file from bin directory: ' + err);
      } else {
        console.timeEnd('get tmp file names');
        renameTmpFileNames(files);
      }
    });
  }


  function renameTmpFileNames(files) {
    console.time('rename tmp files');
    async.map(files, function(file, callback) {
      file = '/tmp/' + file;
      callback(null, file);
    }, function(err, results) {
      if (err) {
        console.log('Getting and saving file name failed:' + err);
      } else {
        console.timeEnd('rename tmp files');
        mergeFiles(results);
      }
    });
  }

  function mergeFiles(files) {
    console.log('# of files to merge: ' + files.length)
    console.time('merge pdfs');
    var pdftkPath = './bin/pdftk';
    var pdfMerge = new PDFMerge(files, pdftkPath);

    pdfMerge.asBuffer().promise().then(function(buffer) {
      console.timeEnd('merge pdfs');
      uploadMergedPdfToS3(buffer);
      deleteTmpFiles(files);
    }).catch(function(err) {
      console.log('Error merging PDFs: ' + err);
    });
  }

  function uploadMergedPdfToS3(buffer) {
    var key = 'merged/' + uuid.v4() + '.pdf';
    var params = { Bucket: 'superglue', Key: key, Body: buffer};

    s3.putObject(params, function (err, s3Data) {
      console.time('upload merged pdf to S3');

      if (err) {
        console.log('Error sending to S3: ' + err);
      }
      var link = 'https://s3.amazonaws.com/superglue/' + key;
      console.timeEnd('upload merged pdf to S3');
      console.timeEnd('lambda runtime');
      context.succeed(link);
    });
  }

  function deleteTmpFiles(files) {
    console.time('delete files in tmp folder after merging pdfs');
    files.forEach(function(file) {
      fs.unlink(file);
    });
    console.timeEnd('delete files in tmp folder after merging pdfs');
  }

  pdfsToTmpSaver(event.pdfUrls, findTmpFiles);

}
