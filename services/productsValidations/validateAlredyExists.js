const alreadyExists = (products, name) => {
  const exists = products.some((product) => product.name === name);
  if (exists)
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
        status: 422,
      },
    };
  return {};
};


module.exports = alreadyExists;