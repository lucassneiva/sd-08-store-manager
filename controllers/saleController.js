const { Router } = require('express');
const service = require('../services/saleService');
const rescue = require('express-rescue');

const router = Router();

router.get('/', rescue(async (_req, res) => {
  const STATUS_200 = 200;
  const STATUS_500 = 500;
  try {
    const sale = await service.getAll();
    res.status(STATUS_200).json(sale);
  } catch (err) {
    console.error(err);
    res.status(STATUS_500).json({ message: 'Algo deu errado' });
  }
}));

router.get('/:id', rescue(async (req, res) => {
  const STATUS_200 = 200;
  const STATUS_500 = 500;
  const STATUS_404 = 404;
  try {
    const { id } = req.params;
    const sale = await service.getById(id);
    res.status(STATUS_200).json(sale);
  } catch (err) {
    if (err.err.code == 'not_found') {
      res.status( STATUS_404).json(err);
    }
    console.error(err);
    res.status(STATUS_500).json({ message: 'Algo deu errado' });
  }
}));

router.post('/', rescue(async (req, res) => {
  const STATUS_200 = 200;
  const STATUS_422 = 422;
  const STATUS_500 = 500;
  try {
    const [{ productId, quantity }] = req.body;
    const sale = await service.create({ productId, quantity });
    res.status(STATUS_200).json(sale);
  } catch (err) {
    if (err.err.code == 'invalid_data') {
      res.status(STATUS_422).json(err);
    }
    console.error(err);
    res.status(STATUS_500).json({ message: 'Algo deu errado' });
  }
}));

router.delete('/:id', rescue( async(req, res) => {
  const STATUS_200 = 200;
  const STATUS_500 = 500;
  const STATUS_422 = 422;
  try {
    const { id } = req.params;
    const sale = await service.remove(id);
    res.status(STATUS_200).json(sale);
  } catch (erro) {
    if (erro.err.code === 'invalid_data') {
      res.status(STATUS_422).json(erro);
    }
    console.error(erro);
    res.status(STATUS_500).json({ message: 'Algo deu errado' });
  }
}));

module.exports = router;
