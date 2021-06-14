const ProductsModel = require('../models/productsModel');
const Validation = require('../validation/productsSchema');

async function create({name, quantity}) {
  const { details } = Validation.isValid({name, quantity});
  if(details) return { error: true, message: details[0].message };
  const productExists = await ProductsModel.getByName(name);
  if(productExists) return { error: true, message: 'Product already exists' };

  const { _id } = await ProductsModel.create({name, quantity});
  return {
    _id,
    name,
    quantity
  };
}


module.exports = {
  create
};
