const { Router } = require('express');
const service = require('../services/productService');
const rescue = require('express-rescue');

const router = Router();

router.get('/', async (_req, res) => {
  const STATUS_200 = 200;
  const product = await service.getAll();
  res.status(STATUS_200).json(product);
});

router.post('/', rescue(async (req, res) => {
  const STATUS_201 = 201;
  const STATUS_422 = 422;
  const STATUS_500 = 500;
  try {
    const { name, quantity } = req.body;
    const product = await service.create({ name, quantity });
    res.status(STATUS_201).json(product);
  } catch (err) {
    if (err.err.code === 'invalid_data') {
      return res.status(STATUS_422).json(err);
    }
    console.error(err);
    res.status(STATUS_500).json({ message: 'Algo deu errado' });
  }
}));

module.exports = router;
