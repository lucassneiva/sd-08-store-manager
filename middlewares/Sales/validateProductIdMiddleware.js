const Products = require('../../services/Products');
const { ERROR_TYPES } = require('../../utils/consts');

module.exports = async (req, res, next) => {
  const { eSaleIdQnt } = ERROR_TYPES;
  const productsList = req.body;
  const validate = productsList.map(async (product) => {
    const { id } = product;
    await Products.searchById(id);
  });

  if (validate.find(item => item === null)) {
    return res.status(eSaleIdQnt.status).json({err: eSaleIdQnt.err});
  }

  next();
};
