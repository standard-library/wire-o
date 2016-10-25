var uuid = require('node-uuid');

function storePdf(config) {
  const storage = config.storage;

  function configuredStorePdf(buffer) {
    console.time('Store merged PDF');

    const key = `merged/${uuid.v4()}.pdf`;
    const store = storage(key, buffer);

    store.then(function (data) {
      console.timeEnd('Store merged PDF');
      console.log(`S3 Data: ${data}`);
    });

    return store;
  }

  return configuredStorePdf;
}

module.exports = storePdf;
