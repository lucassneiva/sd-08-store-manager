const express = require('express');
const router = express.Router();
const { DEU_ERRO, STATUS_500 } = require('../statusCode');

const productsServices = require('../services/productsServices');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productsServices.addProduct(name, quantity);
  return res.status(result.statusCode).json(result.json);
};

const getAll = async (_req, res) => {
  const result = await productsServices.getAllProductsServices();
  res.status(result.statusCode).json(result.json);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await productsServices.getByIdProductsServices(id);
  res.status(result.statusCode).json(result.json);
};

const updateProducts = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const result = await productsServices.updateProductsServices(id, name, quantity);
  res.status(result.statusCode).json(result.json);
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;
  const result = await productsServices.deleteProductsServices(id);
  res.status(result.statusCode).json(result.json);
};

module.exports = {
  addProduct,
  getAll,
  findById,
  updateProducts,
  deleteProducts
};
