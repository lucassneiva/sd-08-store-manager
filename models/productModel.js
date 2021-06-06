const connection = require('./connection');
const { ObjectId } = require('bson');

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

const listarProdutos = async () => {
  const db = await connection();
  const listaProduto = await db.collection('products').find().toArray();
  if(listaProduto) return listaProduto;
};

const buscarProdutoPorId = async (id) => {
  const db = await connection();
  const produto = await db.collection('products').findOne(new ObjectId(id));
  return produto;
};

const atualizarProdutoPorId = async ({id, name, quantity}) => {
  const db = await connection();
  await db.collection('products').updateOne(
    {'_id': ObjectId(id)},
    {$set: {
      name,
      quantity
    }}
  );
  return await buscarProdutoPorId(id);
};

const deletarProdutoPorId = async(id) => {
  const db = await connection();
  const produto = await db.collection('products').findOne( new ObjectId(id));
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return produto;
};


module.exports = {
  cadastrarProduto,
  buscarProdutoPorNome,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProdutoPorId,
  deletarProdutoPorId,
};