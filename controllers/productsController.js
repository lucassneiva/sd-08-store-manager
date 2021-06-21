const express = require('express');
const rescue = require('express-rescue');
const router = express.Router();

const serviceProducts = require('../services/productsServices');

const { 
  validateProduct, 
  validateProductId 
} = require('../middlewares/productsMiddleware');
const StatusCodes = {
  UNPROCESSABLE_ENTITY: 422,
  NOT_FOUND: 404,
  CREATED: 201,
  OK: 200
};

router.get('/', rescue(async (_req, res) => {
  const products  = await serviceProducts.getAllProducts();

  if(!products) return res.status(StatusCodes.NOT_FOUND).send({ message: 'Not found' });

  return res.status(StatusCodes.OK).send(products);
}));

router.get('/:id', validateProductId, rescue(async (req, res) => {
  const { id } = req.params;
  const product = await serviceProducts.getProductById(id);

  return res.status(StatusCodes.OK).send(product);
}));

router.delete('/:id', validateProductId, rescue(async (req, res) => {
  const { id } = req.params;
  const product = await serviceProducts.getProductById(id);
  await serviceProducts.deleteProductById(id);
  
  return res.status(StatusCodes.OK).send(product);
}));

router.post('/', validateProduct, rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { _id, err } = await serviceProducts.createProduct(name, quantity);

  if(err) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({ err });

  return res.status(StatusCodes.CREATED).send({ _id, name, quantity });
}));

router.put('/:id', validateProduct, validateProductId, rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  await serviceProducts.updateProductById(id, name, quantity);

  const product = await serviceProducts.getProductById(id);

  return res.status(StatusCodes.OK).send(product);
}));

module.exports = router;
