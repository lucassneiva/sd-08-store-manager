const findModels = require('../models/ProductModels');
const nameValidations = (name) => {
  if (name.length < 5) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
      code: 422,
    }
  }
};

const findOne = async (name) => {
  const res = await findModels.findOneProduct(name);

  if (res.length > 0) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
      code: 422,
    }
  }
}

const quantityValidations = (quantity) => {
  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
      code: 422,
    }
  };

  if (quantity < 0 || !quantity) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
      code: 422,
    }
  }
};

const validAddNewProduct = (name, quantity) => {
  const nameIsValid = nameValidations(name);
  const quantityIsValid = quantityValidations(quantity);

  if (nameIsValid) return { erro: nameIsValid };
  if (quantityIsValid) return { erro: quantityIsValid };
}

module.exports = {
  validAddNewProduct,
  findOne,
};
