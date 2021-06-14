// const { ObjectId } = require('bson');
// const rescue = require('rescue');



const { image } = require('faker');
const { ObjectId } = require('mongodb');
const { getbyid } = require('../models/productModel');
const { 

  allsale,
  getsaleby,
  updatesale,
  deletesale,

} = require('../models/salesModel');

 
const x = 10;
const f = 5;
const z = 0;
const objerr = {
  err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }};
  
const salenotf = {
  err: { code: 'not_found', message: 'Sale not found' }};

const upderr = {
  err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }};; 


const validasale = (arrvenda) => { 
     
  if (arrvenda.some(({quantity}) => { 
    return quantity <= z || typeof quantity === 'string';}))
  {
    return objerr;
  } else return 'ok';
  
};


const asales = async() => {
  const result = await allsale();
  return ({result});
};

const getsalebyid = async(id)=>{
  if(ObjectId.isValid(id) ||  id.length > x) {
    const ret = await getsaleby(id);
    return ret;
  } else throw salenotf;
};

const updates = async(id, body) => { 
  if( body[0].quantity <= z || typeof body[0].quantity === 'string'||
   !ObjectId.isValid(id) ){
    return (upderr);
  }else{ return await updatesale (id, body);}
};

const deleteonesale = (id)=>{
  if (ObjectId.isValid(id)){
    const removed = deletesale(id);
    return removed;
  }else return 'err';

};


module.exports = {
  validasale,
  asales,
  getsalebyid,
  updates,
  deleteonesale,
};