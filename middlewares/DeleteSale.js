const Sale = require('../models/Sales');

const HTTP_UNPROCESSABLE_ENTITY_STATUS = 422;
const ID_MIN_LENGTH = 24;

module.exports = async (request, response, next) => {
  const { id } = request.params;

  if (id.length < ID_MIN_LENGTH) {
    return response.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  };

  const sale = await Sale.findById(id);

  if (!sale) {
    return response.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  }

  return next();
};
