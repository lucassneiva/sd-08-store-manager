const Product = require('../models/Products');

const HTTP_UNPROCESSABLE_ENTITY_STATUS = 422;
const ID_MIN_LENGTH = 24;

module.exports = async (request, response, next) => {
  const { id } = request.params;

  if (id.length < ID_MIN_LENGTH) {
    return response.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  };

  const product = await Product.findOne({ _id: id });

  if (!product) {
    return response.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }

  return next();
};
