const Promise = require('bluebird');
const uuid = require('node-uuid');
const mkdirp = Promise.promisify(require('mkdirp'));

function TmpDirectory() {
  this.name = `/tmp/${uuid.v4()}/`;
}

TmpDirectory.prototype.create = function () {
  const createDirectory = mkdirp(this.name);

  createDirectory.then(() => {
    console.log(`Created ${this.name}`);
  });

  return createDirectory;
}

module.exports = TmpDirectory;
