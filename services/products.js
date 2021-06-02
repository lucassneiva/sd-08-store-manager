const ProductsModel = require('../models/products');

const { ObjectID } = require('mongodb');

const isNameInvalid = (name) => {
  return ProductsModel.read()
    .then((data) => {
      const MIN_LENGTH_NAME = 6;
      const thisNameExists = data.some((product) => product.name === name);
  
      if(name.length < MIN_LENGTH_NAME) {
        throw new Error('\"name\" length must be at least 5 characters long'); 
      }
  
      if(thisNameExists) {
        throw new Error('Product already exists');
      }
    });
};

const isQuantityInvalid = (quantity) => {
  const MIN_QUANTITY = 1;

  if(typeof quantity !== 'number') {
    throw new Error('\"quantity\" must be a number');
  }

  if(quantity < MIN_QUANTITY) {
    throw new Error('\"quantity\" must be larger than or equal to 1');
  }
};

const create =  async ({name, quantity}) => {

  await isNameInvalid(name);
  isQuantityInvalid(quantity);

  const productInserted = await ProductsModel
    .create({name, quantity});

  return productInserted;
};

const read = () => ProductsModel.read();

const readById = async (id) => {

  if(!ObjectID.isValid(id)) {
    console.log('o id não é valido');
    throw new Error('Wrong id format');
  }

  console.log('é valido');

  const product = await ProductsModel.readById(id);
  return product;
};

const update = () => {

};

module.exports = {
  create,
  read,
  readById,
};