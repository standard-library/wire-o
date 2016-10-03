npm install
rm app.zip
zip -r app.zip app.js bin lib node_modules
aws lambda update-function-code --region us-east-1 --function-name arn:aws:lambda:us-east-1:397120925662:function:mergePdfs --zip-file fileb://app.zip
