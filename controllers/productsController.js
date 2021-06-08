const productsServices = require('../services/productsServices');

const insert = async (req, res) => {
  const { name, quantity } = req.body;

  const body = await productsServices.insert(name, quantity);

  if(body.err) return res.status(body.status).json(body);

  return res.status(body.status).json(body.data);
};

module.exports = {
  insert
};
