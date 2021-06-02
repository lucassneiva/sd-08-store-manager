const connection = require('../db');
module.exports = {
  addProduct: async (name, quantity) => {
    const db = await connection();
    const result = await db.collection('products').insertOne({
      name,
      quantity,
    });
    return result.ops[0];
  },
  getByName: async (name) => {
    const db = await connection();
    const result = await db.collection('products').findOne({
      name: name,
    });
    return result;
  },
};
