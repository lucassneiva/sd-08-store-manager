const { getAll, getOne, create, updateOne, deleteOne } = require('../models/salesModel');
const { getAll: getAllP} = require('../models/productsModel');
const PRODUCT_QUANTITY_MINIMUM = 0;
const SUCCESS_STATUS = 200;
const INSERTED_STATUS = 201;
const ERROR_STATUS = 500;
const INVALID_DATA_STATUS = 422;
const NOT_FOUND_STATUS = 404;

const createSale = async (req, res, next) => {
  try {
    const result = await create(req.body);
    res.status(SUCCESS_STATUS).json(result);
  } catch (err) {
    res.status(ERROR_STATUS).json('Nao adicionou sale');
  }
};

const checkIds = async (req, res, next) => {
  try {
    const allProducts = await getAllP();
    const result = req.body.map( ({productId}) => allProducts
      .some(({_id}) => {
        return _id == productId;})).every( check => check);
    result ? next() : next({
      code: 'invalid_data', 
      message: 'Wrong product ID or invalid quantity', 
      status: INVALID_DATA_STATUS
    });
  } catch (err) {
    res.status(ERROR_STATUS).json('Nao checou nada id check');
  }
};

const checkQuantities = (req, _res, next) => {
  req.body.map( ({quantity}) => {
    if(typeof quantity !== 'number' || quantity <= PRODUCT_QUANTITY_MINIMUM) 
      return next({
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity', 
        status: INVALID_DATA_STATUS,
      });
  });
  next();
};

const getAllSales = async  (_req, res, _next) => {
  try {
    const result = await getAll();
    res.status(SUCCESS_STATUS).json({ sales: [...result]});
  } catch (error) {
    res.status(ERROR_STATUS).json('Nao checou nada getAll');
  }
};

const getOneSale = async (req, res, next) => {
  try {
    const result = await getOne(req.params.id);
    if(!result) return next({
      code: 'not_found',
      message: 'Sale not found', 
      status: NOT_FOUND_STATUS,
    });
    res.status(SUCCESS_STATUS).json(result);
  } catch (error) {
    next({
      code: 'not_found',
      message: 'Sale not found', 
      status: NOT_FOUND_STATUS,
    });
  }
};

const updateSale = async (req, res, _next) => {
  try {
    await updateOne(req.params.id, req.body);
    const result = await getOne(req.params.id);
    res.status(SUCCESS_STATUS).json(result);
  } catch (error) {
    res.status(ERROR_STATUS).json('Nao checou nada updateOne');
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const result = await getOne(req.params.id);
    if(!result) return next({
      code: 'invalid_data',
      message: 'Wrong sale ID format', 
      status: INVALID_DATA_STATUS,
    });
    await deleteOne(req.params.id);
    res.status(SUCCESS_STATUS).json({ message: 'Apagou com sucesso'});
  } catch (error) {
    next({
      code: 'invalid_data',
      message: 'Wrong sale ID format', 
      status: INVALID_DATA_STATUS,
    });
  }
};

module.exports = { 
  createSale,
  checkIds,
  checkQuantities,
  getAllSales,
  getOneSale,
  updateSale,
  deleteSale,
};