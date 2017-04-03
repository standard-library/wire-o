import PDFMerge from 'pdf-merge';

/**
* Returns a promise to merge the PDFs with PDFMerge: https://github.com/wubzz/pdf-merge
* @param {string[]} files - The filepaths of the downloaded PDFs to merge
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
