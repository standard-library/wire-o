/**
* Formats the URL of the merged file into a JS Object.
* @param {String} url - The URL of the merged PDF
* @returns {Object} mergedPdf
* @returns {String} mergedPdf.url - The URL of the merged PDF 
 */

function formatResponse(url) {
  console.log(`Stored at: ${url}`);

  return {
    mergedPdf: url
  }
}

export default formatResponse;
