# pdf="https://s3.amazonaws.com/superglue/hello.pdf"
# pdf="https://s3.amazonaws.com/superglue/ambience.pdf"
pdf="https://s3.amazonaws.com/superglue/PCAH_PDF_TEMPLATE.pdf"
arr=()
comma=","

for i in {1..101}
do
  echo "# of pdfs: " $i
  if  [ $i = "1" ]; then
    arr+=$pdf
    json="{\"pdfUrls\": [\"$arr\"]}"
  elif [ $i = "101" ]; then
    arr+=$comma\"$pdf
    json="{\"pdfUrls\": [\"$arr\"]}"
  else
    arr+=\"$comma\"$pdf
    json="{\"pdfUrls\": [\"$arr\"]}"
  fi

  echo $arr
  echo $json
  curl -w "@curl_format.txt" -o /dev/null -s -H "Accept: application/json" -H "Content-Type: application/json" -X POST -d "$json" https://o64722rmyh.execute-api.us-east-1.amazonaws.com/beta
done
