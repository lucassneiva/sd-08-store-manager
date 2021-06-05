const products = require('../models/products');

const { MIN_ID_LENGTH } = require('../constants');
const create = async ({ name, quantity }) => {
  const newProduct = { name, quantity };
  // Buscamos um produto com o mesmo nome que desejamos criar
  const isProduct = await products.getByName(newProduct);

  // Caso esse produto já exista, retornamos um objeto de erro informando
  // que não é possível criar o produto pois ele já existe
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

  // Caso o produto não exista e, portanto, possa ser criado
  // chamamos o model e retornamos o resultado
  return products.createOne(newProduct);
};

const getAll = async () => {
  const allProducts = await products.getAllProducts();

  return allProducts;
};

const getById = async (id) => {
  let product;

  if(id.length === MIN_ID_LENGTH) {
    product = await products.getById(id);
  }

  // console.log('product', product);

  if (!product) {
    return {
      error: {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        }
      },
    };
  }

  return product;
};


module.exports = {
  create,
  getAll,
  getById
};
