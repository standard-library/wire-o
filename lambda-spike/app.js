'use strict';

var exec = require('child_process').exec;

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';

exports.handler = function(event, context) {
  var PDFMerge = require('pdf-merge');
  var request = require('request');
  var async = require('async');
  var zlib = require('zlib');
  var fs = require('fs');
  var AWS = require('aws-sdk');
  var s3 = new AWS.S3();
  var uuid = require('node-uuid');
  var urls = event.pdfUrls;

  async.each(urls, function(pdfUrl, callback) {
    var requestSettings = {
        method: 'GET',
        url: pdfUrl,
        encoding: null
     };

    request(requestSettings, function(err, response, buffer) {
      var base64Pdf = new Buffer(buffer).toString('base64');
      if (!err) {
        writeToTmp(base64Pdf);
        console.log('File encoded.');
        callback();
      } else {
        callback('Error encoding file.');
      }
    });
  }, function(err) {
    if (err) {
      console.log('File did not process');
    } else {
      console.log('All files processed');
      findTmpFiles();
    }
  });

  function writeToTmp(base64) {
    fs.unlink('/tmp/', function(err) { console.log('tmp files deleted') });
    var filePath = '/tmp/' + uuid.v4() + '.pdf'

    fs.writeFile(filePath, new Buffer(base64, "base64"), function (err) {
      if (err) {
        console.log('Did not write file to tmp.');
      } else {
        console.log('Wrote file to tmp directory.');
      }
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

  function deleteTmpFiles(files) {
    files.forEach(function(file) {
      fs.unlink(file);
    });
  }

  function mergeFiles(files) {
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
        var mergedBase64 = new Buffer(buffer).toString('base64');
        deleteTmpFiles(files);
        context.succeed(mergedBase64);
    });
  }

}
