const { ObjectId, ObjectID } = require('mongodb');
const { FORM, RESPONSE } = require('../config/constant/returnMessage');
const { productModel } = require('../models');

exports.registerProduct = async (entry) => {
  const nameProduct = entry.name;
  const existNameProduct = await productModel.existByName(nameProduct);

  if (existNameProduct) throw new Error(FORM.NAME_EXIST);
  const product = await productModel.add(entry);
  return product;
};

exports.editProduct = async (id, entry) => {
  if (!ObjectId.isValid(id)) throw new Error(RESPONSE.ID_INVALID);

  // const nameProduct = entry.name;
  // const existNameProduct = await productModel.existByName(nameProduct);
  // if (existNameProduct) throw new Error(FORM.NAME_EXIST);

  const existProduct = await productModel.existById(id);
  if (!existProduct) throw new Error(RESPONSE.PRODUCT_NOT_EXIST);
  return await productModel.update(id, entry);
};

exports.excludeProduct = async (id) => {
  if (!ObjectID.isValid(id)) throw new Error(RESPONSE.ID_INVALID);
  const existProduct = await productModel.existById(id);
  if (!existProduct) throw new Error(RESPONSE.PRODUCT_NOT_EXIST);
  await productModel.exclude(id);
};
