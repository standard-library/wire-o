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

  function findTmpFiles(callback) {
    console.time('get tmp file names');
    fs.readdir('/tmp/', function (err, files) {
      if (err) {
        console.log('Error reading file from bin directory: ' + err);
        callback(err);
      } else {
        console.timeEnd('get tmp file names');
        callback(null, files);
      }
    });
  }

  function renameTmpFileNames(files, callback) {
    console.time('rename tmp files');
    async.map(files, function(file, cb) {
      file = '/tmp/' + file;
      cb(null, file);
    }, function(err, results) {
      if (err) {
        console.log('Getting and saving file name failed:' + err);
        callback(err, null);
      } else {
        console.timeEnd('rename tmp files');
        callback(null, results);
      }
    });
  }

  function mergeFiles(files, callback) {
    console.log('# of files to merge: ' + files.length)
    console.time('merge pdfs');
    var pdftkPath = './bin/pdftk';
    var pdfMerge = new PDFMerge(files, pdftkPath);

    pdfMerge.asBuffer().promise().then(function(buffer) {
      console.timeEnd('merge pdfs');
      callback(null, buffer);
      deleteTmpFiles(files);
    }).catch(function(err) {
      console.log('Error merging PDFs: ' + err);
      callback(err, null)
    });
  }

  function uploadMergedPdfToS3(buffer, callback) {
    var key = 'merged/' + uuid.v4() + '.pdf';
    var params = { Bucket: 'superglue', Key: key, Body: buffer};

    s3.putObject(params, function (err, s3Data) {
      console.time('upload merged pdf to S3');

      if (err) {
        console.log('Error sending to S3: ' + err);
        callback(err, null);
      }
      var link = 'https://s3.amazonaws.com/superglue/' + key;
      console.timeEnd('upload merged pdf to S3');
      console.timeEnd('lambda runtime');
      callback(null, callback)
      context.succeed(link);
    });
  }

  function deleteTmpFiles(files) {
    console.time('delete files in tmp folder after merging pdfs');

    async.each(file, function(file, callback) {
      fs.unlink(file);
      callback();
    }, function(err) {
    if (err) {
      console.log('A file did not delete.');
    } else {
      console.log('All files have been deleted successfully');
      console.timeEnd('delete files in tmp folder after merging pdfs');
    }
  });

  }

  async.waterfall([
    function(cb) {
      cb(null, event.pdfUrls);
    },
    pdfsToTmpSaver,
    findTmpFiles,
    renameTmpFileNames,
    mergeFiles,
    uploadMergedPdfToS3
  ], function (error, result) {
    if (error) {
      console.log(err);
    } else {
      console.log('waterfall success?');
    }
  });


}
