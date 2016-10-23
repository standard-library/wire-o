var PDFMerge = require('pdf-merge');
var Promise = require('bluebird');

function mergePdfs(files, callback) {
  console.log(`Number of files to merge: ${files.length}`)
  console.time('Merge PDFs');

  var pdfMerge = new PDFMerge(files);

  pdfMerge.asBuffer().promise().then(function(buffer) {
    console.timeEnd('Merge PDFs');
    callback(null, buffer);
  }).catch(function(err) {
    console.log(`Error merging PDFs: ${err}`);
    callback(err, null);
  });
}

module.exports = Promise.promisify(mergePdfs);
