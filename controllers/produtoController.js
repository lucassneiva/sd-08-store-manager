const express = require('express');
const router = express.Router();

const {
  getAllProdutos,
  addProdutos,
  getByIdProdutos,
} = require('../services/produtoServices');

const SUCESSO = 201;
const GET200 = 200;
const ERRO_CONEXAO = 500;

const getAllProducts = async (_req, res) => {
  try {
    const products = await getAllProdutos();
    res.status(GET200).json({ products });
  } catch (error) {
    res.status(ERRO_CONEXAO).json({ message: 'Fatal Error 500' });
  }
};

const addProducts = async (req, res) => {
  try {
    const produto = await addProdutos(req.body);
    res.status(SUCESSO).json(produto);
  } catch (error) {
    res.status(ERRO_CONEXAO).json({ message: 'Fatal Error 500' });
  }
};

const getByIdProducts = async (req, res) => {
  try {
    const products = await getByIdProdutos(req.params);
    res.status(GET200).json(products);
  } catch (error) {
    res.status(ERRO_CONEXAO).json({ message: 'Fatal Error 500' });
  }
};

module.exports = {
  getAllProducts,
  addProducts,
  getByIdProducts,
};
