const ProductsModel = require('../models/productsModel');
const fieldValidation = require('../validation/productsSchema');

async function create({name, quantity}) {
  const { details } = fieldValidation.isValid({name, quantity});
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

async function update(id, name, quantity) {
  const { details } = fieldValidation.isValid( { name, quantity } );
  if(details) return { error: true, message: details[0].message };
  const { value } = await ProductsModel.update(id, name, quantity);
  if(!value) return { error: true, message: 'Product not found' };

  return value;
}


module.exports = {
  create,
  update
};
