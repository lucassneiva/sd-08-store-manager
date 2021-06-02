const connection = require('./connection');

const addNewSale = async (sale) => {
  const db = await connection();
  const { insertedId } = db.collection('sales')
    .insertOne({ itensSold: sale });
  return {
    _id: insertedId,
    itensSold: sale,
  };
};

module.exports = {
  addNewSale,
};