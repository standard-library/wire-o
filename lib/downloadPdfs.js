var uuid = require('node-uuid');
var Promise = require('bluebird');
var writeFile = Promise.promisify(require('fs').writeFile);

var TmpDirectory = require('./tmpDirectory');
var download = require('./download');

function writeToTmp(buffer, folderPath) {
  var filePath = `${folderPath}${uuid.v4()}.pdf`

  return writeFile(filePath, buffer)
    .then(() => filePath);
}

function savePdf(pdfUrl, directoryName) {
  return download(pdfUrl)
    .then((buffer) => writeToTmp(buffer, directoryName));
}

function downloadPdfs(urls) {
  console.time('Save pdfs to tmp directory');

  var directory = new TmpDirectory();

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
