const { insert } = require('../models/productsModel');
const { validate } = require ('../Schema/productsSchema');
const rescue = require('express-rescue');

const insertProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const valid = await validate(name, quantity);
  if (valid) {
    return res.status(valid.code).json({ message: valid.message });
  }

  const data = await insert(name, quantity);

  if(!data) return res.status(422).json({message: 'deu ruin'});

  return res.status(201).json(data);
});

module.exports = {
  insertProduct
};
