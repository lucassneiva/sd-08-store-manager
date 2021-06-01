const connection = require('./connection');

const create = async (name, quantity) => {
  const productsCollection = await connection()
    .then(db => db.collection('products'));

  const result = await productsCollection.insertOne({ name, quantity });

}

module.exports = {
  create,
}