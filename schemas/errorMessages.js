// Products erros
const lessThanFive = {
  code: 422,
  message: {
    'err': {
      'code': 'invalid_data',
      'message': '\"name\" length must be at least 5 characters long'
    }
  }
};

const alreadyExists = {
  code: 422,
  message: {
    'err': {
      'code': 'invalid_data',
      'message': 'Product already exists'
    }
  }
};

const lessOrEqual = {
  code: 422,
  message: {
    'err': {
      'code': 'invalid_data',
      'message': '\"quantity\" must be larger than or equal to 1'
    }
  }
};

const typeMustBe = {
  code: 422,
  message: {
    'err': {
      'code': 'invalid_data',
      'message': '\"quantity\" must be a number'
    }
  }
};

const InvalidObjectID = {
  code: 422,
  message: {
    'err': {
      'code': 'invalid_data',
      'message': 'Wrong id format'
    }
  }
};

// Sales erros

const quantityInvalidNumber = {
  code: 422,
  message: {
    'err': {
      'code': 'invalid_data',
      'message': 'Wrong product ID or invalid quantity'
    }
  }
};

const notFoundSales = {
  code: 404,
  message: {
    'err': {
      'code': 'not_found',
      'message': 'Sale not found'
    }
  }
};



module.exports = {
  lessThanFive,
  alreadyExists,
  lessOrEqual,
  typeMustBe,
  InvalidObjectID,
  quantityInvalidNumber,
  notFoundSales,
};
