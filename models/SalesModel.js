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
};
