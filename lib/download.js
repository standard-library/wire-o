import request from 'request-promise';

async function download(url: string) {
  const requestSettings = {
    method: 'GET',
    url: url,
    encoding: null
  };

  return await request(requestSettings);
}

export default download;
