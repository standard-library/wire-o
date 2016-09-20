pcah_pdf=$( base64 PCAH_PDF_TEMPLATE.pdf )

curl -X POST -d "{\"data\":\"$pcah_pdf\"}" https://o64722rmyh.execute-api.us-east-1.amazonaws.com/beta
