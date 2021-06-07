const { Router } = require('express');
const service = require('../services/productService');
const rescue = require('express-rescue');

const router = Router();

router.get('/', rescue(async (req, res) => {
  const STATUS_200 = 200;
  const result = await service.getAll();
  res.status(STATUS_200).json({ products: result });
}));

router.get('/:id', rescue (async (req, res) => {
  const STATUS_422 = 422;
  const STATUS_200 = 200;
  const STATUS_500 = 500;
  try {
    const { id } = req.params;
    const products = await service.getById(id);
    res.status(STATUS_200).json(products);
  } catch (err) {
    if (err.err.code === 'invalid_data') {
      return res.status(STATUS_422).json(err);
    }
    console.log(err);
    res.status(STATUS_500).json({ message: 'Algo deu errado' });
  }
}));

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

router.put('/:id', rescue(async (req, res) => {
  const STATUS_200 = 200;
  const STATUS_500 = 500;
  const STATUS_422 = 422;
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await service.update(id, name, quantity) ;
    res.status(STATUS_200).json(product);
  } catch (err) {
    if (err.err.code === 'invalid_data') {
      return res.status(STATUS_422).json(err);
    }
    console.log(err);
    res.status(STATUS_500).json({ message: 'Algo deu errado' });
  }
}));

router.delete('/:id', rescue(async (req, res) => {
  const STATUS_200 = 200;
  const STATUS_500 = 500;
  const STATUS_422 = 422;
  try {
    const { id } = req.params;
    const product = await service.remove(id);
    res.status(STATUS_200).json(product);
  } catch (err) {
    if (err.err.code === 'invalid_data') {
      return res.status(STATUS_422).json(err);
    }
    console.log(err);
    res.status(STATUS_500).json({ message: 'Algo deu errado' });
  }
}));

module.exports = router;
