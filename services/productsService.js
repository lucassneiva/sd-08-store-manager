const ProductsModel = require('../models/productsModel');

const isValid = (name, quantity) => {
  const minNameLength = 6;
  const minQuantity = 1;
  if (typeof name !== string || name.length < minNameLength) return false;
  if (typeof quantity !== number || quantity < minQuantity) return false;
};

const create = async ({name, quantity}) => {
  const isProductValid = isValid(name, quantity);

  if (!isProductValid) return false;

  const productCreated = await ProductsModel
    .create({name, quantity});
};

module.exports = {
  create,
};
