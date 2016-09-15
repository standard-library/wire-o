var pm = require('pdf-merge')
var request = require('request');

exports.handler = function(event, context) {
  // api would get the pdf as base 64
  // so this is mimicking that for now until have something set up locally
  // http://stackoverflow.com/questions/2820249/base64-encoding-and-decoding-in-client-side-javascript
  var url = 'https://s3-us-west-2.amazonaws.com/pdftestspike/PCAH_PDF_TEMPLATE.pdf';
  var request = require('request').defaults({ encoding: null });

  request.get(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
        console.log(data);
    }
  });
}
