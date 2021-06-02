const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (name, quantity) => 
  // const products = {
  //   _id: '5f43a7ca92d58904914656b6',
  //   name,
  //   quantity,
  // };
  // return products;
  connect().then(async (db) => {
    const products = await db.collection('products').insertOne({ name, quantity });
    console.log('linha 13 model', products.ops[0]);
    return products.ops[0];
  });


const getAll = async () => {
  // const dataProducts = await [{ name: 'Bola de futebol' }, { name: 'raquete'}];
  // return dataProducts;
  connect().then((db) => db.collection('products').find().toArray());
};

const getByName = async (nome) => {
  const productExists = connect()
    .then((db) => db.collection('products').findOne({name: nome}));
  return productExists;
};


// const getById = async (id) => {
//   await ObjectId.isValid(id);
//   const people = connect().then((db) => db.collection('people').findOne(ObjectId(id)));
//   return people;
// };

// const update = async (id, name, age) =>
//   connect().then(async (db) =>
//     (await getById(id))
//       ? db
//         .collection('people')
//         .updateOne({ _id: ObjectId(id) }, { $set: { name, age } })
//       : add(name, age)
//   );

// const exclude = async (id) =>
//   connect().then(async (db) => {
//     const person = await getById(id);
//     db.collection('people').deleteOne({ _id: ObjectId(id) });
//     if (await person) return person;
//   });

module.exports = { 
  create,
  getAll,
  getByName,
  // getById,
  // update,
  // exclude
};
