import uuid from 'node-uuid';

/**
* Returns a promise to merge the PDFs with PDFMerge: https://github.com/wubzz/pdf-merge
* @param {string[]} files - The filepaths of the downloaded PDFs to merge
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
