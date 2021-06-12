// const { ObjectId } = require('bson');
// const rescue = require('rescue');



const { 

  newsale,

} = require('../models/salesModel');

 

const f = 5;
const z = 0;
const objerr = {
  err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }};

const validasale = (arrvenda) => { 
     
  if (arrvenda.some(({quantity}) => { 
    return quantity <= z || typeof quantity === 'string';}))
  {
    return objerr;
  } else return 'ok';
  
};


module.exports = {
  validasale,
};
