const { deleteProduct } = require('../services/Products');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { status, response } = await deleteProduct(id);

  return res.status(status).json(response);
};
