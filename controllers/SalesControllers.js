const Service = require('../services/SalesServices');
const Model = require('../models/SalesModel');

const httpSuccess = 200;

const erro = {
  err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format'
  },
};

const http422 = 422;

const create = async (req, res) => {
  try {
    const result = await Service.create([{itensSold: req.body}]);
    const newResult = {
      _id: result[0]._id,
      itensSold: result[0].itensSold
    };
    res.status(httpSuccess).json(newResult);
  }catch (e) {
    const data = JSON.parse(e.message);
    res.status(data.http).json({err: data.err});
  }
};

const getAllSales = async (req, res) => {
  try {
    const result = await Service.getAll();
    res.status(result.http).json({sales: result.sales});
  } catch (error) {
    console.log(e.message);
  }
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Service.getById(id);
    res.status(result.http).json(result.result);
  } catch (error) {
    const errMessage = JSON.parse(error.message);
    res.status(errMessage.http).json({err:errMessage.err});
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    await Service.update(id, req.body);
    res.status(httpSuccess).json({_id: id, itensSold: req.body});
  } catch (error) {
    const errMessage = JSON.parse(error.message);
    res.status(errMessage.http).json({err:errMessage.err});
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const itemData = await Service.getById(id);
    const deleteResult = await Service.deleteSale(id);
    res.status(itemData.http).json(itemData.result);
  } catch (error) {
    res.status(http422).json(erro);

  }
};

module.exports = {
  create,
  getAllSales,
  getSaleById,
  update,
  deleteById
};
