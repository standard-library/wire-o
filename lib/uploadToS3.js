import AWS from 'aws-sdk';

AWS.config.setPromisesDependency(null);


/**
* Uploads the merged PDF to S3
* @param {Object} config - The configuration of where you will be uploading the merged PDF to
* @param {String} config.bucket - The S3 bucket name where the merged PDF will be uploaded
* @returns {String} - The URL of the merged PDF
 */

function uploadToS3(config: { bucket: string }) {
  const bucket = config.bucket;

  return async (key, buffer) => {
    const s3 = new AWS.S3();
    const params = { Bucket: bucket, Key: key, Body: buffer, ACL: 'public-read' };
    const uploadResponse = await s3.upload(params).promise();
    return uploadResponse['Location'];
  };
}

export default uploadToS3;
