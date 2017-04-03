import uuid from 'node-uuid';

/**
* Returns URL of the merged PDf
* @param {Object} config - Specifies how and where to store the PDF
* @param {Function} config.storage - The function that will upload the merged PDF to S3
* @param {String} config.prefix - The S3 folder name where the merged PDF will be uploaded
* @returns {Function} - Function which returns the URL of the merged PDF, storePdf~async
 */

function storePdf(config) {
  const storage = config.storage;
  const prefix = config.prefix;

  /**
  * storePdf~async
  * @param {Buffer} buffer - The buffer of the merged PDF
   */

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
