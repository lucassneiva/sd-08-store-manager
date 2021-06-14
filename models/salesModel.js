const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (productsSold) => {
  const db = await connection();
  const { ops: [sales] } = await db.collection('sales')
    .insertOne({ 'itensSold': productsSold });
  // console.log('create salesModel', sales);
  return sales;
};

const findById = async (productsSold) => {
  const ids = productsSold.map(({ productId }) => ObjectId(productId));
  // console.log('MODEL ids', ids);
  const db = await connection();
  const findById = await db.collection('products')
    .find({ _id: { $in: ids } }).toArray();
  // console.log('MODEL findById', findById);
  return findById;
};

const getAll = async () => {
  const db = await connection();
  return await db.collection('sales')
    .find().toArray();
};

const getByIds = async (id) => {
  const db = await connection();
  return await db.collection('sales')
    .find({ _id: ObjectId(id) }).toArray();
};

// [
//   {
//   "productId": "product_id",
//   "quantity": "product_quantity",
//   },
//   ...
// ]
// { "itensSold": [{ "productId": "5f43cbf4c45ff5104986e81d", "quantity": 2 }] }
// {
//   "sales": [
//     {
//       "_id": "5f43ba333200020b101fe4a0",
//       "itensSold": [
//         {
//           "productId": "5f43ba273200020b101fe49f",
//           "quantity": 2
//         }
//       ]
//     },
//     {
//       "_id": "5f43ba333200020b101fe4a0",
//       "itensSold": [
//         {
//         "productId": "5f43ba273200020b101fe49f",
//           "quantity": 2
//         }
//       ]
//     }
//   ]
// }


// const updateById = async (id, name, brand) => {
//   const db = await connection();
//   return await db.collection('products')
//     .updateOne({ _id: ObjectId(id) }, { $set: { name, brand } });
// };

// const deleteById = async (id) => {
//   const db = await connection();
//   const product = await findById(id);
//   await db.collection('products')
//     .deleteOne({ _id: ObjectId(id) });
//   return product;
// };

module.exports = {
  create,
  findById,
  getAll,
  getByIds,
  // updateById,
  // deleteById,
};