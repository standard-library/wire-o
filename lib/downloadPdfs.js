var uuid = require('node-uuid');
var Promise = require('bluebird');
var request = require('request-promise');
var writeFile = Promise.promisify(require('fs').writeFile);

var Directory = require('./directory');

function writeToTmp(base64, folderPath) {
  var filePath =  `${folderPath}${uuid.v4()}.pdf`

  return writeFile(filePath, new Buffer(base64, 'base64'))
    .then(() => filePath);
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

function downloadPdfs(urls) {
  console.time('Save pdfs to tmp directory');

  var directory = new Directory();

  return directory.create()
    .then(function () {
      var downloadedPdfs = Promise.map(urls, function (pdfUrl) {
        return savePdf(pdfUrl, directory.name);
      });

      downloadedPdfs.then(function () {
        console.timeEnd('Save pdfs to tmp directory');
      }).catch(function (err) {
        console.log(`File did not process: ${err}`);
      });

      return downloadedPdfs;
    });
}

module.exports = downloadPdfs;
