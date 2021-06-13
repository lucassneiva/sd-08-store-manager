const connection = require('./connection');

async function create({name, quantity}) {
  try {
    const db = await connection();
    const { insertedId } = db.collection('products').insertOne({ name, quantity });
    return {
      _id: insertedId,
      name,
      quantity
    };
  } catch (error) {

  }
}


module.exports = {
  create
};
