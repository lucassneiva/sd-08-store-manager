const { ObjectId } = require('mongodb');
const conn = require('../configs/conn');

const getAll = async() => {
  conn().then(db => db.collection('products').find().toArray());
};

const insertProduct = async(req, res) => {
  conn().then(db => db.collection('products').insert(req.body).toArray());
};


module.exports = {
  getAll,
  insertProduct,

};