const ProductModel = require('../models/productsModel');

const STATUS = 200;

async function getAll(_req, res) {
  try {
    const products = await ProductModel.getAll();
    res.status(STATUS).json(products);
  } catch (error) {

  }
}


module.exports = {
  getAll,
};
