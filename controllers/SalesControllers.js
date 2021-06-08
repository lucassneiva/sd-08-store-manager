const Service = require('../services/SalesServices');

const httpSuccess = 200;

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

module.exports = {
  create,
  getAllSales,
  getSaleById
};
