var PDFMerge = require('pdf-merge');

function mergePdfs(files) {
  console.log(`Number of files to merge: ${files.length}`)
  console.time('Merge PDFs');

  const pdfMerge = new PDFMerge(files).asBuffer().promise();

  pdfMerge.then(function(buffer) {
    console.timeEnd('Merge PDFs');
  }).catch(function(err) {
    console.log(`Error merging PDFs: ${err}`);
  });

  return pdfMerge;
}

module.exports = mergePdfs;
