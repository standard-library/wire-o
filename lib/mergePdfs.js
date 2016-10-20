var PDFMerge = require('pdf-merge');

function mergePdfs(files, callback) {
  console.log('# of files to merge: ' + files.length)
  console.time('merge pdfs');
  var pdftkPath = './bin/pdftk';
  var pdfMerge = new PDFMerge(files, pdftkPath);

  pdfMerge.asBuffer().promise().then(function(buffer) {
    console.timeEnd('merge pdfs');
    callback(null, buffer, files);
  }).catch(function(err) {
    console.log('Error merging PDFs: ' + err);
    callback(err, null);
  });
}

module.exports = mergePdfs;
