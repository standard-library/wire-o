var async = require('async');
var uuid = require('node-uuid');
var Promise = require('bluebird');
var rp = require('request-promise');
var mkdirp = require('mkdirp');

function writeToTmp(base64, folderPath, files, callback) {
  var writeFile = Promise.promisify(require('fs').writeFile);
  var filePath = folderPath + uuid.v4() + '.pdf'

  writeFile(filePath, new Buffer(base64, 'base64')).then(function() {
    files.push(filePath);
    return callback();
  }).catch(function(err) {
    return callback(err);
  });
}

function savePdf(pdfUrl, directoryName, files, callback) {
  var requestSettings = {
    method: 'GET',
    url: pdfUrl,
    encoding: null
  };

  rp(requestSettings)
    .then(function(buffer) {
      var base64Pdf = new Buffer(buffer).toString('base64');
      writeToTmp(base64Pdf, directoryName, files, callback);
    })
    .catch(function(err) {
      return callback(err);
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
