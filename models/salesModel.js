const { ObjectId } = require('mongodb');
const conn = require('./conn');
const {getbyid} = require('./productModel');
const rescue = require('rescue');





const allsale = async() => { 
  
  const sales = await conn().then( db => db.collection('sales').find().toArray());
  console.log('model13', sales);
  return sales;
      
    
};  


const oneprodu = async(_id) => {
  return await conn().then(
    async(db) => { return await  db.collection('products').findOne(ObjectId(_id));}
  );
     
};

const getsaleby = async(id) => {
  const onSale = await conn().then(db => db.collection('sales').findOne(ObjectId(id)));
  return onSale;
  
};

/* const onesalebyid = async (id) => {
  return await conn().then(
    db => db.collection('sales').findOne(ObjectId(id))
  );
  
}; */
 


const decrementpdt = async(arrvenda) => {
  console.log('smodel42', arrvenda);
  const{ _id, quantity } = arrvenda[0];
  const produ = await oneprodu(_id);
  console.log('smodel49', produ);
  const subtraction = produ.quantity - quantity;
  conn().then(
    async (db) => {
      db.collection('products').updateOne(
        {_id: ObjectId(_id)}, {$set: {quantity: subtraction}}
      );
    }
  ); 
};

const newsale =async(arrvenda)=>{
  const arr = arrvenda.map(({_id, quantity})=>{
    return {'productId':_id,'quantity': quantity};  });
  
  return(
    conn().then( 
      async(db)=>{
        const inserted = await db.collection('sales').insertOne(
          {itensSold: arr}
        );
        // console.log('result em model:', inserted.ops[0]);
        return(inserted.ops[0]);
      }
    ).then((ins) =>{ return ins; })
  );
  
};


const updatesale = async(id, body) => 
  conn().then( async (db) => { 
    const result = await db.collection('sales').updateOne(
      {_id: ObjectId(id)}, {$set:{itensSold: body }});
    return await (getsaleby(id));
  });
;


const deletesale = async(id) => {
  
  return conn().then(
    async (db) => await db.collection('sales').deleteOne({_id:ObjectId(id)})
  );
      
}; 

const incrementpdt = async(arrvenda) => {
  console.log('smodel42', arrvenda);
  const{ _id, quantity } = arrvenda[0];
  const produ = await oneprodu(_id);
  console.log('smodel49', produ);
  const sumaction = produ.quantity + quantity;
  conn().then(
    async (db) => {
      db.collection('products').updateOne(
        {_id: ObjectId(_id)}, {$set: {quantity: sumaction}}
      );
    }
  ); 
};



module.exports = {
  allsale,
  newsale,
  deletesale,
  getsaleby,
  updatesale,
  decrementpdt,
  incrementpdt,
  oneprodu,
};