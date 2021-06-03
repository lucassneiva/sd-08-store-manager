const SalesModel = require('../models/salesModels');
const ProductsModel = require('../models/productsModels');

const getAllProducts = (productsData) => {
  const { name, quantity } = productsData;

  return { name, quantity };
};

const getAll = async () => {
  const productsData = await SalesModel
    .getAll();

  // console.log('linha 45 services', productsData);
  return productsData;
  // return productsData.map(getAllProducts);
};

const getByIdService = async (id) => {
  const productsById = await SalesModel
    .getById(id);
  console.log('linha 21 services', productsById);
  if( productsById === null) return {
    code: 'invalid_data',
    message: 'Wrong id format'
  };
  return productsById;

  // return productsById;
  // // return productsData.map(getAllProducts);
};

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
  const dataProducts = await SalesModel.getByName(name);
  console.log(dataProducts);
  if (dataProducts === null) return false;
  return true;
};

const create = async (idCheckOut) => {
  console.log('linha 66 sales services', await idCheckOut.quantity);

  const isQuantityString = await idCheckOut
    .map((sales) => quantityNotIsString(sales.quantity));
  const isQuantityValid = await idCheckOut
    .map((sales) => quantityValidation(sales.quantity));

  if (!isQuantityString) return { 
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  };

  if (!isQuantityValid) return { 
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  };

  const mapIdCheckOut = await idCheckOut
    .map((sales) => ProductsModel.getById(sales.productId));

  const salesProduct = await Promise.all(mapIdCheckOut);

  console.log('linha 68 sales services', salesProduct);

  const createSalesPromisse = await idCheckOut
    .map((sales) => SalesModel.create(sales));

  const createSales = await Promise.all(createSalesPromisse);

  console.log('linha 92 sales services', createSales);
  
  // console.log('linha 81 services', name, quantity);
  // const newProducts = await SalesModel
  //   .create(name, quantity);
  // console.log('linha 83 services', newProducts);

  return createSales.map((sales) => {
    return {
      _id: sales._id,
      itensSold: [{
        productId: sales.productId,
        quantity: sales.quantity
      }]
    };
  });
  // {
    
  // name: name,
  // quantity: quantity
  // Chegou: 'sales services create',
  // };
};

const update = async (id, name, quantity) => {
  // const isProductExists = await productExists(name);
  // console.log(isProductExists);
  // const isNameValid = nameValidation(name);
  const isNameValid = nameValidation(name);
  // const existName = true;

  const isQuantityString = quantityNotIsString(quantity);
  const isQuantityValid = quantityValidation(quantity);

  // if (isProductExists) return { 
  //   code: 'invalid_data',
  //   message: 'Product already exists'
  // };

  if (!isNameValid) return { 
    code: 'invalid_data',
    message: '\"name\" length must be at least 5 characters long'
  };

  if (!isQuantityString) return { 
    code: 'invalid_data',
    message: '\"quantity\" must be a number'
  };

  if (!isQuantityValid) return { 
    code: 'invalid_data',
    message: '\"quantity\" must be larger than or equal to 1'
  };

  console.log('linha 81 services', name, quantity);
  const updateProducts = await SalesModel
    .update(id, name, quantity);
  console.log('linha 139 services', updateProducts);

  return {
    _id: id,
    name: name,
    quantity: quantity
  };
};

const exclude = async (id) => {
  const productsById = await SalesModel
    .getById(id);
  console.log('linha 21 services', productsById);

  const updateProducts = await SalesModel
    .exclude(id);
  console.log('linha 139 services', updateProducts);
  if( updateProducts === null) return {
    code: 'invalid_data',
    message: 'Wrong id format'
  };

  return {
    _id: id,
    name: productsById.name,
    quantity: productsById.quantity
  };
};

module.exports = {
  create,
  getAll,
  getByIdService,
  update,
  exclude,
};
