const model = require('../../models/productModel');

const ONE = 1;
const FIVE = 5;

const checkLengthName = (name) => {
  if(name < FIVE) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    };
  }
};

checkUniqueName = async (name) => {
  const arrayProducts = await model.getAll();
  if (arrayProducts.map(product => product.name).some((prod) => prod === name)) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists'
    };
  }
};

const checkName = async(name) => {
  checkLengthName(name);
  await checkUniqueName(name);
};

const checkQuantity = (quantity) => {
  if (typeof quantity !== 'number') {
    throw{
      code: 'invalid_data',
      message: '"quantity" must be a number'
    };
  }
  
  if (quantity < ONE) {
    throw{
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    };
  }
};

module.exports = async ({name, quantity}) => {
  try {
    await checkName(name);
    checkQuantity(quantity);

    return { 
      status: 201,
      result: await model.create(product),
    };
  } catch (err) {
    return err;
  }
};
  
