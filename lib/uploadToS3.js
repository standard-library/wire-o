const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(null);

function uploadToS3(config) {
  const bucket = config.bucket;

  function configuredUploadToS3(key, buffer) {
    const s3 = new AWS.S3();
    const params = { Bucket: bucket, Key: key, Body: buffer };
    const upload = s3.putObject(params).promise();

    return upload;
  }

  return configuredUploadToS3;
}

module.exports = uploadToS3;
