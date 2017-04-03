// @flow

import uuid from 'node-uuid';
import Promise from 'bluebird';
import { writeFile } from 'fs';

import download from './download';
import TmpDirectory from './tmpDirectory';

const writeFileP = Promise.promisify(writeFile);

/**
* Returns filepaths of the PDFs downloaded to the Lambda server's /tmp directory.
* @param {string[]} url - The URLs of the PDFs to be downloaded
 */

async function downloadPdfs(urls: Array<String>) {
  console.time('Save pdfs to tmp directory');

  const tmp = new TmpDirectory();
  const tmpPath = await tmp.create();
  const pdfPaths = Promise.map(urls, function (pdfUrl) {
    return downloadToPath(tmpPath, pdfUrl);
  });

  pdfPaths.then(function () {
    console.timeEnd('Save pdfs to tmp directory');
  });

  return pdfPaths;
}

async function downloadToPath(directory: string, url: string) {
  const buffer = await download(url);

  return writeToPath(directory, buffer);
}

async function writeToPath(directory: string, buffer: Buffer) {
  const filePath = `${directory}/${uuid.v4()}.pdf`

  await writeFileP(filePath, buffer);

  return filePath;
}

export default downloadPdfs;
