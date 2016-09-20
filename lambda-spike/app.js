// 'use strict';

const exec = require('child_process').exec;

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';

const pm = require('pdf-merge');
const request = require('request');
const async = require('async');
const zlib = require('zlib');

exports.handler = function(event, context) {
  const base64Data = event.data;
  console.log(base64Data);

  const buffer = Buffer.from(base64Data, 'base64');
  zlib.unzip(buffer, (err, buffer) => {
    if (!err) {
      console.log(buffer.toString());
    } else {
    // handle error
    }
  });


}
