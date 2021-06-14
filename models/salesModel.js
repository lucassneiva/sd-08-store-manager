const { ObjectId } = require('mongodb');
const conn = require('./conn');
const {getbyid} = require('./productModel');
const rescue = require('rescue');





const allsale = async() => { 
  
  const sales = await conn().then( db => db.collection('sales').find().toArray());
  // console.log(sales);
  return sales;
      
    
};  


const oneprodu = async(id) => {
  const one = await conn().then(db => db.collection('products').findOne(ObjectId(id)));
  return one;
  
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

  conn().then(
    async (db) => {
      arrvenda.forEach(
        async({productId, quantity}, i) => {
          let produ = await oneprodu(productId);
          console.log('model46', produ);
          await db.collection('products').updateOne(
            {_id: ObjectId(productId)},
            {$set: {quantity: produ.quantity - arrvenda[i].quantity}}
          );
            
        });
             
    },
    
  ); 
};

const newsale =async(arrvenda)=>{
  return(
    conn().then( 
      async(db)=>{
        const inserted = await db.collection('sales').insertOne({ itensSold: arrvenda });
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





module.exports = {
  allsale,
  newsale,
  deletesale,
  getsaleby,
  updatesale,
  decrementpdt,
  //onesalebyid,
};