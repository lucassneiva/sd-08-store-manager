const connection = require('./connections');
const { ObjectID, ObjectId } = require('mongodb');
async function insertSales(sales) {
  try {
    const logInsert = connection()
      .then((db) => db.collection('sales')
        .insertOne({ itensSold: sales}))
      .then((result) => result.ops[0] );
    return logInsert;
  } catch (err) {
    console.log(err);
  }
};

async function getAllSales() {
  const allSales = connection()
    .then((db) => db.collection('sales')
      .find().toArray( ) )
    .then((result) => result );
  // const allProducts = await allProductsPromise;
  return allSales;
}

async function getSaleByID(id) {
  try {
    const saleByID = connection()
      .then((db) => db.collection('sales')
        .findOne( ObjectId(id)))
      .then((result) => result );
    return saleByID;
  } catch (e) {
    console.log(e);
  }
};

async function updateSale( id, productId, quantity ) {
  try {
    connection()
      .then((db) => db.collection('sales')
        .updateOne(
          {_id: ObjectId(id), 'itensSold.productId': productId },
          {$set: {'itensSold.$.quantity': quantity}})
      ).then((result) => result);
  } catch (err) {
    console.log(err);
  }
};

// async function deleteSaleById(id) {
//   try {
//     const deletedSale = await connection()
//       .then((db) => db.collection('sales')
//         .deleteOne({_id: ObjectID(id)}));
//     return deletedSale;
//   } catch (err) {
//     console.log(err);
//   }
// };


const deleteSaleById = async (id) => {
  const deletedSale = await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
  return deletedSale;
};

module.exports = { insertSales, getAllSales, getSaleByID, updateSale, deleteSaleById };
