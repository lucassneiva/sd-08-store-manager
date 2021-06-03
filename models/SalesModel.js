const connection = require('../db');
const { ObjectId } = require('mongodb');
const { results, generateMessage } = require('../services/ErrorMessage');

module.exports = {
  addSales: async (itens) => {
    const db = await connection();
    const sale = {
      itensSold: itens,
    };
    const result = await db.collection('sales').insertMany([sale]);
    return result.ops[0];
  },
  getAllSales: async () => {
    const db = await connection();
    const salesList = await db.collection('sales').find().toArray();
    const result = { sales: salesList };
    return result;
  },
  getOneSale: async (id) => {
    const db = await connection();
    let result = null;
    if (ObjectId.isValid(id)) {
      result = await db.collection('sales').findOne({ _id: ObjectId(id) });
    }
    if (result === null) {
      return generateMessage(results.saleNotFound, 'not_found');
    }
    return result;
  },
};
