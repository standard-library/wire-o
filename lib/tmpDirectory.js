import Promise from 'bluebird';
import uuid from 'node-uuid';
import mkdirp from 'mkdirp';

const mkdirpP = Promise.promisify(mkdirp);

/**
* Creates a uniquely-named directory within the Lambda server's /tmp directory.
This way, if the Lambda server gets reused in running the function, then there won't
be any existing files in this uniqely-named directory to address.
@returns {Object} - Promise to create a directory with a unique name within /tmp, TmpDirectory~createDirectory
 */

function TmpDirectory() {
  this.name = `/tmp/${uuid.v4()}/`;
}

TmpDirectory.prototype.create = function () {

  /**
  * TmpDirectory~createDirectory
  * @param {String} name - The filepath where the downloaded PDF will be saved
   */

  const createDirectory = mkdirpP(this.name);

  createDirectory.then(() => {
    console.log(`Created ${this.name}`);
  });

  return createDirectory;
}

export default TmpDirectory;
