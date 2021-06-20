const Products = require('../models/Products');

const getAll = async () => Products.getAll();

const findById = async (id) => {
  const findProduct = await Products.findById(id);
  if (!findProduct) return { err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  } };

  return findProduct;
};

const updateProduct = async (id, name, quantity) => 
  Products.updateProduct(id, name, quantity);

const deleteProduct = async (id) => {
  const getProduct = await Products.findById(id);
  const deleteProduct = await Products.deleteProduct(id);

  if (!deleteProduct) return { err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  } };
  return getProduct;
};

const newProduct = async (name, quantity) => {
  const list = await Products.getAll();

  const isUnique = list.find(item => item.name === name);
  if (isUnique) {
    return { err: {
      'code': 'invalid_data',
      'message': 'Product already exists',
    }};
  }

  const addNewProduct = await Products.newProduct(name, quantity);
  return addNewProduct;
};

const updateQuantityPost = async (productsArray) => {
  const id = productsArray[0].productId;
  const product = await Products.findById(id);
  const updateQuantity = parseInt(product.quantity) - parseInt(productsArray[0].quantity);

  const ZERO = 0;
  if (updateQuantity < ZERO) return { err: {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  } };
  
  await Products.updateQuantity(id, updateQuantity);
  return updateQuantity;
};

const updateQuantityDelete = async (findSale) => {
  const productId = findSale.itensSold[0].productId;
  const product = await Products.findById(productId);
  const quantity = parseInt(product.quantity) + parseInt(findSale.itensSold[0].quantity);

  await Products.updateQuantity(productId, quantity);
};

module.exports = {
  getAll,
  findById,
  updateProduct,
  deleteProduct,
  newProduct,
  updateQuantityPost,
  updateQuantityDelete,
};
