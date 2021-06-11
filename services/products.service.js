const { connect } = require('../models/connect');
const { ObjectId } = require('bson');

const registerNewProduct = async (name, quantity) => {
  return connect().then((database) =>
    database
      .collection('products')
      .insertOne(name, quantity)
      .then((res) => res.ops[0]),
  );
};

const findProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((database) => {
    database.collection('products').findOne(new ObjectId(id).then((res) => res));
  });
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const newProductId = new ObjectId(id);
  return connect().then((database) =>
    database
      .collection('products')
      .findOneAndDelete({ _id: newProductId })
      .then((result) => result),
  );
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const productId = new ObjectId(id);
  const newDetails = { name, quantity };

  return connect().then((database) =>
    database
      .collection('products')
      .findOneAndUpdate(
        {
          _id: productId,
        },
        {
          $set: newDetails,
        },
        {
          returnOriginal: false,
        },
      )
      .then((result) => result.value),
  );
};

const listAllProducts = async () => {
  return connect().then((database) => {
    database
      .collection('products')
      .find()
      .toArray()
      .then((res) => res);
  });
};

const findByName = async (name) => {
  return connect().then((database) => {
    database
      .collection('products')
      .findOne({ name })
      .then((res) => res);
  });
};

module.exports = {
  registerNewProduct,
  findProductById,
  deleteProduct,
  updateProduct,
  listAllProducts,
  findByName,
};
