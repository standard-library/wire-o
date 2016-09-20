# zip any pdfs in the pdf folder
rm ./pdf/pdf.zip
zip -r ./pdf/pdf.zip ./pdf/

# convert zip into base64 string
pdf_zip=$( base64 ./pdf/pdf.zip)

curl -X POST -d "{\"data\":\"$pdf_zip\"}" https://o64722rmyh.execute-api.us-east-1.amazonaws.com/beta
