const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');

const SALES_QUANTITY = 0;

async function updateStock(data, op) {
  await Promise.all(data.map(async ({product, saleQuantity}) => {
    const newQuantity = op === 'decrement'
      ? product.quantity - saleQuantity : product.quantity + saleQuantity;
    console.log(newQuantity);
    await ProductsModel.update(product._id, product.name, newQuantity);
    return;
  }));
}

async function create(sales) {
  const products = await Promise.all(sales.map(async (sale) => {
    const product = await ProductsModel.getById(sale.productId);
    if(!product || sale.quantity <= SALES_QUANTITY ||
      typeof sale.quantity !== 'number') return false;
    if(product.quantity < sale.quantity) return null;
    return { product, saleQuantity: sale.quantity};
  }));
  if(products.includes(false)) {
    const err = new Error('Wrong product ID or invalid quantity');
    err.code = 'invalid_data';
    throw err;
  }
  if(products.includes(null)) {
    const err = new Error('Such amount is not permitted to sell');
    err.code = 'stock_problem';
    throw err;
  }
  console.log(products);
  await updateStock(products, 'decrement');
  const newSale = await SalesModel.create(sales);
  return newSale.ops[0];

}

async function update(id, data) {
  const checkQuantity = data.every((sale) => sale.quantity > SALES_QUANTITY);
  if(!checkQuantity) throw new Error();
  const {value} = await SalesModel.update(id, data);
  return value;
}

async function exclude(id) {
  const { value } = await SalesModel.exclude(id);
  if(!value) throw Error();
  const products = await Promise.all(value.itensSold.map(async (product) => {
    const findItem = await ProductsModel.getById(product.productId);
    return { product: findItem, saleQuantity: product.quantity };
  }));
  await updateStock(products, 'increment');
  return value;

}

module.exports = {
  create,
  update,
  exclude
};
