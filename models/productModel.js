const connection = require('./connection');

const buscarProdutoPorNome = async ({name}) =>{
  const db = await connection();
  const produtos = await db.collection('products').findOne({name: name});
  return produtos;
};

const cadastrarProduto = async ({name, quantity}) =>{
  const db = await connection();
  const { ops } = await db.collection('products').insertOne({ name, quantity });
  const [result] = ops.map(({ _id, name, quantity }) => ({
    _id,
    name,
    quantity,
  }));
  return result;
};


module.exports = {
  cadastrarProduto,
  buscarProdutoPorNome
};