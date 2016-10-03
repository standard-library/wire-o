'use strict';

var exec = require('child_process').exec;

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';

var PDFMerge = require('pdf-merge');
var fs = require('fs');
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var s3 = new AWS.S3();

exports.handler = function(event, context) {
  console.time('lambda runtime');

  var pdfsToTmpSaver = require('./lib/pdfs_to_tmp_saver');

  function findTmpFiles() {
    console.time('get file names of files in tmp directory');
    fs.readdir('/tmp/', function (err, files) {
      if (err) {
        console.log('Error reading file from bin directory');
      } else {
        console.timeEnd('get file names of files in tmp directory');
        mergeFiles(files);
      }
    });
  }

  function deleteTmpFiles(files) {
    console.time('delete files in tmp folder after merging pdfs');
    files.forEach(function(file) {
      fs.unlink(file);
    });
    console.timeEnd('delete files in tmp folder after merging pdfs');
  }

  function mergeFiles(files) {
    console.time('merge pdfs');
    for (var i in files) {
      files[i] = '/tmp/' + files[i];
    }

    var pdftkPath = './bin/pdftk';
    var pdfMerge = new PDFMerge(files, pdftkPath);
    pdfMerge
      .asBuffer()
      .merge(function(error, buffer) {
        if (error) {
          console.log('Error merging');
        }
        var key = 'merged/' + uuid.v4() + '.pdf';
        var params = { Bucket: 'superglue', Key: key, Body: buffer};
        console.timeEnd('merge pdfs');
        s3.putObject(params, function (err, s3Data) {
          console.time('upload merged pdf to S3');
          if (err) {
            console.log('Error sending to S3: ' + err);
          }
          deleteTmpFiles(files);
          var link = 'https://s3.amazonaws.com/superglue/' + key;
          console.timeEnd('upload merged pdf to S3');
          console.timeEnd('lambda runtime');
          context.succeed(link);
        });
    });
  }

  pdfsToTmpSaver(event.pdfUrls, findTmpFiles);
}
