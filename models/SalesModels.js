const connect = require('./Connect');

const TABELA_SALES = 'sales';

const addSales = async (sale) => {
  const add = await connect()
    .then((db) => db.collection(TABELA_SALES)
      .insertOne({ itensSold: sale }))
    .catch((_err) => console.log('Não salvou a venda!!!'));
  return add;
};

const findBySale = async (sale) => {
  const findBySales = await connect()
    .then((db) => db.collection(TABELA_SALES)
      .findOne({ itensSold: sale }))
    .catch((_err) => console.log('Não salvou a venda!!!'));
  return findBySales;
};

module.exports = {
  addSales,
  findBySale,
};