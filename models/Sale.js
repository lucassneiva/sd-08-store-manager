const connection = require('./connection');

const SALES_COLLECTION = 'sales';

const create = async (itensSold) => {
  const conn = await connection();
  const { insertedId } = await conn.collection(SALES_COLLECTION).insertMany(itensSold);
  return insertedId;
};

module.exports = {
  create,
};
