const express = require('express');
const router = express.Router();

const salesServices = require('../services/salesServices');

router.post('/', async (req, res) => {
  try {
    const result = await salesServices.addSalesServices(req.body);
    res.status(result.statusCode).json(result.json);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'algo deu errado' });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await salesServices.getAllSalesServices();
    res.status(result.statusCode).json(result.json);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'algo deu errado' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesServices.findByIdSalesServices(id);
    res.status(result.statusCode).json(result.json);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'algo deu errado' });
  }
});

module.exports = router;
