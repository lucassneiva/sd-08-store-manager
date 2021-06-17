const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');

const SALES_QUANTITY = 0;

async function create(sales) {
  console.log('service');
  const idExists = await Promise.all(sales.map(async (sale) => {
    const checkId = await ProductsModel.getById(sale.productId);
    if(!checkId || sale.quantity <= SALES_QUANTITY ||
      typeof sale.quantity !== 'number') return false;
    return true;
  }));
  console.log(idExists);
  if(idExists.includes(false)) return { error: true,
    message: 'Wrong product ID or invalid quantity'};

  const newSale = await SalesModel.create(sales);
  return newSale.ops[0];

}

module.exports = {
  create
};
