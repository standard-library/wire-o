// @flow
function storePdf(config: { storage: Function }) {
  const storage = config.storage;
  const filepath = config.storage.filepath;

  return async (buffer) => {
    console.time('Store merged PDF');

    const data = await storage(filepath, buffer);

    console.timeEnd('Store merged PDF');
    console.log(`S3 Data: ${data}`);

    return data;
  }
}

export default storePdf;
