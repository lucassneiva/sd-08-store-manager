

const productsService = require('../services/product');

const NEW_ITEM = 201;
const INTERNAL_ERROR = 500;
const SUCESS = 200;
const UNPROCESSABLE_ENTITY = 422;



const controllerProduct = async (req, res) => {
  try {
    const {name, quantity} = req.body;
    const create = await productsService.addNewProduct(name, quantity);
    return res.status(NEW_ITEM).json(create.ops[0]);
  }   catch (error) {
    console.error(error);
    return res.status(INTERNAL_ERROR)
      .json({error: error.message});
  }
};

const controllerAllProduct = async (_req, res) => {
  try {
    const listAll = await productsService.getAllProducts();
    return res.status(SUCESS).json({ products: listAll });
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_ERROR)
      .json({ error: error.menssage});  
  }
};

const controllerById = async (req, res) => {
  try {
    const { id } = req.params;
    const idProduct = await productsService.getById(id);
    if (!idProduct) {
      return res.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }
    return res.status(SUCESS).json(idProduct);
  } catch (error) {
    console.error(error);
    res.status(INTERNAL_ERROR).json({ error: error.message });
  }
};

const controllerUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    // console.log(id, name, quantity);
    const upProduct = await productsService.update(id, name, quantity);
    return res.status(SUCESS).json(upProduct);
  } catch (error) {
    res.status(INTERNAL_ERROR).json({ error: error.message });
  }
};

const controllerRemove = async (req, res) => {
  try {
    const { id } = req.params;
    const productId = await productsService.getById(id);
    if (!productId) {
      return res.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }
    const removeId = await productsService.remove(id);
    return res.status(SUCESS).json(removeId);
  } catch (error) {
    res.status(INTERNAL_ERROR).json({ message });
  }
};




module.exports = {
  controllerProduct,
  controllerAllProduct,
  controllerById,
  controllerUpdate,
  controllerRemove
};
