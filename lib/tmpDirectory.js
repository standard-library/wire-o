import Promise from 'bluebird';
import uuid from 'node-uuid';
import mkdirp from 'mkdirp';

const mkdirpP = Promise.promisify(mkdirp);

function TmpDirectory() {
  this.name = `/tmp/${uuid.v4()}/`;
}

TmpDirectory.prototype.create = function () {
  const createDirectory = mkdirpP(this.name);

  createDirectory.then(() => {
    console.log(`Created ${this.name}`);
  });

  return createDirectory;
}

export default TmpDirectory;
