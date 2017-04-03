import request from 'request-promise';

/**
* Downloads a file from a URL.
* @param {string} url - The URL of the PDF to download
* @returns {Object} Promise to download PDF
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
