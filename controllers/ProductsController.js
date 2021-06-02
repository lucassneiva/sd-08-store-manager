const { addProduct } = require('../models/ProductsModel');

const status = {
  created: 201,
};

module.exports = {
  add: async (req, res) => {
    const { name, quantity } = req.body;
    const result = await addProduct(name, quantity);
    res.status(status.created).json(result);
  },
};
