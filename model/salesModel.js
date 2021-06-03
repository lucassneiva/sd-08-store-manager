const connection = require ('../data/connection');

async function addSale(req){
  const { body } = req;
  const data = await connection().then((db) =>
    db.collection('sales').insertOne({itensSold: body}));
  return {
    _id: data.insertedId,
    itensSold: body
  };
}

module.exports = {
  addSale
};
