const status = {
  ok: 200,
  created: 201,
  unProcessableEntity: 422,
  unexpected: 500,
  notFound: 404,
};

const code = {
  422: 'invalid_data',
  500: 'Internal Server Error',
  404: 'not_found',
};

const code_esp = {
  404: 'stock_problem' 
};
const types_esp = ['stock_problem', 'delete'];

const types = ['create', 'update'];

const resolveRequestSalesEsp = (res) => {
  if (res.sales && res.sales.err === types_esp[0]) {
    return {
      status: status.notFound,
      err: {
        code: code_esp[status.notFound],
        message: 'Such amount is not permitted to sell'
      }
    };
  }
  if (res.sales && res.sales.err === types_esp[1]) {
    return {
      status: status.unProcessableEntity,
      err: {
        code: code[status.unProcessableEntity],
        message: 'Wrong sale ID format'
      }
    };
  }
};

const resolveRequestSales = (res) => {
  if (res.sales && res.sales.err && types.includes(res.sales.err)) {
    return {
      status: status.unProcessableEntity,
      err: {
        code: code[status.unProcessableEntity],
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }
  if (res.sales && (res.sales.err === 'get' || res.sales.idInvalid)) {
    return {
      status: status.notFound,
      err: {
        code: code[status.notFound],
        message: 'Sale not found',
      }
    };
  };
  if (res.sales && (res.sales.ok || res.sales.update)) {
    return {
      status: status.ok,
      result: res.sales.result
    };
  }
  if (res.sales && res.sales.getAll) {
    return {
      status: status.ok,
      result: {
        sales: res.sales.result
      }
    };
  }
  if (res.sales && res.sales.getOne) {
    return {
      status: status.ok,
      result: res.sales.result
    };
  }
}; 

const resolveRequestProduct = (res) => {
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
};

module.exports = {
  resolveRequestProduct,
  resolveRequestSales,
  resolveRequestSalesEsp
};