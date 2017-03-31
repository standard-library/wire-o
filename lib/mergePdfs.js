import PDFMerge from 'pdf-merge';

function mergePdfs(files: Array<String>) {
  console.log(`Number of files to merge: ${files.length}`);
  console.time('Merge PDFs');

  const pdfMerge = new PDFMerge(files).asBuffer().promise();

  pdfMerge.then(function(buffer) {
    console.timeEnd('Merge PDFs');
  });

  return pdfMerge;
}

export default mergePdfs;
