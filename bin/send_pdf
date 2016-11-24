tar cvzf ./pdf/first_pdf.tar.gz ./pdf/PCAH_PDF_TEMPLATE.pdf
tar cvzf ./pdf/second_pdf.tar.gz ./pdf/hello.pdf

first_pdf_targz=$( base64 ./pdf/first_pdf.tar.gz)
second_pdf_targz=$( base64 ./pdf/second_pdf.tar.gz)
curl -X POST -d "{\"data\": [\"$first_pdf_targz\", \"$second_pdf_targz\"]}" https://o64722rmyh.execute-api.us-east-1.amazonaws.com/beta
