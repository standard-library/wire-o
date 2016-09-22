'use strict';

var exec = require('child_process').exec;

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';

var PDFMerge = require('pdf-merge');
// var request = require('request');
var async = require('async');
var zlib = require('zlib');
var fs = require('fs');
// var AWS = require('aws-sdk');
// var s3 = new AWS.S3();
var uuid = require('node-uuid');

exports.handler = function(event, context) {
  var base64Pdfs = event.data;
  async.each(base64Pdfs, function (base64Pdf, callback) {
    var pdfBuffer = new Buffer(base64Pdf, 'base64');
    if (pdfBuffer) {
      writeToTmp(pdfBuffer);
      console.log('Received file');
      callback();
    } else {
      callback('Error getting file');
    }
    // zlib.unzip(pdfBuffer, function (err, buffer) {
    //   if (!err) {
    //     writeToTmp(buffer);
    //     console.log('File unzipped');
    //     callback();
    //   } else {
    //     callback('Error unzipping file.');
    //   }
    // });
  }, function(err) {
    if (err) {
      console.log('File did not process.');
    } else {
      console.log('All files processed');
      findTmpFiles();
    }
  });

  function writeToTmp(buffer, callback) {
    var filePath = '/tmp/' + uuid.v4() + '.pdf'
    fs.writeFile(filePath, buffer, function (err) {
      if (err) return console.log(err);
      console.log('worked!?');
    });
  }

  function findTmpFiles() {
    fs.readdir('/tmp/', function (err, files) {
      if (err) {
        console.log('Error reading file from bin directory');
      } else {
        mergeFiles(files);
      }
    });
  }

  function mergeFiles(files) {
    for (var i in files) {
      files[i] = '/tmp/' + files[i];
    }
    var pdfFiles = files;

    var pdftkPath = './bin/pdftk';
    var pdfMerge = new PDFMerge(pdfFiles, pdftkPath);

    pdfMerge
      .asBuffer()
      .merge(function(error, buffer) {
        var base64Merge = new Buffer(buffer).toString('base64');
        context.succeed(base64Merge);
    });
  }
}
