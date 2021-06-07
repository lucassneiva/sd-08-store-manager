const connection = require('./connection');

const create = async (name, quantity) => 
  connection()
    .then((db) => db.collection('products').insertOne({name, quantity}))
    .then((data) => {
      const [result] = data.ops;
      console.log(`Estou no model com o ${result}`);
      console.log(result);
      console.log('-----------------');
      return result;
    });

const getAll = () => {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((data) => data);
};

module.exports = {
  create,
  getAll,
};
