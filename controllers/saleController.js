const { Router } = require('express');
const service = require('../services/saleService');
const rescue = require('express-rescue');
const router = Router();

router.get('/', rescue(async (_req, res) => {
  const STATUS_200 = 200;

  const sales = await service.getAll();
  res.status(STATUS_200).json({sales});
}));

router.get('/:id', rescue(async (req, res) => {
  const STATUS_200 = 200;
  const STATUS_404 = 404;

  const { id } = req.params;
  const sale = await service.getById(id);

  if (sale.err) {
    res.status( STATUS_404).json(sale);
  }

  res.status(STATUS_200).json(sale);
}));

router.post('/', rescue(async (req, res) => {
  const STATUS_200 = 200;
  const STATUS_422 = 422;

  const sale = await service.create(req.body);
  if (sale.err) {
    return res.status(STATUS_422).json(sale);
  }
  return res.status(STATUS_200).json(sale);

}));

router.put('/:id', rescue(async (req, res) => {
  const STATUS_200 = 200;
  const STATUS_422 = 422;

  const { id } = req.params;
  const sale = await service.update(id, req.body) ;

  if (sale.err) {
    return res.status(STATUS_422).json(sale);
  }
  res.status(STATUS_200).json(sale);
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
