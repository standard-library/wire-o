# Superglue: AWS Lambda Spike

🏐 *front-end spike URL* 🏐: https://s3.amazonaws.com/superglue/index.html

## Endpoint

**POST request to `https://o64722rmyh.execute-api.us-east-1.amazonaws.com/beta?pdfUrls=pdf1,pdf2,pdf3`**

For the AWS Lambda Spike, an API Endpoint was created using API Gateway. With this endpoint (which, for non-spike purposes, would most likely be renamed to something like `https://o64722rmyh.execute-api.us-east-1.amazonaws.com/superglue/pdfs`), the JSON request body looks something like this:

```
{
  "pdfUrls":
    [
      "https://s3.amazonaws.com/superglue/PCAH_PDF_TEMPLATE.pdf",
      "https://s3.amazonaws.com/superglue/hello.pdf"
    ]
}
```

The JSON response body provides a link (for instance, 	
`https://s3.amazonaws.com/superglue/merged/1ed989e5-026d-41f6-917f-953b4fd35bd8.pdf`)to the merged PDF uploaded to S3, which is set to be deleted from S3 after one day. For non-spike purposes, this would change so that the response would look something like...

```
{
  "mergedPdf": "https://s3.amazonaws.com/superglue/merged/1ed989e5-026d-41f6-917f-953b4fd35bd8.pdf"
}
```

## Performance Testing & Benchmarking

Run './bin/test_lambda', which sends more and more of the `https://s3.amazonaws.com/superglue/hello.pdf` PDF to be merged. It first starts off with merging 1 PDF to sending 100 PDFs to merge. After you start this script, you can then look in AWS CloudWatch to see the metrics of each run.

## Want to update the Lambda?

### Upload Lambda to AWS Using the AWS CLI

#### First things first: Get the tools you need

You can use the AWS Console, but the AWS CLI allows for the scripting of Lambda uploads. Here's how to get it:

1. Install pip first if you don't have it already with `sudo easy_install pip` (on Mac OSX)
2. Install the CLI with `sudo -H pip install awscli --upgrade --ignore-installed six` (on Mac OSX)

After the AWS CLI is installed...

1. Get the Access Key & Secret Access Key from me :-)
2. `aws configure` in bash
3. Put in the Access & Secrety Access keys

#### Zip and upload!

Run `./bin/zip_and_send_lambda` (zips Lambda files and updates function)

#### Send pdf as byte64 string to API Gateway for Lambda manual testing

(not currently using this, but maybe use it again in the future)

Run `./bin/send_pdf`
