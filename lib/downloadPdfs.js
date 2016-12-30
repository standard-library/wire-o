// @flow

import uuid from 'node-uuid';
import Promise from 'bluebird';
import { writeFile } from 'fs';

import download from './download';
import TmpDirectory from './tmpDirectory';

const writeFileP = Promise.promisify(writeFile);

async function downloadPdfs(urls: Array<String>) {
  console.time('Save pdfs to tmp directory');

  const tmp = new TmpDirectory();
  const tmpPath = await tmp.create();
  const downloadedPdfs = Promise.map(urls, function (pdfUrl) {
    return savePdf(pdfUrl, tmpPath);
  });

  downloadedPdfs.then(function () {
    console.timeEnd('Save pdfs to tmp directory');
  });

  return downloadedPdfs;
}

async function savePdf(pdfUrl: string, directory: string) {
  const buffer = await download(pdfUrl);

  return writeToTmp(buffer, directory);
}

async function writeToTmp(buffer: Buffer, directory: string) {
  const filePath = `${directory}/${uuid.v4()}.pdf`

  await writeFileP(filePath, buffer);

  return filePath;
}

export default downloadPdfs;
