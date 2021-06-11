const { MongoClient } = require('mongodb');
const { URL_MONGO_DATABASE, NAME_OF_DATABASE, OPTIONS } = require('../common/defs');

function connect() {
  return MongoClient.connect(URL_MONGO_DATABASE, OPTIONS)
    .then((conection) => {
      conection.db(NAME_OF_DATABASE);
    })
    .catch((error) => {
      console.log(error);
      process.exit();
    });
}

module.exports = { connect };
