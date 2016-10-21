var Promise = require('bluebird');
var uuid = require('node-uuid');
var mkdirp = Promise.promisify(require('mkdirp'));

function Directory() {
  this.name = '/tmp/' + uuid.v4() + '/';
}

Directory.prototype.create = function () {
  var createDirectory = mkdirp(this.name);

  createDirectory.then(() => {
    console.log('Created ' + this.name);
  });

  return createDirectory;
}

module.exports = Directory;
