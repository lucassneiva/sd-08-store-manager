const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');

const SALES_QUANTITY = 0;

async function create(sales) {
  console.log('service');
  const productIdExists = await Promise.all(sales.map(async (sale) => {
    const checkId = await ProductsModel.getById(sale.productId);
    if(!checkId || sale.quantity <= SALES_QUANTITY ||
      typeof sale.quantity !== 'number') return false;
    return true;
  }));
  if(productIdExists.includes(false)) throw new Error();

  const newSale = await SalesModel.create(sales);
  return newSale.ops[0];

}

async function update(id, data) {
  const checkQuantity = data.every((sale) => sale.quantity > SALES_QUANTITY);
  if(!checkQuantity) throw new Error();
  const {value} = await SalesModel.update(id, data);
  return value;
}

module.exports = {
  create,
  update
};
