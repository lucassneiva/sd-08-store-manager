const ProductsModel = require('../models/productsModel');

const CREATED = 201;
const UNPROCESSABLE_ENTRY = 422;

const create = async ({name, quantity}) => {
  // Será validado que não é possível criar um produto com o nome menor que 5 caracteres
  const minNameLength = 5;
  if (name.length < minNameLength) return ({
    status: UNPROCESSABLE_ENTRY,
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    }
  });

  // Será validado que não é possível criar um produto com o mesmo nome de outro já existente
  const products = await ProductsModel.searchByName(name);
  if(products) return ({
    status: UNPROCESSABLE_ENTRY,
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    }
  });

  // Será validado que não é possível criar um produto com quantidade menor que zero
  // Será validado que não é possível criar um produto com quantidade igual a zero
  const minQuantity = 1;
  if (quantity < minQuantity) return ({
    status: UNPROCESSABLE_ENTRY,
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    }
  });


  // Será validado que não é possível criar um produto com uma string no campo quantidade
  if (typeof quantity !== 'number') return ({
    status: UNPROCESSABLE_ENTRY,
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    }
  });

  // Será validado que é possível criar um produto com sucesso
  const productCreated = await ProductsModel
    .create({name, quantity});

  return {
    status: CREATED,
    productCreated,
  };
};

const getAll = async () => {
  const allProducts = await ProductsModel
    .getAll();

  return {
    products: allProducts,
  };
};

const getById = async (id) => {
  const product = await ProductsModel
    .getById(id);
  
  if (!product) return ({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  });

  return product;
};

module.exports = {
  create,
  getAll,
  getById,
};
