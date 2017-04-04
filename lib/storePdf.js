import uuid from 'node-uuid';

/**
 * Sends request to upload a PDF using the provided storage method.
 * @param {Object} config
 * @param {Function} config.storage - The function that will upload the PDF.
 * @param {String} config.prefix - The S3 folder name where the merged PDF
 *   will be uploaded.
 * @returns {storePdf~send} - Function which stores the contents of a buffer
 *   and returns the URL of the stored file.
 * @example
 * const storage = uploadToS3({ bucket: 'test-bucket', prefix: 'merged' });
 * const uploadPDF = storePDF({ storage });
 * uploadPDF(mergePdfs)
 */
function storePDF(config) {
  const storage = config.storage;
  const prefix = config.prefix;

  /**
   * @name storePdf~send
   * @param {Buffer} buffer - The buffer of the PDF.
   * @returns {String} - The URL of the stored PDF.
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

export default storePDF;
