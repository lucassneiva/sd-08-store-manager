const connection = require('./connection');


async function getAll() {
  try {
    let db = await connection();
    return db.collection('products').find().toArray();
  } catch (error) {
    return error;
  }
}


module.exports = {
  getAll
};
