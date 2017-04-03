import AWS from 'aws-sdk';

AWS.config.setPromisesDependency(null);


/**
* Uploads the merged PDF to S3.
* @param {Object} config - The configuration of where you will be uploading the merged PDF
* @param {String} config.bucket - The S3 bucket name where the merged PDF will be uploaded
* @returns {Function} - Function that uploads the merged PDF to S3 and return the location URL, uploadToS3~async
 */

function uploadToS3(config) {
  const bucket = config.bucket;

  /**
  * uploadToS3~async
  * @param {String} key - The filepath where the merged PDF will be uploaded on S3
  * @param {Buffer} buffer - The buffer of the merged PDF
   */

  return async (key, buffer) => {
    const s3 = new AWS.S3();
    const params = { Bucket: bucket, Key: key, Body: buffer, ACL: 'public-read' };
    const uploadResponse = await s3.upload(params).promise();
    return uploadResponse['Location'];
  };
}

export default uploadToS3;
