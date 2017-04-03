import uuid from 'node-uuid';

/**
* Returns a promise to merge the PDFs with PDFMerge: https://github.com/wubzz/pdf-merge
* @param {Object} config - Specifies how and where to store the PDF
* @param {Function} config.storage - The function that will upload the merged PDF to S3
* @param {String} config.prefix - The S3 folder name where the merged PDF will be uploaded
* @returns {String} - The URL of the merged PDF
 */

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
