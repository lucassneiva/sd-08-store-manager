const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectID, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const rewire = require('rewire')

const productService = rewire('../../services/productService');
const ProductModel = rewire('../../models/productModel.js');
const schema = require('../../schema/internalErrors');
const dataBaseFake = require('../data');

// const Connection = require('../../models/connection');

describe('Teste do "service.productCreate"', () => {
  describe('Validando cadastro do novo produto', async () => {

  const DBServer = new MongoMemoryServer();
  const connDb = { url: '', db: '' };
  let connectionMock;
  before(async() => {
    connDb.url = await DBServer.getUri();
    connDb.db = await DBServer.getDbName();

    connectionMock = await MongoClient.connect(connDb.url,  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await connectionMock.db(connDb.db).createCollection('products')
    await connectionMock.db(connDb.db).collection('products').insertMany(dataBaseFake);
    connectionMock = sinon.stub(MongoClient, 'connect').resolves(connectionMock.db(connDb.db));
    ProductModel.__set__({ 'connectionDb': connectionMock });
  });
  
  after(() => {
    DBServer.stop();
    sinon.restore();
  });

  it('Inserindo novo produto', async () => {
      const res = await ProductModel.create({ name: 'TV LCD LED SONY 73`', quantity: 10 });
      const res2 = await ProductModel.create({ name: 'TV LCD LED SONY 73`', quantity: 10 });
  }); 

  });
  
});