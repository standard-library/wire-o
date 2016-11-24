# Superglue

## Endpoint

**POST request to `https://o64722rmyh.execute-api.us-east-1.amazonaws.com/beta?pdfUrls=pdf1,pdf2,pdf3`**

An API Endpoint was created using AWS API Gateway. With this endpoint, the JSON request body accepts an array of `pdfUrls`:

```
{
  "pdfUrls": [
    "https://s3.amazonaws.com/superglue/PCAH_PDF_TEMPLATE.pdf",
    "https://s3.amazonaws.com/superglue/hello.pdf"
  ]
}
```

The JSON response body provides a link to the merged PDF hosted on S3, which is set to be deleted from S3 after one day.

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
