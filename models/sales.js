const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = (sales) => {
  return connection()
    .then((db) => db.collection('sales').insert(sales))
    .then((result) => result.ops[0]);
};

const getSales = () => {
  return connection().then((db) => db.collection('sales').find().toArray());
};

const findSale = (id) => {
  return connection().then((db) => db.collection('sales').findOne(new ObjectId(id)));
};

const updateSale = (id, sales) => {
  return connection()
    .then((db) =>
      db.collection('sales').updateOne(
        {
          _id: new ObjectId(id),
        },
        { $set: { itensSold: sales } },
      ),
    )
    .then(() => ({ _id: id, itensSold: sales }));
};

module.exports = {
  createSale,
  getSales,
  findSale,
  updateSale
};
