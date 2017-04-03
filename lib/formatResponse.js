/**
* Returns an object of the merged PDF and its URL.
* @param {string} url - The URL of the merged PDF
 */

function formatResponse(url: string): { mergedPdf: string } {
  console.log(`Stored at: ${url}`);

  return {
    mergedPdf: url
  }
}

export default formatResponse;
