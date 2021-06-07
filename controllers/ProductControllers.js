
const Service = require('../services/ProductServices');

const httpCreated = 201;

const httpInternalServerError = 500;

const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await Service.create(name, quantity);
    res.status(httpCreated).json(result);
  } catch(e) {
    const data = JSON.parse(e.message);
    res.status(data.http).json({err: data.err});
  }
};

module.exports = {
  create,
};
