import AWS from 'aws-sdk';

AWS.config.setPromisesDependency(null);


/**
 * Uploads a file to an S3 bucket
 * @param {Object} config - The configuration of where the merged PDF will be uploaded
 * @param {String} config.bucket - The S3 bucket name where the merged PDF will be uploaded
 * @returns {Function} - Function that uploads the merged PDF to S3 and returns the location URL, uploadToS3~send
 * @example
 * const storage = uploadToS3({ bucket: 'test-bucket' });
 * const uploadPDF = storePDF({ storage });
 * uploadPDF(mergePdfs)
 */

function uploadToS3(config) {
  const bucket = config.bucket;

  /**
   * uploadToS3~send
   * @param {String} key - The filepath where the merged PDF will be uploaded on S3
   * @param {Buffer} buffer - The buffer of the merged PDF
   */

  return async function send(key, buffer) {
    const s3 = new AWS.S3();
    const params = { Bucket: bucket, Key: key, Body: buffer, ACL: 'public-read' };
    const uploadResponse = await s3.upload(params).promise();
    return uploadResponse['Location'];
  };
}

export default uploadToS3;
