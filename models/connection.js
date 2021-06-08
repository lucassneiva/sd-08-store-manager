const { MongoClient } = require('mongodb');
const { mongodbConnection } = require('../.env');
const { getURL } = require('../utils');

const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

let db = null;

const connection = () => {
  return db ? Promise.resolve(db)
    : MongoClient.connect(getURL(mongodbConnection), OPTIONS)
      .then((conn) => {
        db = conn.db(mongodbConnection.database);
        return db;
      })
      .catch((err) =>{
        console.log(err);
        process.exitCode = 1;
      });
};

module.exports = connection;
