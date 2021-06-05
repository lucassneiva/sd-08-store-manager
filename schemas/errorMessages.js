
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

module.exports = {
  lessThanFive,
  alreadyExists,
  lessOrEqual,
  typeMustBe,
  InvalidObjectID,
};
