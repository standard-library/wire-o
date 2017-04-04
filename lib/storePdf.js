import uuid from 'node-uuid';

/**
 * Sends request to upload the merged PDF and get its to-be-formatted location.
 * @param {Object} config - Specifies how and where to store the PDF
 * @param {Function} config.storage - The function that will upload the merged PDF to S3
 * @param {String} config.prefix - The S3 folder name where the merged PDF will be uploaded
 * @returns {Function} - Function which stores the buffer file to S3 and returns the URL of the merged PDF, storePdf~send
 * @example
 * const storage = uploadToS3({ bucket: 'test-bucket', prefix: 'merged' });
 * const uploadPDF = storePDF({ storage });
 * uploadPDF(mergePdfs)
 */

function storePdf(config) {
  const storage = config.storage;
  const prefix = config.prefix;

  /**
   * storePdf~send
   * @param {Buffer} buffer - The buffer of the merged PDF
   */

  return async function send(buffer) {
    console.time('Store merged PDF');

    const filepath = `${prefix}/${uuid.v4()}.pdf`;

    const data = await storage(filepath, buffer);

    console.timeEnd('Store merged PDF');
    console.log(`S3 Data: ${data}`);

    return data;
  }
}

export default storePdf;
