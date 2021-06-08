const { response } = require('express');
const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insert = async (name, quantity) =>
  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const findByName = async (nameNewProduct) =>
  await connection()
    .then((db) => db.collection('products').findOne({ name: nameNewProduct }))
    .then(response => response);

const findById = async (id) =>
  connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .then(response => response)
    .catch(err => console.log(err));

const getAll = async () =>
  connection()
    .then((db) => db.collection('products').find())
    .then(response => response)
    .catch(err => console.log(err));

module.exports = {
  insert,
  findByName,
  findById,
  getAll
};
