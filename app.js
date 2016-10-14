'use strict';

var exec = require('child_process').exec;

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';

var PDFMerge = require('pdf-merge');
var fs = require('fs');
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var async = require('async');
var mkdirp = require('mkdirp');

AWS.config.setPromisesDependency(null);

exports.handler = function(event, context) {
  console.time('lambda runtime');

  var s3 = new AWS.S3();
  var pdfsToTmpSaver = require('./lib/pdfs_to_tmp_saver');

  function mergeFiles(files, callback) {
    console.log('# of files to merge: ' + files.length)
    console.time('merge pdfs');
    var pdftkPath = './bin/pdftk';
    var pdfMerge = new PDFMerge(files, pdftkPath);

    pdfMerge.asBuffer().promise().then(function(buffer) {
      console.timeEnd('merge pdfs');
      callback(null, buffer, files);
    }).catch(function(err) {
      console.log('Error merging PDFs: ' + err);
      callback(err, null);
    });
  }

  function uploadMergedPdfToS3(buffer, files, callback) {
    var key = 'merged/' + uuid.v4() + '.pdf';
    var params = { Bucket: 'superglue', Key: key, Body: buffer};

    console.time('upload merged pdf to S3');

    var s3upload = s3.putObject(params).promise();

    s3upload.catch(function (err) {
      console.log('Error sending to S3: ' + err);
      return callback(err, null);
    });

    s3upload.then(function (data) {
      var link = 'https://s3.amazonaws.com/superglue/' + key;
      console.timeEnd('upload merged pdf to S3');
      console.timeEnd('lambda runtime');

      callback(null, link)
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
    function(callback) {
      var folderPath = uuid.v4();
      var dir = '/tmp/' + folderPath + '/';

      mkdirp(dir, function (err) {
        if (err) console.error(err)
        else console.log('created ' + dir)
      });

      callback(null, event.pdfUrls, dir);
    },
    pdfsToTmpSaver,
    mergeFiles,
    uploadMergedPdfToS3
  ], function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log('waterfall success?');
    }
  });
}
