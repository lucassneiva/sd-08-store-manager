const connection = require('./connection');

const createProductModel = async ({ name, quantity }) => {
  try {
    const db = await connection();
    const product = await db.collection('products').findOne({ name });
    if (product) return 'not unique';
    const { ops } = await db.collection('products').insertOne({ name, quantity });
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
  createProductModel,
};
