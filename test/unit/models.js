const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const rewire = require('rewire');

const Connection = require('../../models/connection');
const ProductModel = rewire('../../models/productModel');
const dataBaseFake = require('../data');

const { connectionDb } = Connection;
describe('MODEL', () => {
  describe('Teste a models.connection', async () => {
    const { connectionDb } = Connection;

    const DBServer = new MongoMemoryServer();
    const connDb = { url: '', db: '' };
    let connectionMock;
    before(async () => {
      connDb.url = await DBServer.getUri();
      connDb.db = await DBServer.getDbName();

      connectionMock = await MongoClient.connect(connDb.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      sinon.restore();
      DBServer.stop();
    });

    it('TESTE SE A CONNECTION É UMA "function"', async () => {
      expect('function').to.be.equal(typeof connectionDb);
    });

    it('TESTE SE A URL NÃO FOR UMA STRING', async () => {
      const result = await connectionDb(null, 'StoreManager');
      expect('URL NÃO É UMA STRING!!!').to.be.equal(result);
    });
  });

  describe('Testando "ProductModel.create"', () => {
    const newProduct = {
      name: 'Produto do Batista',
      quantity: 100,
    };

    let DBServer = new MongoMemoryServer();
    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
      DBServer.stop();
    });

    describe('Quando é inserido com sucesso', async () => {
      it('retorna um objeto', async () => {
        const response = await ProductModel.create({ ...newProduct });
        expect(response).to.be.a('object');
      });

      it('retorna o "id" do novo produto inserido', async () => {
        const response = await ProductModel.create({ ...newProduct });
        expect(response).to.have.a.property('_id');
      });
    });

    describe('Quando retorna um erro', async () => {
      it('retorna uma mensagem de erro', async () => {
        const { message } = await ProductModel.create({ name: 'TV', quantity: '' });
        expect('Parâmetro(s) inválido(s)').to.be.equal(message);
      });
      it('retorna uma mensagem de erro', async () => {
        const { message } = await ProductModel.create({ name: '', quantity: 4 });
        expect('Parâmetro(s) inválido(s)').to.be.equal(message);
      });
      it('retorna uma mensagem de erro', async () => {
        const { message } = await ProductModel.create({ name: '' });
        expect('Parâmetro(s) inválido(s)').to.be.equal(message);
      });
      it('retorne throw', async () => {
        const { message } = await ProductModel.create({});
        expect('Parâmetro(s) inválido(s)').to.be.eql(message);
      });
    });
  });

  describe('Teste do method (ProductModel, "getByKey")', async () => {
    const resultExpectById = {
      _id: ObjectId('60b94246571f2b7f873e6de6'),
      name: 'SAMSUNG TV 40`',
      quantity: 47,
    };

    const resultExpectByName = {
      _id: ObjectId('60b942a6571f2b7f873e6deb'),
      name: 'PILHA AAA',
      quantity: 17,
    };

    const DBServer = new MongoMemoryServer();
    before(async () => {
      const connDb = { url: '', db: '' };
      connDb.url = await DBServer.getUri();
      connDb.db = await DBServer.getDbName();

      const connectionMock = await MongoClient.connect(connDb.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await connectionMock.db(connDb.db).createCollection('products');
      await connectionMock.db(connDb.db).collection('products').insertMany(dataBaseFake);
      const connStub = sinon.stub(MongoClient, 'connect').resolves(connectionMock.db(connDb.db));
      // const connStub = connectionMock.db(connDb.db)
      ProductModel.__set__({ connectionDb: connStub });
    });

    after(() => {
      DBServer.stop();
      sinon.restore();
    });

    describe('Sucesso na busca por produtos', async () => {
      it('Buscar um produto por "ID"', async () => {
        const response = await ProductModel.getByKey({ _id: ObjectId('60b94246571f2b7f873e6de6') });
        expect(dataBaseFake[0]).to.deep.equal(response);
      });

      it('Buscar um produto por "nome"', async () => {
        const response = await ProductModel.getByKey({ name: 'PILHA AAA' });
        expect(dataBaseFake[5]).to.deep.equal(response);
      });
    });
    describe('Parâmetros não informados!', async () => {
      it('Deve retornar uma mensagem -> "{ key: value } não informado!"', async () => {
        const response = await ProductModel.getByKey();
        expect(response.message).to.be.equal('{ key: value } não informado!');
      });
    });
  });
});
