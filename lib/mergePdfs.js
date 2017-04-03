import PDFMerge from 'pdf-merge';

/**
* Merges the files using the PDFMerge library.
* @param {String[]} files - The filepaths of the downloaded PDFs to merge
* @returns {Object} - Promise to merge the PDFs with PDFMerge (https://github.com/wubzz/pdf-merge), mergePdfs~pdfMerge
 */

function mergePdfs(files) {
  console.log(`Number of files to merge: ${files.length}`);
  console.time('Merge PDFs');

  /**
  * mergePdfs~pdfMerge
  * @param {String[]} files - The filepaths of the downloaded PDFs to merge
   */

  const pdfMerge = new PDFMerge(files).asBuffer().promise();

  pdfMerge.then(function(buffer) {
    console.timeEnd('Merge PDFs');
  });

  return pdfMerge;
}

export default mergePdfs;
