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
  * @param {String} requestSettings.method - The HTTP request; set to 'GET'
  * @param {String} requestSettings.url - The URL where the file will be downloaded
  * @param {Boolean} requestSettings.encoding - How the response data will be encoded.If null, the body will be a Buffer.
   */

  return await request(requestSettings);
}

export default download;
