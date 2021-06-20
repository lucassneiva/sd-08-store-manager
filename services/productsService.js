const productModel = require('../models/productsModel');

const getAllProducts = async () => {
  const result = await productModel.getAllProducts();
  return result;
};

const findProduct = async (productId) => {
  const result = await productModel.findProduct(productId);
  if (!result) return ({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    }
  });
  return result;
};

const five = 5;
const validateProduct = ({ name, quantity }) => {
  try {
    if (name.length < five) return ({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
    if (typeof quantity === 'string') return ({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
    if (quantity < 1) return ({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      }
    });
  } catch {
    return ({
      err: {
        code: 'invalid_data',
        message: 'data must not be blank',
      }
    });
  }

  return null;
};

const createProduct = async (product) => {
  const result = await productModel.createProduct(product);
  if (result === false) return ({
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    }
  });
  return result;
};

const updateProduct = async (productId, changes) => {
  const result = await productModel.updateProduct(productId, changes);
  if (result) return ({
    _id: productId,
    ...changes,
  });
  return false;
};

const deleteProduct = async (productId) => {
  const result = await productModel.deleteProduct(productId);
  if (!result) return ({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    }
  });
  return result;
};


module.exports = {
  getAllProducts,
  findProduct,
  validateProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
