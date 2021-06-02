const { getAll, create, getOne, updateOne, 
  deleteOne } = require('../models/productsModel'); 
const PRODUCT_QUANTITY_MINIMUM = 0;
const NAME_LENGTH = 5;
const SUCCESS_STATUS = 200;
const INSERTED_STATUS = 201;
const ERROR_STATUS = 500;
const INVALID_DATA_STATUS = 422;

const getAllProducts = async (_req, res) => {
  try {
    const products = await getAll();
    res.status(SUCCESS_STATUS).json(products);
  } catch (error) {
    res.status(ERROR_STATUS).json({message: 'Ops, algo de errado'});
  }
};

const createProduct = async (req, res) =>{
  try {
    const {name, quantity} = req.body;
    const result = await create({name, quantity});
    res.status(INSERTED_STATUS).json(result);
  } catch (err) {
    res.status(ERROR_STATUS)
      .json({ message: err });
  }
};

const checkName = async (req, _res, next) => {
  const {name} = req.body;
  const allProducts = await getAll();
  if(allProducts.some( product => product.name === name)) return next({
    code: 'invalid_data', 
    message: 'Product already exists', 
    status: INVALID_DATA_STATUS
  });
  if(typeof name !== 'string') return next({ 
    code: 'invalid_data', 
    message: 'Name must be type string', 
    status: INVALID_DATA_STATUS});
  if(name.length <= NAME_LENGTH) 
    return next({ code: 'invalid_data', 
      message: '"name" length must be at least 5 characters long', 
      status: INVALID_DATA_STATUS});
  next();
};

const checkQuantity = (req,_res,next) => {
  const { quantity } = req.body;
  if( !Number.isInteger(quantity) ) return next({
    code: 'invalid_data',
    message: '"quantity" must be a number',
    status: INVALID_DATA_STATUS,
  });

  if( quantity <=  PRODUCT_QUANTITY_MINIMUM) return next({
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
    status: INVALID_DATA_STATUS,
  });

  next();
};

const getSingleProduct = async (req, res, next) => {
  try {
    const { id }  = req.params;
    const result = await getOne(id);
    res.status(SUCCESS_STATUS).json(result);
  } catch (err) {
    return next({
      code: 'invalid_data',
      message: 'Wrong id format',
      status: INVALID_DATA_STATUS,
    });
  }  
};

const updateProduct = async (req, res, next) => {
  try {
    const { id }  = req.params;
    const {name, quantity} = req.body;
    await updateOne(id, name, quantity);
    res.status(SUCCESS_STATUS).json({ _id: id, name, quantity});
  } catch (err) {
    return next({
      code: 'invalid_data',
      message: 'Wrong id format',
      status: INVALID_DATA_STATUS,
    });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id }  = req.params;
    const result = await getOne(id);
    await deleteOne(id);
    res.status(SUCCESS_STATUS).json(result);
  } catch (err) {
    return next({
      code: 'invalid_data',
      message: 'Wrong id format',
      status: INVALID_DATA_STATUS,
    });
  }
};

module.exports = { 
  getAllProducts, 
  createProduct, 
  checkName, 
  checkQuantity, 
  getSingleProduct,
  updateProduct,
  deleteProduct,
};