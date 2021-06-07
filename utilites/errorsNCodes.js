

const responseNCodes = {
  OK: 200,
  CREATED: 201,
  UNPROCESSABLE_ENTITY: 422,
  NOT_FOUND: 404,
  invalidData: 'invalid_data',
  notFoundCode: 'not_found',
  stockProblem: 'stock_problem'
};

const {
  UNPROCESSABLE_ENTITY,
  invalidData, NOT_FOUND,
  notFoundCode, stockProblem } = responseNCodes;

const errors = {
  Product: {
    nameAtLeastFive: {
      message: '"name" length must be at least 5 characters long',
      code: invalidData,
      response: UNPROCESSABLE_ENTITY
    },
    nameAlreadyExists: {
      message: 'Product aldready exists',
      code: invalidData,
      response: UNPROCESSABLE_ENTITY
    },
    quantityMustBeNumber: {
      message: '"quantity" must be a number', code: invalidData,
      response: UNPROCESSABLE_ENTITY
    },
    quantityOneOrMore:
    {
      message: '"quantity" must be larger than or equal to 1', code: invalidData,
      response: UNPROCESSABLE_ENTITY
    },
    wrongIdFormat: {
      message: 'Wrong id format', code: 'invalid_data', code: invalidData,
      response: UNPROCESSABLE_ENTITY
    },
    stockCantBeZero: {
      message: 'Such amount is not permitted to sell',
      code: stockProblem,
      response: NOT_FOUND
    }
  },

  Sales: {
    quantityOneOrMore:
    {
      message: '"quantity" must be larger than or equal to 1', code: invalidData,
      response: UNPROCESSABLE_ENTITY
    },
    saleCantBeZero: {
      message: 'Wrong product ID or invalid quantity',
      code: invalidData,
      response: UNPROCESSABLE_ENTITY
    },
    notFoundSale: {
      message: 'Sale not found',
      code: notFoundCode,
      response: NOT_FOUND
    }
  }
};

module.export = { errors, responseCodes };
