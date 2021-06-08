const express = require('express');
const router = express.Router();
const { STATUS_500, DEU_ERRO } = require('../statusCode');

const salesServices = require('../services/salesServices');

const addSales = async (req, res) => {
  const result = await salesServices.addSalesServices(req.body);
  res.status(result.statusCode).json(result.json);
};

const getAllSales = async (req, res) => {
  const result = await salesServices.getAllSalesServices();
  res.status(result.statusCode).json(result.json);
};

const findByIdSales = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.findByIdSalesServices(id);
  res.status(result.statusCode).json(result.json);
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.updateSalesServices(id, req.body);
  res.status(result.statusCode).json(result.json);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.deleteSalesServices(id);
  res.status(result.statusCode).json(result.json);
};

module.exports = {
  addSales,
  getAllSales,
  findByIdSales,
  updateSales,
  deleteSales
};
