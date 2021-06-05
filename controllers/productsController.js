const ProductModel = require('../models/productModel');
const { isValidName, isValidQuantity } = require('../services/productsService');

const SUCCESSFUL = 200;
const CREATED = 201;
const UNSUCCESSFUL = 422;

const error = {
  err: { code: 'invalid_data', message: '' }
};

const getAll = async (_req, res) => {
  try {        
    const products = await ProductModel.getAll();
    res.status(SUCCESSFUL).json({ products });
  } catch (err) {
    res.status(UNSUCCESSFUL).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const product = await ProductModel.getById(req.params.id);

    if(!product) {
      error.err.message = 'Wrong id format';
      return res.status(UNSUCCESSFUL).json(error);
    }

    res.status(SUCCESSFUL).json(product);
  } catch (err) {
    res.status(UNSUCCESSFUL).json({ message: err.message });
  }
};

const add = async (req, res) => {
  const {name, quantity} = req.body;
  try {
    await isValidName(name);
    await isValidQuantity(quantity);

    const newProduct = await ProductModel.add(name, quantity);

    res.status(CREATED).json(newProduct);
  } catch (err) {
    error.err.message = err.message;
    res.status(UNSUCCESSFUL).json(error);
  }
};

// router.put('/:id', async (req, res) => {
//   const {name, quantity} = req.body;
//   try {
//     const product = await ProductModel.update(req.params.id, name, quantity);
//     res.status(SUCCESSFUL).json(product);
//   } catch (err) {
//     res.status(UNSUCCESSFUL).send({ message: 'Sistema temporariamente indisponível' });
//   }
// });

// router.delete('/:id', async(req, res) => {
//   try {
//     const product = await ProductModel.exclude(req.params.id);
//     res.status(SUCCESSFUL).json(product);
//   } catch (err) {
//     res.status(UNSUCCESSFUL).send({ message : 'Sistema temporariamente indisponível' });
//   }
// });

module.exports = { add, getAll, getById };
