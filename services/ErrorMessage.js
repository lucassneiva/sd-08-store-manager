const results = {
  shortName: '"name" length must be at least 5 characters long',
  invalidQuantityValue: '"quantity" must be larger than or equal to 1',
  invalidQuantityType: '"quantity" must be a number',
  duplicateProduct: 'Product already exists',
  invalidId: 'Wrong id format',
  salesNotNull: 'Wrong product ID or invalid quantity',
  saleNotFound: 'Sale not found',
  unprocessable: 422,
  created: 201,
  ok: 200,
  notFound: 404,
};

const generateMessage = (message, code) => {
  if (code !== undefined) {
    return {
      err: {
        code,
        message,
      },
    };
  }
  return {
    err: {
      code: 'invalid_data',
      message,
    },
  };
};
module.exports = {
  results,
  generateMessage,
};
