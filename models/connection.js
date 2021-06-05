const { MongoClient } = require('mongodb');

const connection = async () => {
  return MongoClient
    .connect(process.env.DB_URL, process.env.OPTIONS)
    .then((conn) => conn.db(process.env.DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connection;
