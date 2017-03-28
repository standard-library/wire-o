import AWS from 'aws-sdk';

AWS.config.setPromisesDependency(null);

function uploadToS3(config: { bucket: string }) {
  const bucket = config.bucket;

  return async (key, buffer) => {
    const s3 = new AWS.S3();
    const params = { Bucket: bucket, Key: key, Body: buffer };
    const uploadResponse = await s3.upload(params).promise();
    return uploadResponse['location'];
  };
}

export default uploadToS3;
