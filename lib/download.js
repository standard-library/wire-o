import request from 'request-promise';

/**
* Return a promise to download a PDF.
* @param {string} url - The URL of the PDF to download
 */

async function download(url: string) {
  const requestSettings = {
    method: 'GET',
    url: url,
    encoding: null
  };

  return await request(requestSettings);
}

export default download;
