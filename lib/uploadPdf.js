var uuid = require('node-uuid');
var AWS = require('aws-sdk');

AWS.config.setPromisesDependency(null);

function uploadPdf(config) {
  const bucket = config.bucket;

  function upload(buffer) {
    var s3 = new AWS.S3();
    var key = 'merged/' + uuid.v4() + '.pdf';
    var params = { Bucket: bucket, Key: key, Body: buffer };

    console.time('Upload merged PDF to S3');

    var s3upload = s3.putObject(params).promise();

    s3upload.catch(function (err) {
      console.log('Error sending to S3: ' + err);
    });

    return s3upload.then(function (data) {
      console.timeEnd('Upload merged PDF to S3');
      return 'https://s3.amazonaws.com/superglue/' + key;
    });
  }

  return upload;
}

module.exports = uploadPdf;
