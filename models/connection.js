const  { MongoClient } = require('mongodb');

const  DATA_BASE ='StoreManager';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// avaliador

// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

const connection =  async () =>{
  try{
    const connect = await MongoClient.connect(MONGO_DB_URL, OPTIONS);
    const db = connect.db(DATA_BASE);
    return db;
  }catch(err){
    console.error(`${DATA_BASE} database connection error`);
    return  {
      statusCode: 500,
      err: 'Internal Server Error',
      message: 'An internal server error occurred'
    }; // process exit 
  }
};

module.exports = connection;
