const connection = require('./connection');

const SALES = 'sales';

const createSales = async (sales) => {
  const db = await connection();
  return db.collection(SALES).insertOne({ itensSold: sales });
};

const getAllSales = async () => {
  const db = await connection();
  return db.collection(SALES).find().toArray();
};

const getSaleById = async (id) => {
  const db = await connection();
  return db.collection(SALES).findOne({ _id: id });
};

const updateSale = async (id, data) => {
  const db = await connection();
  const [{ productId, quantity }] = data;
  // return { id, data, idType: typeof id };
  db.collection(SALES).updateOne(
    { _id: id, },
    { $set: { 'itensSold.$[element].quantity': quantity } },
    { arrayFilters: [{ 'element.productId': productId }] },
  );
  return getSaleById(id);
};

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
  updateSale,
};
