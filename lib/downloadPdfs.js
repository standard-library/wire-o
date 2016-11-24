import uuid from 'node-uuid';
import Promise from 'bluebird';
import { writeFile } from 'fs';

import TmpDirectory from './tmpDirectory';
import download from './download';

const writeFileP = Promise.promisify(writeFile);

function writeToTmp(buffer, directory) {
  const filePath = `${directory}${uuid.v4()}.pdf`

  return writeFileP(filePath, buffer)
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

export default downloadPdfs;
