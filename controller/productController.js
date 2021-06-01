const products = require('../services/productService');
const {error, update} = require('../services/responseType');
const { checkProduct } = require('../middlewares/index');
const createProduct = async (req, res) => {
  const {name, quantity} = req.body;
  try {
    checkProduct(req, res);
    const data = await products.createProduct(name, quantity);
    if(data.err) return res.status(error).json(data);
    res.status(update).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct
};
