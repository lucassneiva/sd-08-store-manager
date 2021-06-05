const ProductsModel = require('../models/productsModel');
const {generateError, errorMsgs} = require('./errors');

const SHORTEST_NAME_ALLOWED = 6;
const SMALLEST_QUANTITY_ALLOWED = 1;
const {
  shortName,
  alreadyExists,
  invalidQuantity,
  quantityNotNumber,
  wrongId
} = errorMsgs;

const validateNameAndQuantity = (name, quantity) => {
  
  if (name.length < SHORTEST_NAME_ALLOWED ) return generateError(shortName);
  
  if (quantity < SMALLEST_QUANTITY_ALLOWED) return generateError(invalidQuantity);
  
  if (typeof quantity === 'string') return generateError(quantityNotNumber);
};

const addProduct = async(name, quantity) => {
  const nameOrQuantityError = validateNameAndQuantity(name, quantity);
  if(nameOrQuantityError) return nameOrQuantityError;
  
  const productFound = await ProductsModel.getProductByName(name);

  if (productFound) return generateError(alreadyExists);

  const added = await ProductsModel.addProduct(name, quantity);

  return added.ops[0];

};

const getAllProducts = async() => {
  const getAll = await ProductsModel.getAllProducts();
  return getAll;
};

const getProductById = async(id) => {
  const getById = await ProductsModel.getProductById(id);
  return getById || generateError(wrongId);
};

const updateProduct = async(id, name, quantity) => {
  const nameOrQuantityError = validateNameAndQuantity(name, quantity);
  if(nameOrQuantityError) return nameOrQuantityError;
  
  await ProductsModel.updateProduct(id, name, quantity);
  const updatedProduct = await getProductById(id);
  return updatedProduct;
};

const deleteProduct = async(id) => {
  const deleted = await ProductsModel.deleteProductById(id);
  return deleted || generateError(wrongId);
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
