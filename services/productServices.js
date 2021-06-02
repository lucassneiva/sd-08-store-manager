const ProductsModel = require('../models/productsModel');


const errorMsgs = {
  shortName: '"name" length must be at least 5 characters long',
  alreadyExists: 'Product already exists', 
  invalidQuantity: '"quantity" must be larger than or equal to 1',
  quantityNotNumber: '"quantity" must be a number',
  wrongId: 'Wrong id format'
};

const errorMessage = (message) => (
  {
    err: {
      code: 'invalid_data',
      message
    }
  }
);

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
  
  if (name.length < SHORTEST_NAME_ALLOWED ) return errorMessage(shortName);
  
  if (quantity < SMALLEST_QUANTITY_ALLOWED) return errorMessage(invalidQuantity);
  
  if (typeof quantity === 'string') return errorMessage(quantityNotNumber);
};

const addProduct = async(name, quantity) => {
  const nameOrQuantityError = validateNameAndQuantity(name, quantity);
  if(nameOrQuantityError) return nameOrQuantityError;
  
  const productFound = await ProductsModel.getByName(name);

  if (productFound) return errorMessage(alreadyExists);

  const added = await ProductsModel.add(name, quantity);

  return added.ops[0];

};

const getAllProducts = async() => {
  const getAll = await ProductsModel.getAll();
  return getAll;
};

const getProductById = async(id) => {
  const getById = await ProductsModel.getById(id);
  return getById || errorMessage(wrongId);
};

const updateProduct = async(id, name, quantity) => {
  const nameOrQuantityError = validateNameAndQuantity(name, quantity);
  if(nameOrQuantityError) return nameOrQuantityError;
  
  await ProductsModel.update(id, name, quantity);
  const updatedProduct = await getProductById(id);
  return updatedProduct;
};

const deleteProduct = async(id) => {
  const deleted = await ProductsModel.deleteById(id);

  if (!deleted) return errorMessage(wrongId);
  // console.log(deleted);
  return deleted;
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
