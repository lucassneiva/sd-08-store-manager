const HTTP_UNPROCESSABLE_ENTITY_STATUS = 422;
const MIN_QUANTITY = 1;

module.exports = async (request, response, next) => {
  const [{ quantity }] = request.body;

  if (quantity < MIN_QUANTITY || typeof quantity !== 'number') {
    return response.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }

  return next();
};
