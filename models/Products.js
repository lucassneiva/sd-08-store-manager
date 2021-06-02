const connection = require('./connection');

const create = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity})
      .then(result => result.ops[0]));
};

create('TEST', 10);
