const { ObjectId } = require('mongodb');
const conn = require('../configs/conn');

const getAll = async(_req, res) => {
  const status = 200;
  const result = conn().then(db => db.collection('products').find().toArray());
  res.status(status).send(result);
};

const insertProduct = async(req, res) => {
  const status = 200;
  conn().then(db => db.collection('products').insert(req.body));
  res.status(status).send(ops.ObjectId);
};


module.exports = {
  getAll,
  insertProduct,

};