var uuid = require('node-uuid');

function uploadPdf(config) {
  const uploader = config.uploader;

  function configuredUploadPdf(buffer) {
    console.time('Upload merged PDF');

    var key = `merged/${uuid.v4()}.pdf`;
    var upload = uploader(key, buffer);

    return upload.then(function (data) {
      console.timeEnd('Upload merged PDF');

      return `https://s3.amazonaws.com/superglue/${key}`;
    });
  }

  return configuredUploadPdf;
}

module.exports = uploadPdf;
