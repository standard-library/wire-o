var uuid = require('node-uuid');
var Promise = require('bluebird');
var writeFile = Promise.promisify(require('fs').writeFile);

var TmpDirectory = require('./tmpDirectory');
var download = require('./download');

function writeToTmp(buffer, directory) {
  var filePath = `${directory}${uuid.v4()}.pdf`

  return writeFile(filePath, buffer)
    .then(() => filePath);
}

function savePdf(pdfUrl, directory) {
  return download(pdfUrl)
    .then((buffer) => writeToTmp(buffer, directory));
}

function downloadPdfs(urls) {
  console.time('Save pdfs to tmp directory');

  var tmp = new TmpDirectory();

  return tmp.create()
    .then(function () {
      var downloadedPdfs = Promise.map(urls, function (pdfUrl) {
        return savePdf(pdfUrl, tmp.name);
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
