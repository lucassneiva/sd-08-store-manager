const createDB = require('../models/create');
const validateName = require('./validatesName');
const validateQuantity = require('./validateQuantity');
const readDB = require('../models/read');
const HTTP_OK_STATUS = 201;

const createProduct = async (req, res , next)=>{
  var result = {};
  
  const nameslist = await readDB.listByValue('products', 'name');
  console.log(nameslist);
  console.log(typeof nameslist);
  const {name , quantity} = req.body;
  console.log('Criando o produto');
  if(result === {} ) { res = result ; next();}
  console.log('Validando a quantidade');
  result = validateQuantity(quantity, res);
  console.log('Validando o nome' + result);
  result = validateName(name, res, nameslist);
  console.log(' resultado do result '+result + ' olha  '+ result !== {});
  if(result === {} ) { res = result ; next();}
  console.log('colocando o produto ');
  result =  await createDB('products', {name, quantity});
  console.log('produto criado');
  res.status(HTTP_OK_STATUS).json(result[0]);
  next();
};

module.exports = createProduct;