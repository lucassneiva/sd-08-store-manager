const { ObjectId, ObjectID } = require('mongodb');

const findModels = require('../models/ProductModels');

const NUMBER_FIVE = 5;
const NUMBER_ZERO = 0;

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
  const res = await findModels.findOneProduct(name);

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
  const byId = await findModels.findOneProductById(id);

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

// Validations for solds!!
const getByIdArray = async (sale) => {
  const getIdsArray = sale
    .every(({ productId }) => {
      const find = findModels.findOneProductById(productId);
    return find;
    });

  if (!getIdsArray) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
      code: 422,
    };
  };
};

const validateQuantityArray = (sale) => {
  const quantitiesMoreThan = sale.some(({ quantity }) => {
    return quantity <= 0;
  });
  const quantitiesIsNumber = sale.some(({ quantity }) => {
    return typeof quantity !== 'number';
  });

   if (quantitiesMoreThan || quantitiesIsNumber) {
     return {
       err: {
         code: 'invalid_data',
         message: 'Wrong product ID or invalid quantity',
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
  getByIdArray,
  validateQuantityArray,
};
