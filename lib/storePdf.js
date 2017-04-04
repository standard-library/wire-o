import uuid from 'node-uuid';

/**
 * Sends request to upload the merged PDF and get its to-be-formatted location.
 * @param {Object} config
 * @param {Function} config.storage - The function that will upload the merged
 *   PDF to S3.
 * @param {String} config.prefix - The S3 folder name where the merged PDF
 *   will be uploaded.
 * @returns {storePdf~send} - Function which stores the buffer file to S3 and
 *   returns the URL of the merged PDF.
 * @example
 * const storage = uploadToS3({ bucket: 'test-bucket', prefix: 'merged' });
 * const uploadPDF = storePDF({ storage });
 * uploadPDF(mergePdfs)
 */
function storePdf(config) {
  const storage = config.storage;
  const prefix = config.prefix;

  /**
   * @name storePdf~send
   * @param {Buffer} buffer - The buffer of the merged PDF
   * @returns {String} - The URL of the uploaded PDF
   */
  return async function send(buffer) {
    console.time('Store merged PDF');

    const filepath = `${prefix}/${uuid.v4()}.pdf`;
    const url = await storage(filepath, buffer);

    console.timeEnd('Store merged PDF');
    console.log(`URL: ${url}`);

    return url;
  }
}

export default storePdf;
