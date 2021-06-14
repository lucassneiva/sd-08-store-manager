

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
      errorObj: {
        err: {
          message: '"name" length must be at least 5 characters long',
          code: invalidData,
        },
      }
    },
    nameAlreadyExists: {
      response: UNPROCESSABLE_ENTITY,
      errorObj: {
        err: {
          message: 'Product already exists',
          code: invalidData,
        }
      }
    },
    quantityMustBeNumber: {
      response: UNPROCESSABLE_ENTITY,
      errorObj: {
        err: {
          message: '"quantity" must be a number',
          code: invalidData,
        }
      }
    },
    quantityOneOrMore:
    {
      response: UNPROCESSABLE_ENTITY,
      errorObj: {
        err: {
          message: '"quantity" must be larger than or equal to 1',
          code: invalidData,
        }
      }
    },
    productDoNotExist: {
      response: UNPROCESSABLE_ENTITY,
      errorObj: {
        err: {
          message: 'Wrong id format', code: 'invalid_data',
          code: invalidData,
        }
      }
    },
    stockCantBeZero: {
      response: NOT_FOUND,
      errorObj: {
        err: {
          message: 'Such amount is not permitted to sell',
          code: stockProblem,
        }
      }
    }
  },

  Sales: {
    saleCantBeLessThanOne: {
      response: UNPROCESSABLE_ENTITY,
      errorObj: {
        err: {
          message: 'Wrong product ID or invalid quantity',
          code: invalidData,
        }
      }
    },
    saleQtdCantBeString: {
      response: UNPROCESSABLE_ENTITY,
      errorObj: {
        err: {
          message: 'Wrong product ID or invalid quantity',
          code: invalidData,
        }
      }
    },
    notFoundSale: {
      response: NOT_FOUND,
      errorObj: {
        err: {
          message: 'Sale not found',
          code: notFoundCode,
        }
      }
    }
  }
};

module.exports = { responseNCodes, errors };
