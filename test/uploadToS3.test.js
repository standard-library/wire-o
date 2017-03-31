'use strict';

import { expect } from 'chai';
import AWS from 'aws-sdk';
import sinon from 'sinon';

import uploadToS3 from '../lib/uploadToS3';

describe('uploadToS3 module', function () {
  it('returns function', function (done) {
    expect(uploadToS3({ bucket: 'foo-bar' })).to.be.an.instanceof(Function);
    done();
  });

  it('passes in params to upload function', function (done) {
   const uploadPromise = {
      promise: function () {
        return new Promise(function (resolve, _) {
          return resolve({ Location: 'https://s3.amazonaws.com/superglue/hello.pdf' });
        })
       }
    };

    AWS.S3.prototype.upload = sinon.stub().returns(uploadPromise);
    const upload = uploadToS3({ bucket: 'foo-bar'});

    upload('foo.pdf', 'bodybodybodybody').then(function (response) {
      const stubArgs = AWS.S3.prototype.upload.firstCall.args[0];

      expect(stubArgs['Bucket']).to.equal('foo-bar');
      expect(stubArgs['Key']).to.equal('foo.pdf');
      expect(stubArgs['Body']).to.equal('bodybodybodybody');
      expect(stubArgs['ACL']).to.equal('public-read');
      done();
    });
  });

  it ('returns location of PDF', function (done) {
    const uploadPromise = {
      promise: function () {
        return new Promise(function (resolve, _) {
          return resolve({ Location: 'https://s3.amazonaws.com/superglue/hello.pdf' });
        })
       }
    };

    AWS.S3.prototype.upload = sinon.stub().returns(uploadPromise);
    const upload = uploadToS3({ bucket: 'foo-bar'});

    upload('foo.pdf', 'wire-o').then(function (response) {
      expect(response).to.equal('https://s3.amazonaws.com/superglue/hello.pdf');
      done();
    });
  });
});