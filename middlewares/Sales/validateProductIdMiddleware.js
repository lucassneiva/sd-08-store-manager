const Products = require('../../services/Products');
const { RESPONSE_ERROR } = require('../../common/erroTypes');

module.exports = async (req, res, next) => {
  const { eSaleIdQnt } = RESPONSE_ERROR;
  const productsList = req.body;
  const validate = productsList.map(async (product) => {
    const { id } = product;
    await Products.searchById(id);
  });

  if (validate.find((item) => item === null)) {
    return res.status(eSaleIdQnt.status).json({ err: eSaleIdQnt.err });
  }

  next();
};
