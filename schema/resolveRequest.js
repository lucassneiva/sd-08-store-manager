const status = {
  ok: 200,
  created: 201,
  unProcessableEntity: 422,
  unexpected: 500,
};

const code = {
  422: 'invalid_data',
  500: 'Internal Server Error',
};

module.exports = (res) => {
  if (res.error) {
    return {
      status: status.unProcessableEntity,
      err: {
        code: code[status.unProcessableEntity],
        message: res.error.details[0].message,
      }
    };
  }
  if (res === 'product_exists') {
    return {
      status: status.unProcessableEntity,
      err: {
        code: code[status.unProcessableEntity],
        message: 'Product already exists'
      }
    };
  }
  if (res === 'unexpected') {
    return {
      status: status.unexpected,
      err: {
        code: code[status.unexpected],
        message: 'Tente mais tarde!!!'
      }
    };
  }
  if (res === 'invalid_id') {
    return {
      status: status.unProcessableEntity,
      err: {
        code: code[status.unProcessableEntity],
        message: 'Wrong id format'
      }
    };
  }
  if (res.sales && res.sales.err) {
    return {
      status: status.unProcessableEntity,
      err: {
        code: code[status.unProcessableEntity],
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }
  if (res.value && !res.error) {
    return {
      status: status.created,
      result: res.value,
    };
  }
  if (res.ok) {
    return {
      status: status.ok,
      result: res.result
    };
  }
  if (res.all) {
    return {
      status: status.ok,
      result: {
        products: res.result
      }
    };
  }
  if (res.sales.ok) {
    return {
      status: status.ok,
      result: res.sales.result
    };
  }
}; 