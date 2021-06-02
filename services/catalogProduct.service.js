const { FORM } = require('../config/constant/returnMessage');
const { productModel } = require('../models');

exports.registerProduct = async (entry) => {
  const nameProduct = entry.name;
  const existProduct = await productModel.existByName(nameProduct);

  if(existProduct) throw new Error(FORM.NAME_EXIST);
  const product = await productModel.add(entry);
  return product;
};
