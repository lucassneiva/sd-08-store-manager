const { response } = require('express');
const connection = require('./connection');

const insert = async (name, quantity) =>
  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const findByName = async (nameNewProduct) =>
  await connection()
    .then((db) => db.collection('products').findOne({ name: nameNewProduct }))
    .then(response => response);

module.exports = {
  insert,
  findByName
};
