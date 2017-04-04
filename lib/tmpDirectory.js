import Promise from 'bluebird';
import uuid from 'node-uuid';
import mkdirp from 'mkdirp';

const mkdirpP = Promise.promisify(mkdirp);

/**
 * TmpDirectory constructor, with a name identifying its filepath
 * @class
 */
function TmpDirectory() {
  this.name = `/tmp/${uuid.v4()}/`;
}

/**
 * Returns promise to create uniquely-named directory within the Lambda server's /tmp directory.
 * This way, if the Lambda server gets reused in running the function, then there won't
 * be any existing files in this uniqely-named directory to address.
 * @returns {Promise} - Promise to create a directory with a unique name
 */
TmpDirectory.prototype.create = function () {
  const createDirectory = mkdirpP(this.name);

  createDirectory.then(() => {
    console.log(`Created ${this.name}`);
  });

  return createDirectory;
}

export default TmpDirectory;
