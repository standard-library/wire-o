function formatResponse(url) {
  console.log(`Stored at: ${url}`);

  return {
    mergedPdf: url
  }
}

export default formatResponse;
