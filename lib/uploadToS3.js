import AWS from 'aws-sdk';

AWS.config.setPromisesDependency(null);

function uploadToS3(config: { bucket: string }) {
  const bucket = config.bucket;

  return async (key, buffer) => {
    const s3 = new AWS.S3();
    const params = { Bucket: bucket, Key: key, Body: buffer };
    const filename = await s3.putObject(params).promise();

    return `https://s3.amazonaws.com/${bucket}/${filename}`;
  };
}

export default uploadToS3;
