const status = {
  created: 201,
  unProcessableEntity: 422,
  unexpected: 500,
};

const code = {
  422: 'invalid_data',
  500: 'Internal Server Error',
};

module.exports = (err) => {
  if (err.error) {
    return {
      status: status.unProcessableEntity,
      err: {
        code: code[status.unProcessableEntity],
        message: err.error.details[0].message,
      }
    };
  }
  if (err === 'product_exists') {
    return {
      status: status.unProcessableEntity,
      err: {
        code: code[status.unProcessableEntity],
        message: 'Product already exists'
      }
    };
  }
  if (err === 'unexpected') {
    return {
      status: status.unexpected,
      err: {
        code: code[status.unexpected],
        message: 'Tente mais tarde!!!'
      }
    };
  }
  if (err.value && !err.error) {
    return {
      status: status.created,
      result: err.value,
    };
  }
}; 