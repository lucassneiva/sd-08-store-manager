const connection = require('./connection');
const { ObjectId } = require('mongodb');

const tryCatch = (callback) =>
  async (...args) => {
    try {
      return callback(...args);
    } catch (error) {
      console.log(error.message);
      return process.exit(1);
    }
  };

const registerSale = tryCatch(async (sale) => {
  const db = await connection();

  const { insertedId } = await db.collection('sales').insertOne({itensSold: sale});

  return { _id: insertedId, itensSold: sale };
});

const getAllSales = tryCatch(async () => {
  const db = await connection();

  const result = await db.collection('sales').find().toArray();

  return result;
});

const getById = tryCatch(async (id) => {
  const db = await connection();

  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });

  return result;
});

const updateById = tryCatch(async (id, data) => {
  const db = await connection();

  const updateProduct = await db
    .collection('sales')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: {
        itensSold: [{ productId: data[0].productId, quantity: data[0].quantity }]
      }  }
    );

  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });

  return result;
});

const deleteById = tryCatch(async (id) => {
  const db = await connection();

  const productToDelete = await db.collection('sales').findOne({ _id: ObjectId(id) });

  const deleteProduct = await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return productToDelete;
});

module.exports = {
  registerSale,
  getAllSales,
  getById,
  updateById,
  deleteById
};
