const ProductsModel = require('../models/productsModels');

// const getNewMovie = (movieData) => {
//   const { id, title, directedBy, releaseYear } = movieData;

//   return { id, title, directedBy, releaseYear };
// };

const nameValidation = (name) => {
  const minOfCharactersName = 5;

  if (!name || typeof name !== 'string'
  || name.length <= minOfCharactersName) return false;

  return true;
};


const quantityValidation = (quantity) => {
  const numberQuantityGreaterThan = 1;
  if (!quantity || Number.isInteger(quantity) === false
  || quantity < numberQuantityGreaterThan) return false;

  return true;
};

const quantityNotIsString = (quantity) => {
  if (typeof quantity === 'string') return false;

  return true;
};

const productExists = async (name) => {
  // console.log(name);
  const dataProducts = await ProductsModel.getAll();
  // console.log(dataProducts);
  const productCheck = dataProducts
    .some((data) => data.name.includes(name));
  return productCheck;
};

// const getAll = async () => {
//   const moviesData = await MoviesModel
//     .getAll();

//   return moviesData.map(getNewMovie);
// };

const create = async (name, quantity) => {
  const isProductExists = await productExists(name);
  // console.log(isProductExists);
  // const isNameValid = nameValidation(name);
  const isNameValid = true;
  const existName = true;

  const isQuantityString = quantityNotIsString(quantity);
  const isQuantityValid = quantityValidation(quantity);

  if (isProductExists) return { 
    code: 'invalid_data',
    message: 'Product already exists'
  };

  if (!isNameValid) return { 
    code: 'invalid_data',
    message: '\"name\" length must be at least 5 characters long'
  };

  if (!existName) return { 
    code: 'invalid_data',
    message: 'Product already exists'
  };

  if (!isQuantityString) return { 
    code: 'invalid_data',
    message: '\"quantity\" must be a number'
  };

  if (!isQuantityValid) return { 
    code: 'invalid_data',
    message: '\"quantity\" must be at larger than or equal to 1'
  };

  const newProducts = await ProductsModel
    .create(name, quantity);

  return {
    _id: newProducts._id,
    name: newProducts.name,
    quantity: newProducts.quantity
  };
};

module.exports = {
  create,
  // getAll,
};
