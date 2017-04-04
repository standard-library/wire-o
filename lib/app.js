'use strict';

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';

import downloadPdfs from './downloadPdfs';
import mergePDFs from './mergePdfs';
import uploadToS3 from './uploadToS3';
import storePDF from './storePdf';
import formatResponse from './formatResponse';

const bucket = process.env.s3BucketName;
const prefix = 'merged';

const storage = uploadToS3({ bucket, prefix });
const uploadPDF = storePDF({ storage });

exports.handler = async function (event, context) {
  console.time('Lambda runtime');

  try {
    const filepaths = await downloadPdfs(event.body.pdfUrls);
    const buffer = await mergePDFs(filepaths);
    const url = await uploadPDF(buffer);
    const response = formatResponse(url);

    context.succeed(response);
    console.log('Response:', response);
  } catch (error) {
    console.log('Something went wrong:', error);
  } finally {
    console.timeEnd('Lambda runtime');
  }
}
