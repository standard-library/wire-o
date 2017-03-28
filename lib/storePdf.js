import uuid from 'node-uuid';

// @flow
function storePdf(config: { storage: Function, key: string }) {
  const storage = config.storage;
  const key = config.key;
  console.log(`storePdf storage: ${storage}`);
  console.log(`storePdf key: ${key}`);

  return async (buffer) => {
    console.time('Store merged PDF');

    const filepath = `${key}/${uuid.v4()}.pdf`;
    const data = await storage(filepath, buffer);

    console.timeEnd('Store merged PDF');
    console.log(`S3 Data: ${data}`);

    return data;
  }
}

export default storePdf;
