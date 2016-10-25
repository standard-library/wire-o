var PDFMerge = require('pdf-merge');

function mergePdfs(files) {
  console.log(`Number of files to merge: ${files.length}`)
  console.time('Merge PDFs');

  const pdfMerge = new PDFMerge(files).asBuffer().promise();

  pdfMerge.then(function(buffer) {
    console.timeEnd('Merge PDFs');
  });

  return pdfMerge;
}

module.exports = mergePdfs;
