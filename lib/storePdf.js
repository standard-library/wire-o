import uuid from 'node-uuid';

// @flow
function storePdf(config: { storage: Function }) {
  const storage = config.storage;

  return async (buffer) => {
    console.time('Store merged PDF');

    const filepath = `merged/${uuid.v4()}.pdf`;
    const data = await storage(filepath, buffer);

    console.timeEnd('Store merged PDF');
    console.log(`S3 Data: ${data}`);

    return data;
  }
}

export default storePdf;
