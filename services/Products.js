const Products = require('../models/Products');

const INVALID_NAME = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    }
  }
};

const PRODUCT_EXISTS = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    }
  }
};

const INVALID_QUANTITY = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    }
  }
};

const INVALID_QUANTITY_DATA = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }
  }
};

const NO_PRODUCTS_FOUND = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    }
  }
};

const validateFields = (name, quantity) => {
  const MINIMAL_NAME_LENGTH = 5;
  const MINIMAL_QUANTITY = 1;

  if (name.length < MINIMAL_NAME_LENGTH) return INVALID_NAME;
  if (typeof quantity !== 'number') return INVALID_QUANTITY_DATA;
  if (quantity < MINIMAL_QUANTITY) return INVALID_QUANTITY;

  return { ok: true };
};

const createProduct = async (name, quantity) => {
  const isValid = validateFields(name, quantity);
  if (!isValid.ok) return isValid;

  const productExists = await Products.checkProductExistsByName(name);
  if (productExists) return PRODUCT_EXISTS;

  const newProduct = await Products.createProduct(name, quantity);

  return { status: 201, response: newProduct };
};

const updateProduct = async (id, name, quantity) => {
  const isValid = validateFields(name, quantity);
  if (!isValid.ok) return isValid;

  await Products.updateProduct(id, name, quantity);

  return { status: 200, response: {
    _id: id,
    name,
    quantity
  } };
};

const deleteProduct = async (id) => {
  const deleted = await Products.deleteProduct(id);

  if (!deleted) return NO_PRODUCTS_FOUND;
  return { status: 200, response: deleted };
};

const listProducts = async (id) => {
  const products = await Products.listProducts(id);
  if (!products) return NO_PRODUCTS_FOUND;
  if (id) return { status: 200, response: products };
  return { status: 200, response: { products } };
};

module.exports = {
  validateFields,
  createProduct,
  updateProduct,
  deleteProduct,
  listProducts,
};
