const SalesModel = require('../models/sales');
const ProductsModel = require('../models/products');

const { ObjectId } = require('mongodb');

const WRONG_PRODUCT_OR_ID = 'Wrong product ID or invalid quantity';
const WRONG_SALE_ID = 'Wrong sale ID format';

const isQuantityInvalid = (quantity) => {
  const MIN_QUANTITY = 1;

  console.log(quantity, 'quantity');
  if(typeof quantity !== 'number') {
    throw new Error(WRONG_PRODUCT_OR_ID);
  }

  if(quantity < MIN_QUANTITY) {
    throw new Error(WRONG_PRODUCT_OR_ID);
  }
};

const create = async (itensSold) => {
  
  const productPromise = itensSold.map((sale) => ProductsModel.readById(sale.productId));
  const products = await Promise.all(productPromise);

  if (products.some((product) => !product)) {
    throw new Error(WRONG_PRODUCT_OR_ID);
  }

  itensSold.forEach((elem) => isQuantityInvalid(elem.quantity));

  const newSale = { itensSold };
  const { insertedId: _id } = await SalesModel.create(newSale);

  const subtractProductQuantity = 
  products.map(async(prod, index) => {
    const { result } = await ProductsModel
      .updateQuantity(prod._id, -itensSold[index].quantity);
    return result;
  });
  await Promise.all(subtractProductQuantity);

  return {
    _id,
    itensSold,
  };
};

const read = async () => SalesModel.read();

const readById = async (id) => {
  console.log(id, ObjectId.isValid(id));

  if(!ObjectId.isValid(id)){
    throw new Error('Sale not found');
  }

  const sale = await SalesModel.readById(id);

  if(!sale) {
    throw new Error('Sale not found');
  }

  return sale;
};

const update = async (id, itensSold) => {

  console.log(id, ObjectId.isValid(id));

  if(!ObjectId.isValid(id)){
    throw new Error(WRONG_PRODUCT_OR_ID);
  }

  const sale = await SalesModel.readById(id);

  if(!sale) {
    throw new Error(WRONG_PRODUCT_OR_ID);
  }

  const productPromise = itensSold.map((sale) => ProductsModel.readById(sale.productId));
  const products = await Promise.all(productPromise);

  if (products.some((product) => !product)) {
    throw new Error(WRONG_PRODUCT_OR_ID);
  }

  itensSold.forEach((elem) => isQuantityInvalid(elem.quantity));

  const updated = await SalesModel.update(id, itensSold);

  return {
    _id: id,
    itensSold,
  };
};

const deleteSale = async (id) => {
  console.log(id, ObjectId.isValid(id), 'deleteSale');

  if(!ObjectId.isValid(id)){
    throw new Error(WRONG_SALE_ID);
  }

  const sale = await SalesModel.readById(id);

  if(!sale){
    throw new Error(WRONG_SALE_ID);
  }

  const deletion = await SalesModel.deleteSale(id);
  console.log(deletion.result, 'deletion');

  const incrementProductQuantity = 
  sale.itensSold.map(async(prod) => {
    console.log(prod);
    const { result } = await ProductsModel
      .updateQuantity(prod.productId, prod.quantity);
    return result;
  });
  const incremented = await Promise.all(incrementProductQuantity);
  console.log(incremented);

  return sale;
};

module.exports = {
  create,
  read,
  readById,
  update,
  deleteSale,
};