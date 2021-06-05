const products = require('../models/products');
const create = async ({name, quantity}) => {
  const newProduct = {name, quantity};
  // Buscamos um autor com o mesmo nome completo que desejamos criar
  const isProduct = await products.getProduct(newProduct);

  // Caso esse autor já exista, retornamos um objeto de erro informando
  // que não é possível criar o autor pois ele já existe
  if (isProduct) {
    return {
      error: {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        }
      },
    };
  }

  // const newProduct = {name, quantity};
  // Caso o autor não exista e, portanto, possa ser criado
  // chamamos o model e retornamos o resultado
  return products.createOne(newProduct);
};

module.exports = {
  create
};
