const Product = require('../models/Products');

module.exports = async (request, response, next) => {
  const { name, quantity } = request.body;

  const HTTP_UNPROCESSABLE_ENTITY_STATUS = 422;
  const NAME_MIN_LENGTH = 5;
  const MIN_QUANTITY = 1;

  const product = await Product.findOne({ name });

  if (name.length < NAME_MIN_LENGTH) {
    return response.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).send({
      err: {
        code: 'invalid_data',
        message: '\"name\" length must be at least 5 characters long'
      }
    });
  } else if (product) {
    return response.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).send({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  } else if (quantity < MIN_QUANTITY) {
    return response.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).send({
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be larger than or equal to 1'
      }
    });
  } else if (typeof quantity !== 'number') {
    return response.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).send({
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be a number'
      }
    });
  }

  return next();
};
