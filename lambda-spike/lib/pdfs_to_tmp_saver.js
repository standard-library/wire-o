var async = require('async');
var request = require('request');
var uuid = require('node-uuid');
var fs = require('fs');

function writeToTmp(base64, folderPath, callback) {
  var filePath = folderPath + uuid.v4() + '.pdf'

  fs.writeFile(filePath, new Buffer(base64, 'base64'), function (err) {
    if (err) {
      console.log('Did not write file to tmp.');
      callback(err);
    } else {
      console.log('Wrote file to tmp directory.');
      callback(null, filePath);
    }
  });
}

function pdfsToTmpSaver(urls, directory, callback) {
  console.time('save pdfs to tmp directory');
  var files = [];

  async.each(urls, function(pdfUrl, cb) {
    var requestSettings = {
      method: 'GET',
      url: pdfUrl,
      encoding: null
    };
    request(requestSettings, function(err, response, buffer) {
      if (!err) {
        var base64Pdf = new Buffer(buffer).toString('base64');
        writeToTmp(base64Pdf, directory, function(err, file) {
          if (!err) {
            files.push(file);
            cb();
          }
        });
      }
    });
  }, function(err) {
    if (err) {
      console.log('File did not process');
      callback(err, null);
    } else {
      console.log('All files processed');
      console.timeEnd('save pdfs to tmp directory');
      callback(null, files);
    }
  });
}

module.exports = pdfsToTmpSaver;
