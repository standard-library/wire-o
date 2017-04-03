import AWS from 'aws-sdk';

AWS.config.setPromisesDependency(null);


/**
* Returns the URL of the merged PDF
* @param {Object} config - The configuration of where you will be uploading the merged PDF to
* @param {string} config.bucket - The S3 bucket name where the merged PDF will be uploaded
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
