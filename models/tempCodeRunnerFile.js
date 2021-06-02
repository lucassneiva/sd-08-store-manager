const connection = require('./connection');
const { DB_NAME } = require('../utils/consts');


const create = async (name, quantity) => {
  return connection()
    .then((db) => db.collection(DB_NAME).insertOne({ name, quantity})
      .then(result => console.log(result)));
};

create('TEST', 10);
