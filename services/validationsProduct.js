const { ObjectId, ObjectID } = require('mongodb');

const findModelsProducts = require('../models/ProductModels');

const NUMBER_ZERO = 0;
const NUMBER_FIVE = 5;

const nameValidations = (name) => {
  if (name.length < NUMBER_FIVE) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
      code: 422,
    };
  }
};

const findOne = async (name) => {
  const res = await findModelsProducts.findOneProduct(name);

  if (res.length > NUMBER_ZERO) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
      code: 422,
    };
  }
};

const quantityValidations = (quantity) => {
  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
      code: 422,
    };
  };

  if (quantity <= NUMBER_ZERO || !quantity) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
      code: 422,
    };
  }
};

const validAddNewProduct = (name, quantity) => {
  const nameIsValid = nameValidations(name);
  const quantityIsValid = quantityValidations(quantity);

  if (nameIsValid) return { erro: nameIsValid };
  if (quantityIsValid) return { erro: quantityIsValid };
};

const getById = async (id) => {
  const byId = await findModelsProducts.findOneProductById(id);

  if (!ObjectID.isValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
      code: 422,
    };
  };

  if (byId === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
      code: 422,
    };
  };
};

module.exports = {
  validAddNewProduct,
  findOne,
  getById,
  quantityValidations,
};
