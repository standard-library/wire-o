import PDFMerge from 'pdf-merge';

/**
* Merges the files using the PDFMerge library.
* @param {string[]} files - The filepaths of the downloaded PDFs to merge
* @returns {Object} - Promise to merge the PDFs with PDFMerge: https://github.com/wubzz/pdf-merge
 */

function mergePdfs(files: Array<String>) {
  console.log(`files from mergePdfs: ${files}`);
  console.log(`files from mergePdfs: ${JSON.stringify(files)}`);
  console.log(`Number of files to merge: ${files.length}`);
  console.time('Merge PDFs');

  const pdfMerge = new PDFMerge(files).asBuffer().promise();

  pdfMerge.then(function(buffer) {
    console.timeEnd('Merge PDFs');
  });

  return pdfMerge;
}

export default mergePdfs;
