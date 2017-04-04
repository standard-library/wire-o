import request from 'request-promise';

/**
 * Sends request to download file from URL.
 * @param {String} url - The URL of the PDF to download
 * @returns {Promise} - Promise to download PDF, download~request
 */

async function download(url) {
  const requestSettings = {
    method: 'GET',
    url: url,
    encoding: null
  };

  /**
   * download~request
   * @param {Object} requestSettings - How the request should be made
   */

  return await request(requestSettings);
}

export default download;
