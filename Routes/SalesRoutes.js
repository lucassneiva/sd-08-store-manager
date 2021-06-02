const { Router } = require('express');
const SalesController = require('../controller/SalesController');

const SalesRouter = Router();

SalesRouter.get('/', SalesController.getAllCrushs).post('/', SalesController.addCrush);

SalesRouter.get('/search', SalesController.searchCrush);

SalesRouter.get('/:id', SalesController.getOneCrush)
  .put('/:id', SalesController.editCrush)
  .delete('/:id', SalesController.deleteCrush);

module.exports = SalesRouter;
