const Products = require('../models/products');

const { MIN_ID_LENGTH } = require('../constants');
const create = async ({ name, quantity }) => {
  const newProduct = { name, quantity };
  // Buscamos um produto com o mesmo nome que desejamos criar
  const isProduct = await Products.getByName(newProduct);

  // Caso esse produto já exista, retornamos um objeto de erro informando
  // que não é possível criar o produto pois ele já existe
  if (isProduct) {
    return {
      error: {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      },
    };
  }

  // Caso o produto não exista e, portanto, possa ser criado
  // chamamos o model e retornamos o resultado
  return Products.createOne(newProduct);
};

const getAll = async () => {
  const allProducts = await Products.getAllProducts();

  if (!allProducts) {
    return {
      error: {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      },
    };
  }

  return allProducts;
};

const getById = async (id) => {
  let product;

  if (id.length === MIN_ID_LENGTH) {
    product = await Products.getById(id);
  }

  if (!product || id.length !== MIN_ID_LENGTH) {
    return {
      error: {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      },
    };
  }

  return product;
};

const updateById = async (id, body) => {
  const updatedProduct = await Products.updateById(id, body);

  if (!updatedProduct) {
    return {
      error: {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      },
    };
  }

  return updatedProduct;
};

const deleteById = async (id) => {
  let productToDelete;

  if (id.length === MIN_ID_LENGTH) {
    productToDelete = await Products.deleteById(id);
  }

  if (!productToDelete) {
    return {
      error: {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      },
    };
  }

  return productToDelete;
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
