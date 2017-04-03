/**
* Formats the URL of the merged file into a JS Object.
* @param {string} url - The URL of the merged PDF
* @returns {Object} - Merged PDF URL.
 */

function formatResponse(url: string): { mergedPdf: string } {
  console.log(`Stored at: ${url}`);

  return {
    mergedPdf: url
  }
}

export default formatResponse;
