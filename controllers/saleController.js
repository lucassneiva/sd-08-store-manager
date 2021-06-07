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
    res.status(STATUS_500).json({ message: 'Erro' });
  }
}));

router.get('/:id', rescue(async (req, res) => {
  const STATUS_200 = 200;
  const STATUS_500 = 500;
  const STATUS_404 = 404;
  try {
    const { id } = req.params;
    const sale = await service.getById(id);
    const { _id, productId, quantity } = sale;
    const result = {_id, itensSold: [{productId, quantity}]};
    res.status(STATUS_200).json(result);
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

  const sale = await service.create(req.body);
  if (sale.err) {
    return res.status(STATUS_422).json(sale);
  }
  return res.status(STATUS_200).json(sale);

}));

router.put('/:id', rescue(async (req, res) => {
  const STATUS_200 = 200;
  const STATUS_500 = 500;
  const STATUS_422 = 422;
  try {
    const { id } = req.params;
    const [{ productId, quantity }] = req.body;
    const sale = await service.update(id, productId, quantity) ;
    res.status(STATUS_200).json(sale);
  } catch (err) {
    if (err.err.code === 'invalid_data') {
      return res.status(STATUS_422).json(err);
    }
    console.log(err);
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
