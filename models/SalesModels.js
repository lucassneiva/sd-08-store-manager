const { ObjectId } = require('mongodb');
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

const findSaleById = async (id) => {
  const getSoldsById = await connect()
    .then((db) => db.collection(TABELA_SALES)
      .find(ObjectId(id)).toArray())
    .catch((_err) => console.log('Falhou na busca pelo id!!!'));
  return getSoldsById;
};

const getAllSolds = async () => {
  const getAll = await connect()
    .then((db) => db.collection(TABELA_SALES)
      .find({}).toArray())
    .catch((_err) => console.log('Deu erro ao buscar todos!!!'));
  return getAll;
};

module.exports = {
  addSales,
  findBySale,
  findSaleById,
  getAllSolds,
};