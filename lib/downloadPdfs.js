var uuid = require('node-uuid');
var Promise = require('bluebird');
var request = require('request-promise');
var mkdirp = require('mkdirp');
var writeFile = Promise.promisify(require('fs').writeFile);

function writeToTmp(base64, folderPath) {
  var filePath = folderPath + uuid.v4() + '.pdf'

  return writeFile(filePath, new Buffer(base64, 'base64')).then(function() {
    return filePath;
  });
}

function savePdf(pdfUrl, directoryName) {
  var requestSettings = {
    method: 'GET',
    url: pdfUrl,
    encoding: null
  };

  return request(requestSettings)
    .then(function (buffer) {
      var base64Pdf = new Buffer(buffer).toString('base64');

      return writeToTmp(base64Pdf, directoryName);
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

function downloadPdfs(urls) {
  console.time('Save pdfs to tmp directory');

  var directory = new Directory();

  makeDirectory(directory.name);

  var downloadedPdfs = Promise.map(urls, function (pdfUrl) {
    return savePdf(pdfUrl, directory.name);
  });

  downloadedPdfs.then(function () {
    console.timeEnd('Save pdfs to tmp directory');
  }).catch(function (err) {
    console.log('File did not process: ' + err);
  });

  return downloadedPdfs;
}

module.exports = downloadPdfs;
