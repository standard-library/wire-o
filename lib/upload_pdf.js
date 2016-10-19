var uuid = require('node-uuid');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
AWS.config.setPromisesDependency(null);

function uploadPdf(buffer, files, callback) {
  var key = 'merged/' + uuid.v4() + '.pdf';
  var params = { Bucket: 'superglue', Key: key, Body: buffer };

  console.time('upload merged pdf to S3');

  var s3upload = s3.putObject(params).promise();

  s3upload.catch(function (err) {
    console.log('Error sending to S3: ' + err);
    return callback(err, null);
  });

  s3upload.then(function (data) {
    var link = 'https://s3.amazonaws.com/superglue/' + key;
    console.timeEnd('upload merged pdf to S3');
    console.timeEnd('lambda runtime');

    callback(null, link)
  });
}

module.exports = uploadPdf;
