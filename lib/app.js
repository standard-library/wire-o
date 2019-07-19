'use strict';

process.env['PATH'] = `${process.env['PATH']}:${process.env['LAMBDA_TASK_ROOT']}/bin`;
process.env['LD_LIBRARY_PATH'] = `${process.env['LAMBDA_TASK_ROOT']}/bin`;

import "core-js/stable";
import "regenerator-runtime/runtime";

import downloadPdfs from './downloadPdfs';
import mergePDFs from './mergePdfs';
import uploadToS3 from './uploadToS3';
import storePDF from './storePdf';
import formatResponse from './formatResponse';

const bucket = process.env.s3BucketName;
const prefix = 'merged';

const storage = uploadToS3({ bucket, prefix });
const uploadPDF = storePDF({ storage });

const mergeUrls = async urls => {
  const filepaths = await downloadPdfs(urls);
  const buffer = await mergePDFs(filepaths);

  return uploadPDF(buffer);
};

exports.handler = (event, context) => {
  console.time("Lambda runtime");

  const merge = mergeUrls(event.body.pdfUrls);

  merge.then(url => {
    context.succeed(formatResponse(url));
    console.log("Response:", response);
    console.timeEnd("Lambda runtime");
  });

  merge.catch(error => {
    console.log("Something went wrong:", error);
  });
};
