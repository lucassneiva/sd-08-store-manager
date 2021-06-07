

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
  Products: {
    nameAtLeastFive: {
      response: UNPROCESSABLE_ENTITY,
      err: {
        message: '"name" length must be at least 5 characters long',
        code: invalidData,
      },
    },
    nameAlreadyExists: {
      response: UNPROCESSABLE_ENTITY,
      err: {
        message: 'Product aldready exists',
        code: invalidData,

      }
    },
    quantityMustBeNumber: {
      response: UNPROCESSABLE_ENTITY,
      err: {
        message: '"quantity" must be a number',
        code: invalidData,
      }
    },
    quantityOneOrMore:
    {
      response: UNPROCESSABLE_ENTITY,
      err: {
        message: '"quantity" must be larger than or equal to 1',
        code: invalidData,
      }
    },
    wrongIdFormat: {
      response: UNPROCESSABLE_ENTITY,
      err: {
        message: 'Wrong id format', code: 'invalid_data',
        code: invalidData,
      }
    },
    stockCantBeZero: {
      response: NOT_FOUND,
      err: {
        message: 'Such amount is not permitted to sell',
        code: stockProblem,
      }
    }
  },

  Sales: {
    quantityOneOrMore:
    {
      response: UNPROCESSABLE_ENTITY,
      err: {
        message: '"quantity" must be larger than or equal to 1',
        code: invalidData,
      }
    },
    saleCantBeZero: {
      response: UNPROCESSABLE_ENTITY,
      err: {
        message: 'Wrong product ID or invalid quantity',
        code: invalidData,
      }
    },
    notFoundSale: {
      response: NOT_FOUND,
      err: {
        message: 'Sale not found',
        code: notFoundCode,
      }
    }
  }
};

module.export = { errors, responseCodes };
