
const productsService = require('../services/product');

const NEW_ITEM = 201;
const INTERNAL_ERROR = 500;


const controllerProduct = async (req, res) => {
  const newProduct = req.body;
  try {
    const create = await productsService.AddNewProduct(newProduct);
    return res.status(NEW_ITEM).json(create);
  }   catch (error) {
    console.error(error);
    return res.status(INTERNAL_ERROR)
      .json({error});
  }
};

module.exports = {
  controllerProduct
};
