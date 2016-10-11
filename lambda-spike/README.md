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
  "mergedPDF": "https://s3.amazonaws.com/superglue/merged/1ed989e5-026d-41f6-917f-953b4fd35bd8.pdf"
}
```
## Performance Testing & Benchmarking

Run './test_lambda.sh', which sends more and more of the `https://s3.amazonaws.com/superglue/hello.pdf` PDF to be merged. It first starts
off with merging 1 PDF to sending 100 PDFs to merge. After you start this script, you can then look in AWS CloudWatch to see the metrics of each run.

### Results from initial performance run on 10/3/2016

*Size of PDF*: 7.3kb

[duration_graph]: https://github.com/standard-library/superglue/blob/aws-lambda/lambda-spike/perf/duration.png "duration graph"

![alt text][duration_graph]

Average Lambda duration went from ~2624ms at the beginning (1 PDF to merge) to ~7826 ms (100 PDFs to merge) to the end.
It’s interesting seeing how the lambda warms up; the first run (1 PDF to merge) took 4242ms, but the second run (2 PDFs to merge) took 1158ms.

Various parts of the process were logged in CloudWatch:

```
- # of files to merge: 1
- save pdfs to tmp directory: 702ms
- get file names of files in tmp directory: 1ms
- merge pdfs: 979ms
- delete files in tmp folder after merging pdfs: 1ms
- upload merged pdf to S3: 1ms
- total lambda runtime: 4242ms
```
```
- # of files to merge: 2
- save pdfs to tmp directory: 175ms
- get file names of files in tmp directory**: 1ms
- merge pdfs: 825ms
- delete files in tmp folder after merging pdfs**: 0ms
- **upload merged pdf to S3:  0ms
- total lambda runtime: 1158ms
```
```
- # of files to merge: 25
- save pdfs to tmp directory: 1562ms
- get file names of files in tmp directory: 57ms
- merge pdfs: 1780ms
- delete files in tmp folder after merging pdfs: 0ms
- upload merged pdf to S3:  0ms
- total lambda runtime: 3896ms
```
```
- # of files to merge: 50
- save pdfs to tmp directory: 3296ms
- get file names of files in tmp directory: 14ms
- merge pdfs: 3000ms
- delete files in tmp folder after merging pdfs: 0ms
- upload merged pdf to S3:  0ms
- total lambda runtime: 6488ms
```
```
- # of files to merge: 75
- save pdfs to tmp directory: 3986ms
- get file names of files in tmp directory: 1ms
- merge pdfs: 3829ms
- delete files in tmp folder after merging pdfs: 0ms
- upload merged pdf to S3:  0ms
- total lambda runtime: 8193ms
```
```
- # of files to merge: 100
- max memory used: 118 MB
- save pdfs to tmp directory: 4910ms
- get file names of files in tmp directory: 58ms
- merge pdfs: 5179ms
- delete files in tmp folder after merging pdfs: 17ms
- upload merged pdf to S3: 17ms
- total lambda runtime: 10407ms
```

### Results from 2nd performance run on 10/10/2016

This run was performed using a larger PDF than in the 1st run.
*Size of PDF*: 18.7kb

[duration_graph2]: https://github.com/standard-library/superglue/blob/aws-lambda/lambda-spike/perf/duration2.png "duration graph"

![alt text][duration_graph2]
Average Lambda duration went from ~4220ms at the beginning (1 set of PDFs to merge) to ~11600ms (100 set of PDFS to merge).

```
- # of files to merge: 1
- save pdfs to tmp directory: 597ms
- get file names of files in tmp directory: 2ms
- merge pdfs: 979ms
- delete files in tmp folder after merging pdfs: 0ms
- upload merged pdf to S3: 0ms
- total lambda runtime: 3759ms
```
```
- # of files to merge: 2
- save pdfs to tmp directory: 136ms
- get file names of files in tmp directory: 19ms
- merge pdfs: 900ms
- delete files in tmp folder after merging pdfs: 0ms
- upload merged pdf to S3: 0ms
- total lambda runtime: 1204ms
```
```
- # of files to merge: 25
- save pdfs to tmp directory: 1421ms
- get file names of files in tmp directory: 1ms
- merge pdfs: 2617ms
- delete files in tmp folder after merging pdfs: 0ms
- upload merged pdf to S3: 0ms
- total lambda runtime: 4219ms
```
```
- # of files to merge: 50
- save pdfs to tmp directory: 2960ms
- get file names of files in tmp directory: 0ms
- merge pdfs: 4180ms
- delete files in tmp folder after merging pdfs: 20ms
- upload merged pdf to S3: 1ms
- total lambda runtime: 7680ms
```
```
- # of files to merge: 75
- save pdfs to tmp directory: 3710ms
- get file names of files in tmp directory: 78ms
- merge pdfs: 5881ms
- delete files in tmp folder after merging pdfs: 12ms
- upload merged pdf to S3: 0ms
- total lambda runtime: 10048ms
```
```
- # of files to merge: 100
- save pdfs to tmp directory: 5298ms
- get file names of files in tmp directory: 31ms
- merge pdfs: 7320ms
- delete files in tmp folder after merging pdfs: 1ms
- upload merged pdf to S3: 0ms
- total lambda runtime: 12920ms
```

### Results from 3rd performance run on 10/10/2016
22:46:37.773Z
This run was performed using a larger PDF than in the 1st run.
*Size of PDF*: 96.7kb

### How to download logs (goes up to 10,000 log events) on the AWS CLI:

```
aws logs get-log-events --region us-east-1 --log-group-name /aws/lambda/mergePdfs --log-stream-name 2016/10/03/[\$LATEST]e00b77d0d762412dbe7ecdcf3d3da7e3 --output text>lambda.log
```


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
Run `./zip_and_send_lambda.sh` (zips Lambda files and updates function)

#### Send pdf as byte64 string to API Gateway for Lambda manual testing
(not currently using this, but maybe use it again in the future)
run `./send_pdf.sh`
