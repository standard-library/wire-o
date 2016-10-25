function formatResponse(url) {
  console.log(`Stored at: ${url}`);

  return {
    mergedPDF: url
  }
}

module.exports = formatResponse;
