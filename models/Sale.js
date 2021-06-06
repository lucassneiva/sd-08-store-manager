const connection = require('./connection');

const getAll = async() => await connection().then(
  (db) => db.collection('sales').find().toArray());

const register = async(sale) => {
  const { insertedId } = await connection().then(
    (db) => db.collection('sales').insertOne({ sale } ));

  return {
    _id: insertedId,
    itensSold: sale
  };
};

module.exports = {
  getAll,
  register,
};
