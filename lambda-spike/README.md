# Superglue: AWS Lambda Spike

## Upload Lambda to AWS Using the AWS CLI

You can use the AWS Console, but the AWS CLI allows for the scripting of Lambda uploads. Here's how to get it:
1. Install pip first if you don't have it already with `sudo easy_install pip` (on Mac OSX)
2. Install the CLI with `sudo -H pip install awscli --upgrade --ignore-installed six` (on Mac OSX)

### configure AWS on your machine
(after the AWS CLI is installed)
- `aws configure`
- get the Access Key & Secret Access Key from me :-)
- in your `.aws/config` file, add the following:
```
[profile stdlib]
role_arn = arn:aws:iam::397120925662:role/service-role/stdlib-role
source_profile = default
```

### zip
run `./zip_it.sh` (script only zips things, doesn't upload, right now)

### send pdf as byte64 string to API Gateway
run `./send_pdf.sh` 
