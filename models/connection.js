const { MongoClient } = require('mongodb');
// const { URL_MONGO_DATABASE, NAME_OF_DATABASE, OPTIONS } = require('../common/defs');
const URL_MONGO_DATABASE = 'mongodb://localhost:27017/StoreManager';
const NAME_OF_DATABASE = 'StoreManager';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function connection() {
  return MongoClient.connect(URL_MONGO_DATABASE, OPTIONS)
    .then((conection) => {
      console.log(conection);
      conection.db(NAME_OF_DATABASE);
    })
    .catch((error) => {
      console.log(error);
      process.exit();
    });
}

module.exports = { connection };
