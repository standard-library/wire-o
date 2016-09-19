// 'use strict';

const exec = require('child_process').exec;

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';

const pm = require('pdf-merge');
const request = require('request');
const async = require('async');

exports.handler = function(event, context) {
  console.log(event);
}
