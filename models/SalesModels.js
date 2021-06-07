const { ObjectId, ObjectID } = require('mongodb');
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

const updateSale = async (id, sale) => {
  const updateSales = await connect()
    .then((db) => db.collection(TABELA_SALES)
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } }))
    .catch((_err) => console.log('Não atualizei!!!'));
  return updateSales;
};

const deleteSale = async (id) => {
  const delet = await connect()
    .then((db) => db.collection(TABELA_SALES)
      .deleteOne({ _id: ObjectID(id) }))
    .catch((_err) => console.log('Não foi deletado'));
  return delet;
};

module.exports = {
  addSales,
  findBySale,
  findSaleById,
  getAllSolds,
  updateSale,
  deleteSale,
};