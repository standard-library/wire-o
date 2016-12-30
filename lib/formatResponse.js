// @flow

function formatResponse(url: string): { mergedPdf: string } {
  console.log(`Stored at: ${url}`);

  return {
    mergedPdf: url
  }
}

export default formatResponse;
