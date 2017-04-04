import PDFMerge from 'pdf-merge';

/**
 * Merges the files using the PDFMerge library.
 * @param {String[]} files - The filepaths of the downloaded PDFs to merge.
 * @returns {Promise} - Promise awaiting the result of merging PDFs.
 */
function mergePDFs(files) {
  console.log(`Number of files to merge: ${files.length}`);
  console.time('Merge PDFs');

  /**
   * mergePdfs~pdfMerge
   * @param {String[]} files - The filepaths of the downloaded PDFs to merge.
   * @returns {Buffer} buffer - Expecting a buffer of the merged PDF, as
   *   defined in the storage configuration.
   */
  const merge = new PDFMerge(files).asBuffer().promise();

  merge.then(function (buffer) {
    console.timeEnd('Merge PDFs');
  });

  return merge;
}

export default mergePDFs;
