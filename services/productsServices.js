const ProductModel = require('../models/productsModel');

const MIN_LENGTH = 5;
const MIN_QUANTITY = 0;
const INVALID_CODE = 'invalid_data';
const PRODUCT_EXISTS_MESSAGE = 'Product already exists';
const NAME_LENGHT_MESSAGE = '"name" length must be at least 5 characters long';
const QUANTITY_MESSAGE = '"quantity" must be larger than or equal to 1';
const QUANTITY_TYPE_MESSAGE = '"quantity" must be a number';

const verifyIfExists = async (itemName) => {
  const result = await ProductModel.getProductByName(itemName);
  if (result) return true;

  return false;
};

const validateNewProduct = async (item) => {
  const { name, quantity } = item;

  if (name.length < MIN_LENGTH) return (
    { code: INVALID_CODE, message: NAME_LENGHT_MESSAGE });

  if (quantity <= MIN_QUANTITY) return (
    { code: INVALID_CODE, message: QUANTITY_MESSAGE });

  if (typeof quantity !== 'number') return (
    { code: INVALID_CODE, message: QUANTITY_TYPE_MESSAGE });

  const productExists = await verifyIfExists(name);
  if (productExists) return (
    { code: INVALID_CODE, message: PRODUCT_EXISTS_MESSAGE });


  return null;
};



module.exports = {
  validateNewProduct,
};
