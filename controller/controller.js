const service = require('../service/service');
const rescue = require('express-rescue');


const deuBom = 200;
const deuBomTb = 201;
const deuRuim = 422;

const userController = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const newProduct = await service.create(name, quantity);

    res.status(deuBomTb).json(newProduct);
  } catch(e) {
    res.status(deuRuim).json( {err: 
      { 
        code: 'invalid_data',
        message: e.message
      }
    } );
  }
};

const getAllProducts = rescue(async (_req, res) => {
  const products = await service.getAll();
  // console.log(products);

  res.status(deuBom).json({products});
});

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await service.getById(id);  

    res.status(deuBom).json(result);

  } catch (e) {
    res.status(deuRuim).json({err: 
      { 
        code: 'invalid_data',
        message: e.message
      }
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const result = await service.update(id, name, quantity);

    res.status(deuBom).json(result);
  } catch (e) {
    res.status(deuRuim).json( {err: 
      { 
        code: 'invalid_data',
        message: e.message
      }
    } );
  }
};

const excludeProduct = async(req, res) => {
  try {
    const { id } = req.params;
    const notProduct = await service.exclude(id);
    res.status(deuBom).json(notProduct);
  } catch (e) {
    console.log(e);
    res.status(deuRuim).send({err: 
      { 
        code: 'invalid_data',
        message: e.message
      }
    } );
  }
};


module.exports = {
  excludeProduct,
  userController, 
  getProductById, 
  getAllProducts,
  updateProduct
};
