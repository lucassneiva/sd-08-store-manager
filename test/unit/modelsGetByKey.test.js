const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const rewire = require('rewire');

const Connection = require('../../models/connection');
const ProductModel = rewire('../../models/productModel');
const dataBaseFake = require('../data');

const { connectionDb } = Connection;

describe('MODEL: Teste do method (ProductModel, "getByKey")', async() => {
  const resultExpectById = {
      "_id": ObjectId("60b94246571f2b7f873e6de6"),
      "name": "SAMSUNG TV 40`",
      "quantity": 47
    };
  
  const resultExpectByName = {
      "_id": ObjectId("60b942a6571f2b7f873e6deb"),
      "name": "PILHA AAA",
      "quantity": 17
    };
  
  const DBServer = new MongoMemoryServer();
  const connDb = { url: '', db: '' };
  before(async() => {
    connDb.url = await DBServer.getUri();
    connDb.db = await DBServer.getDbName();

    const connectionMock = await MongoClient.connect(connDb.url,  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await connectionMock.db(connDb.db).createCollection('products')
    await connectionMock.db(connDb.db).collection('products').insertMany(dataBaseFake);
    const connStub = sinon.stub(MongoClient, 'connect').resolves(connectionMock.db(connDb.db));
    ProductModel.__set__({ 'connectionDb': connStub });
  });
  
  after(() => {
    DBServer.stop();
    sinon.restore();
  });

  describe('Sucesso na busca por produtos', async () => {

    it('Buscar um produto por "ID"', async () => {
      const response = await ProductModel.getByKey({"_id": ObjectId("60b94246571f2b7f873e6de6") });
      expect(dataBaseFake[0]).to.deep.equal(response);
    });
    
    it('Buscar um produto por "nome"', async () => {
      const response = await ProductModel.getByKey({ name: 'PILHA AAA' });
      expect(dataBaseFake[5]).to.deep.equal(response);
    });

    it('Deve retornar uma mensagem -> "{ key: value } não informado!"', async () => {
      const response = await ProductModel.getByKey();
      expect(response.message).to.be.equal('{ key: value } não informado!');
    });
  });
});