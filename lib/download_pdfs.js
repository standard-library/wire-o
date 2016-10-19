var async = require('async');
var request = require('request');
var uuid = require('node-uuid');
var fs = require('fs');
var mkdirp = require('mkdirp');

function writeToTmp(base64, folderPath, files, callback) {
  var filePath = folderPath + uuid.v4() + '.pdf'

  fs.writeFile(filePath, new Buffer(base64, 'base64'), function (err) {
    if (err) {
      callback(err);
    } else {
      files.push(filePath);
      callback();
    }
  });
}

function savePdf(pdfUrl, directoryName, files, cb) {
  var requestSettings = {
    method: 'GET',
    url: pdfUrl,
    encoding: null
  };

  request(requestSettings, function(err, response, buffer) {
    if (err) {
      cb(err);
    } else {
      var base64Pdf = new Buffer(buffer).toString('base64');
      writeToTmp(base64Pdf, directoryName, files, cb);
    }
  });
}

function Directory() {
  this.name = '/tmp/' + uuid.v4() + '/';
}

function makeDirectory(dirName) {
  mkdirp(dirName, function (err) {
    if (err) console.error(err)
    else console.log('created ' + dirName)
  });
}

function downloadPdfs(urls, callback) {
  console.time('save pdfs to tmp directory');
  var files = [];

  var directory = new Directory();
  var directoryName = directory.name;
  makeDirectory(directoryName);

  async.each(urls, function(pdfUrl, cb) {
    savePdf(pdfUrl, directoryName, files, cb);
  }, function(err) {
    if (err) {
      console.log('File did not process: ' + err);
      callback(err, null);
    } else {
      console.log('All files processed');
      console.timeEnd('save pdfs to tmp directory');
      callback(null, files);
    }
  });
}

module.exports = downloadPdfs;
