const connection = require('./connection');

const PRODUCTS = 'products';

const create = async ({ name, quantity }) => {
  try {
    const db = await connection();
    const products = await db.collection(PRODUCTS).findOne( { name: name });
    if (products) return 'found';
    const { ops } = await db.collection(PRODUCTS).insertOne({ name, quantity });
    const [result] = ops.map(({ _id, name, quantity }) => ({
      _id,
      name,
      quantity,
    }));
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = {
  create,
};
