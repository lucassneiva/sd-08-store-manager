const Connection = require('../connection');
const { ObjectId } = require('mongodb');

const cadatraVendaModel = async (itensSold) => {
  const db = await Connection();
  const venda = await db.collection('sales').insertOne({ itensSold });
  return venda.ops[0];
};

module.exports = {
  cadatraVendaModel,
};
