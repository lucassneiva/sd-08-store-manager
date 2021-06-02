const connection = require('./connection');

const getAll = async () => connection()
  .then((db) => (db).collection('sales').find().toArray()); 

module.exports = {
  getAll,
};