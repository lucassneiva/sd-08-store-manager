const { MongoClient } = require('mongodb');

// A conexão do banco local deverá conter os seguintes parâmetros:

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';
const connection = () => 
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser:true, // toda conexão é identificada ao usar a mesma url 
    useUnifiedTopology: true, // toda aconexão tem a mesma topologia/caminho
  }).then((conn) => conn.db(DB_NAME)
  ).catch(
    err => {
      console.error(err);
      process.exit(1);
    }
  );
connection();
// Para o avaliador funcionar altere a conexão do banco para:

// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// const DB_NAME = 'StoreManager';

module.exports = connection;