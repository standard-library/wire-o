var Promise = require('bluebird');
var uuid = require('node-uuid');
var mkdirp = Promise.promisify(require('mkdirp'));

function TmpDirectory() {
  this.name = `/tmp/${uuid.v4()}/`;
}

TmpDirectory.prototype.create = function () {
  var createDirectory = mkdirp(this.name);

  createDirectory.then(() => {
    console.log(`Created ${this.name}`);
  });

  return createDirectory;
}

module.exports = TmpDirectory;
