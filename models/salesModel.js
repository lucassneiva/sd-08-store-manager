const { ObjectID, ObjectId } = require('bson');
const connect = require('./connection');
const productModel = require('./productsModel');
const ZERO = 0;

const addSales = async (data) => {
  const result = await connect()
    .then((db) => db.collection('sales').insertOne({ itensSold: data }));

  const newData = data.map(sale => ({...sale}));
  newData[0].quantity = newData[0].quantity * -1;
  await  productModel.updateQuantityProduct(newData);

  return {
    _id: result.insertedId,
    itensSold: data,
  };
};

const getAllSales = async () => {
  const result = await connect()
    .then((db) => db.collection('sales').find().toArray());
  return result;
};

const findByIdSales = async (id) => {
  const result = await connect()
    .then((db) => ObjectID.isValid(id)
      ? db.collection('sales').find({ _id: ObjectID(id) }).toArray()
      : null);

  return result;
};

const updateSales = async (id, data) => {
  const result = await connect()
    .then((db) => db.collection('sales').updateOne({ _id: ObjectID(id) },
      { $set:  { itensSold: data } }))
    .then(() => ({ _id: id, itensSold: data }));

  await  productModel.updateQuantityProduct(data);
  return result;
};

const deleteSales = async (id) => {
  const result = await connect()
    .then((db) => ObjectID.isValid(id)
      ? db.collection('sales').findOneAndDelete({ _id: ObjectID(id) })
      : false );

  if (result) {
    const { value: { itensSold } } = result;
    await  productModel.updateQuantityProduct(itensSold);
    return result;
  }
};

module.exports = {
  addSales,
  getAllSales,
  findByIdSales,
  updateSales,
  deleteSales
};
