const connection = require('./connection');

const SALES = 'sales';

const create = async (sale) => {
  try {
    const db = await connection();
    const { insertedId } = await db.collection(SALES).insertOne({ itensSold: [...sale] });
    return insertedId;
  } catch (err) {
    return null;
  }
};

module.exports = {
  create,
};
