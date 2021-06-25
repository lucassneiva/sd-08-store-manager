const productModel = require('../models/products');
const { validateName, validateQuantity } = require('./validations');

const HTTP_STATUS_UNPROCESSABLE_ENTITY = 422;

const addProduct = async (name, quantity) => {
  const productExists = await productModel.getByNameDB(name);

  if (productExists)
    return {
      status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };

  const verifyName = await validateName(name);
  const verifyQuantity = validateQuantity(quantity);
  
  if (verifyName.isValid && verifyQuantity.isValid) {
    const product = await productModel.addProductDB(name, quantity);
    return product;
  }

  return verifyName.err ? verifyName : verifyQuantity;
};

const updateProduct = async (id, name, quantity) => {
  const verifyName = await validateName(name);
  const verifyQuantity = validateQuantity(quantity);

  if (verifyName.isValid && verifyQuantity.isValid) {
    const product = await productModel.editProductDB(id, name, quantity);
    return product;
  }

  return verifyName.err ? verifyName : verifyQuantity;  
};

module.exports = { addProduct, updateProduct };
