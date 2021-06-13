const connection = require('./connect');

const addSale = async (saleInfo) => {
  const db = await connection();
  const { insertedId } = db
    .collection('sales')
    .insertOne({ itensSold: saleInfo });
  return {
    _id: insertedId,
    itensSold: saleInfo,
  };
};

module.exports = {
  addSale,
}; 