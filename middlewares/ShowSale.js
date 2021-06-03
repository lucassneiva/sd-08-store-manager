const Sale = require('../models/Sales');

const HTTP_NOT_FOUND_STATUS = 404;
const ID_MIN_LENGTH = 24;

module.exports = async (request, response, next) => {
  const { id } = request.params;

  if (id.length < ID_MIN_LENGTH) {
    return response.status(HTTP_NOT_FOUND_STATUS).send({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  };

  const sale = await Sale.findById(id);

  if (!sale) {
    return response.status(HTTP_NOT_FOUND_STATUS).send({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  }

  return next();
};
