import uuid from 'node-uuid';

/**
 * Sends request to upload a PDF using the provided storage method.
 * @param {Object} config
 * @param {Function} config.storage - The function that will upload the PDF.
 * @returns {storePdf~send} - Function which stores the contents of a buffer
 *   and returns the URL of the stored file.
 * @example
 * const storage = (filepath, buffer) => #...;
 * const uploadPDF = storePDF({ storage });
 * uploadPDF("<file contents>");
 */
function storePDF(config) {
  const storage = config.storage;

  /**
   * @name storePdf~send
   * @param {Buffer} buffer - The buffer of the PDF.
   * @returns {String} - The URL of the stored PDF.
   */
  return async function send(buffer) {
    console.time('Store merged PDF');

    const filepath = `${uuid.v4()}.pdf`;
    const url = await storage(filepath, buffer);

    console.timeEnd('Store merged PDF');
    console.log(`URL: ${url}`);

    return url;
  }
}

export default storePDF;
