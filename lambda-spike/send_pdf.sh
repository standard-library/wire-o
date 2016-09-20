# zip any pdfs in the pdf folder
rm ./pdf/pdfs.tar.gz

# compress pdfs into a gzipped tarball
tar cvzf ./pdf/pdfs.tar.gz ./pdf/*.pdf

# convert tar.gz into base64 string
tar_gzipped_pdfs=$( base64 ./pdf/pdfs.tar.gz)
#
curl -X POST -d "{\"data\":\"$tar_gzipped_pdfs\"}" https://o64722rmyh.execute-api.us-east-1.amazonaws.com/beta
