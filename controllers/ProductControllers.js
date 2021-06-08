
const Service = require('../services/ProductServices');

const httpCreated = 201;
const httpSuccess = 200;

const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await Service.create(name, quantity);
    res.status(httpCreated).json(result);
  } catch(e) {
    const data = JSON.parse(e.message);
    res.status(data.http).json({err: data.err});
  }
};

const getAllProducts = async (req, res) => {
  try {
    const result = await Service.getAll();
    res.status(result.http).json({products: result.products});
  }catch(e) {
    console.log(e.message);

  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Service.getById(id);
    res.status(result.http).json(result.result);
  } catch (error) {
    console.log(error);
    const errMessage = JSON.parse(error.message);
    res.status(errMessage.http).json({err:errMessage.err});
  }
};

const updateById = async (req, res) => {
  try {
    const {id} = req.params;
    const { name, quantity } = req.body;

    await Service.update(id, name, quantity);
    res.status(httpSuccess).json({_id:id, name, quantity});
  } catch (e) {
    const data = JSON.parse(e.message);
    res.status(data.http).json({err: data.err});
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Service.getById(id);
    await Service.deleteProduct(id);
    res.status(httpSuccess).json(data.result);
  } catch (e) {
    const data = JSON.parse(e.message);
    res.status(data.http).json({err: data.err});
  }
};

module.exports = {
  create,
  getAllProducts,
  getProductById,
  updateById,
  deleteById
};
