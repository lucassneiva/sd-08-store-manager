const { ObjectID } = require('mongodb');
const { productsModel } = require('../models');
const {
  addProduct,
  findAllProducts,
  findProduct,
  findProductById,
  getProductToUpdate,
  deleteById,
} = productsModel;

const CODE = 'invalid_data';

const readProducts = async () => {
  const data = await findAllProducts();
  return data;
};

const createProduct = async (name, quantity) => {
  const validation = await checkNameAndQuantity(name, quantity);
  if (validation.err) return validation;
  
  const searchProduct = await findProduct({ name });
  if (searchProduct) {
    return {
      err: {
        code: CODE,
        message: 'Product already exists',
      },
    };
  }

  const newProduct = await addProduct(name, quantity);
  return { _id: newProduct.insertedId, name, quantity };
};

const readProductsById = async (id) => {
  const validation = await productNFVF(id);
  if (validation.err) return validation;

  const product = await findProductById(id);
  return product;
};

const updateProductById = async (id, name, quantity) => {
  const validation = await checkNameAndQuantity(name, quantity);
  if (validation.err) return validation;

  const validation2 = await productNFVF(id);
  if (validation2.err) return validation2;

  const newProduct = await getProductToUpdate(id, name, quantity);
  return { _id: newProduct.insertedId, name, quantity };
};

const checkNameAndQuantity = async (name, quantity) => {
  const QTD = 0;
  const NUMBER_NAME = 5;
  if (name.length <= NUMBER_NAME || typeof(name) !== 'string') {
    return {
      err: {
        code: CODE,
        message: '"name" length must be at least 5 characters long',
      }
    };
  }
  if (typeof(quantity) !== 'number' || !Number.isInteger(quantity)) {
    return {
      err: {
        code: CODE,
        message: '"quantity" must be a number',
      }
    };
  }
  if (quantity <= QTD) {
    return {
      err: {
        code: CODE,
        message: '"quantity" must be larger than or equal to 1',
      }
    };
  }
  return true;
};

const productNFVF = async (id) => {
  const product = await findProductById(id);
  if (!ObjectID.isValid(id)) return {
    err: {
      code: CODE,
      message: 'Wrong id format',
    }
  };
  if (!product) return {
    err: {
      code: CODE,
      message: 'Product not found',
    }
  };
  return product;
};

const deleteProductById = async (id) => {
  const validation2 = await productNFVF(id);
  if (validation2.err) return validation2;

  const product = await deleteById(id);
  return product;
};

module.exports = {
  readProducts,
  createProduct,
  readProductsById,
  updateProductById,
  checkNameAndQuantity,
  deleteProductById,
};
