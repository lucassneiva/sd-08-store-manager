const ProductModel = require('../models/product');



const AddNewProduct = async (name, quantity) => {
  const newProduct = await ProductModel.addNewProduct(name, quantity);
  return newProduct;
};

module.exports = {
  AddNewProduct
};
