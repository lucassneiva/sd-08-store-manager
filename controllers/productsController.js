const rescue = require('express-rescue');
const productsServices = require('../services/productsServices');
// const { validate } = require ('../Schema/productsSchema');

const STATUS_ERR = 422;
const STATUS_OK = 201;
const MIN_LENGTH = 5;

const validate = async (name, _quantity) => {
  if (name.length < MIN_LENGTH) return {
    code: 422,
    message: '"name" length must be at least 5 characters long',
  };
};

const insert = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const valid = await validate(name, quantity);
  if (valid) {
    return res.status(valid.code).json({ message: valid.message });
  }

  const data = await productsServices.insert(name, quantity);

  if(!data) return res.status(STATUS_ERR).json({message: 'deu ruin'});

  return res.status(STATUS_OK).json(data);
});

module.exports = {
  insert
};
