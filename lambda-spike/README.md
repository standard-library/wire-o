# Superglue: AWS Lambda Spike

🏐 *front-end spike URL* 🏐: https://s3.amazonaws.com/superglue/index.html

## Upload Lambda to AWS Using the AWS CLI

### First things first: Get the tools you need
You can use the AWS Console, but the AWS CLI allows for the scripting of Lambda uploads. Here's how to get it:

1. Install pip first if you don't have it already with `sudo easy_install pip` (on Mac OSX)
2. Install the CLI with `sudo -H pip install awscli --upgrade --ignore-installed six` (on Mac OSX)

After the AWS CLI is installed...

1. Get the Access Key & Secret Access Key from me :-)
2. `aws configure` in bash
3. Put in the Access & Secrety Access keys

### Zip and upload!
Run `./zip_and_send_lambda.sh` (zips Lambda files and updates function)

### Send pdf as byte64 string to API Gateway for Lambda manual testing
(not currently using this, but maybe use it again in the future)
run `./send_pdf.sh`
