const connection = require('./connection');

const create = async (itensSold) => {

  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({itensSold})
    );

  return { _id: insertedId, itensSold };
};

module.exports = { create };