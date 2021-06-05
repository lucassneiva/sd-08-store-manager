const connect = require('./Connect');

const TABELA_PRODUCTS = 'products';

const addProduct = async (name, quantity) => {
  const add = await connect()
    .then((db) => db.collection(TABELA_PRODUCTS)
      .insertOne({ name, quantity }))
    .catch((_err) => console.log('Deu erro ao adicionar'));
  return add;
};

const findOneProduct = async (name) => {
  const find = await connect()
    .then((db) => db.collection(TABELA_PRODUCTS)
      .find({ name }).toArray())
    .catch((_err) => []);
  return find;
}

module.exports = {
  addProduct,
  findOneProduct,
};
