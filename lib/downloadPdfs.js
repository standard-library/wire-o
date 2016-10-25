const uuid = require('node-uuid');
const Promise = require('bluebird');
const writeFile = Promise.promisify(require('fs').writeFile);

const TmpDirectory = require('./tmpDirectory');
const download = require('./download');

function writeToTmp(buffer, directory) {
  const filePath = `${directory}${uuid.v4()}.pdf`

  return writeFile(filePath, buffer)
    .then(() => filePath);
}

function savePdf(pdfUrl, directory) {
  return download(pdfUrl)
    .then((buffer) => writeToTmp(buffer, directory));
}

function downloadPdfs(urls) {
  console.time('Save pdfs to tmp directory');

  const tmp = new TmpDirectory();

  return tmp.create()
    .then(function () {
      const downloadedPdfs = Promise.map(urls, function (pdfUrl) {
        return savePdf(pdfUrl, tmp.name);
      });

      downloadedPdfs.then(function () {
        console.timeEnd('Save pdfs to tmp directory');
      });

      return downloadedPdfs;
    });
}

module.exports = downloadPdfs;
