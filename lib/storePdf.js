import uuid from 'node-uuid';

// @flow
function storePdf(config: { storage: Function }) {
  const storage = config.storage;

  async function configuredStorePdf(buffer) {
    console.time('Store merged PDF');

    const key = `merged/${uuid.v4()}.pdf`;
    const data = await storage(key, buffer);

    console.timeEnd('Store merged PDF');
    console.log(`S3 Data: ${data}`);

    return data;
  }

  return configuredStorePdf;
}

export default storePdf;
