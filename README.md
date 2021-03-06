# Wire-O

Wire-O is a serverless JavaScript (ES2015) app that lets you quickly set up an API on AWS to merge PDFs and send back links of merged PDFs.

Uses [Serverless framework](https://serverless.com/), [AWS Lambda (Node 6.10)](https://aws.amazon.com/lambda/), [AWS API Gateway](https://aws.amazon.com/api-gateway/), [AWS S3](https://aws.amazon.com/s3/), and [PDFMerge](https://github.com/wubzz/pdf-merge).

## Setup and Deployment

### First things first: Get the tools you need

You can use the AWS Console, but the AWS CLI allows for the scripting of Lambda uploads. Here's how to get it:

1. Install pip first if you don't have it already with `sudo easy_install pip` (on Mac OSX)
2. Install the CLI with `sudo -H pip install awscli --upgrade --ignore-installed six` (on Mac OSX)

After the AWS CLI is installed...

1. Find your Access Key & Secret Access Keys, and [make sure you have the permissions you need](http://docs.aws.amazon.com/IAM/latest/UserGuide/access.html) to access AWS.
2. Run `aws configure`.
3. Put in the Access & Secret Access keys.
4. Install the [Serverless](https://serverless.com/) framework.

### Create `wire-o.yml` and set bucket name variable

1. Create a `wire-o.yml` file at root.
2. Define `s3BucketName` variable in the `wire-o.yml` file. This is set in the `serverless.yml` file and used in the JavaScript code.

```yaml
s3BucketName: "s3-bucket-name-goes-here"
```

### Deployment

This command will compile JavaScript with Babel, and deploy the app using Serverless:

```shell
npm run deploy
```


## The Endpoint

After you have deployed Wire-O, you will have created an API Gateway endpoint that accepts POST requests and triggers a Lambda Function to run. You will see the URL in your console output, which will look something like this:

`https://o64722rmyh.execute-api.us-east-1.amazonaws.com/dev/merge`

With this endpoint, the JSON request body accepts an array of `pdfUrls`:

```json
{
  "pdfUrls": [
    "https://s3.amazonaws.com/superglue/PCAH_PDF_TEMPLATE.pdf",
    "https://s3.amazonaws.com/superglue/hello.pdf"
  ]
}
```

The JSON response body provides a link to the merged PDF hosted on S3:

```json
{
  "mergedPdf": "https://s3.amazonaws.com/superglue/merged/1ed989e5-026d-41f6-917f-953b4fd35bd8.pdf"
}
```

## Monitoring
You can view how the Lambda function is performing by going into the AWS Console and viewing logs in Cloudwatch.
