const { ObjectId } = require('mongodb');
const connect = require('./connection');

const checkSaleExistsByName = async (name) => {
  const connection = await connect();
  const sale = await connection.collection('sales').findOne({ name });

  return Boolean(sale);
};

const createSale = async (itensSold) => {
  const connection = await connect();
  const newSale = await connection.collection('sales').insertOne({
    itensSold,
  });

  return newSale.ops[0];
};

const updateSale = async (_id, itensSold) => {
  const connection = await connect();
  const updatedSale = await connection.collection('sales').updateOne(
    { _id: ObjectId(_id) },
    {
      $set: { itensSold }
    }
  );

  return updatedSale;
};

const deleteSale = async (_id) => {
  try {
    const connection = await connect();

    const saleToDelete = await connection
      .collection('sales')
      .findOne({ _id: ObjectId(_id) });
    if (!saleToDelete) return;

    const deletedStatus = await connection
      .collection('sales')
      .deleteOne({ _id: ObjectId(_id) });
    if (deletedStatus.deletedCount !== 1) return;

    return saleToDelete;
  } catch {
    return;
  }
};

const listSales = async (_id) => {
  const connection = await connect();
  if (_id) {
    try {
      const sale = await connection.collection('sales').findOne({ _id: ObjectId(_id) });
      return sale;
    } catch {
      return;
    }
  }
  const sales = await connection.collection('sales').find().toArray();
  return sales;
};

module.exports = {
  updateSale,
  checkSaleExistsByName,
  createSale,
  deleteSale,
  listSales,
};
