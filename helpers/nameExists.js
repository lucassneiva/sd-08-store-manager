const nameExists = async (name) => {
  const allProducts = await Products.getAllProducts();
  const findProduct = await allProducts.find((product) => product.name === name);
  if (findProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    };
  }
  return 'Name validated';
};

module.exports = nameExists;
