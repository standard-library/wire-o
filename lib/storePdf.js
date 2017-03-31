import uuid from 'node-uuid';

function storePdf(config: { storage: Function, prefix: string }) {
  const storage = config.storage;
  const prefix = config.prefix;

  return async (buffer) => {
    console.time('Store merged PDF');

    const filepath = `${prefix}/${uuid.v4()}.pdf`;
    const data = await storage(filepath, buffer);

    console.timeEnd('Store merged PDF');
    console.log(`S3 Data: ${data}`);

    return data;
  }
}

export default storePdf;
