// @flow

import request from 'request-promise';

function download(url: string) {
  const requestSettings = {
    method: 'GET',
    url: url,
    encoding: null
  };

  return request(requestSettings);
}

export default download;
