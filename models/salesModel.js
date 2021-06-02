const { ObjectId } = require('bson');
const connection = require('./connection');

const createSale = async (sale) => {
  const db = await connection();
  await db.collection('sales').insertOne({ itensSold: sale });
  const result = await db.collection('sales').find().toArray();
  return result[0];
};

const getAllSales = async () => {
  const db = await connection();
  const salesList = await db.collection('sales').find().toArray();
  if (salesList) return salesList;
};

const findById = async (id) => {
  // if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const sale = await db.collection('sales').findOne(new ObjectId(id));
  return sale;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const saleById = await findById(id);
  // if (!saleById) {
  //   return false;
  // }
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  // console.log(saleById);
  return saleById;
};


const updateSale = async (id, sale) => {
  const db = await connection();
  await db.collection('sales').updateOne({ _id: id}, { $set: { itensSold: sale } });
  return { _id: id, itensSold: sale };
};

// const findSale = async (sale) => {
//   const db = await connection();
//   const sales = await db.collection('sales').findOne({ itensSold: sale });
//   if (sales) return sales;
// };


module.exports = { createSale, getAllSales, findById, deleteSale, updateSale };
