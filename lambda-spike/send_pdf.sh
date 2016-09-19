pcah_pdf=$( base64 PCAH_PDF_TEMPLATE.pdf )

curl -X POST -d "{\"data\":\"$pcah_pdf\"}" https://qwonyr4g55.execute-api.us-west-2.amazonaws.com/beta
