const request = require('request-promise');

function download(url) {
  const requestSettings = {
    method: 'GET',
    url: url,
    encoding: null
  };

  return request(requestSettings);
}

module.exports = download;
