const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const StoreModel = require('../../models/storeModel');

describe('Cadastra um novo produto', () => {
  const DBServer = new MongoMemoryServer();
  const payloadProduct = {
    name: 'Produto do Batista',
    quantity: 100,
  };

  before(async () => {
    const URLMock = await DBServer.getUri();
    const connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    sinon.stub(MongoClient, 'connect')
    .resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('procura no banco de dados um produto por nome', async () => {
    it('retorna nulo se não encontrar produto', async () => {
      const response = await StoreModel.findByName(payloadProduct.name);
      expect(response).to.be.null;
    });
  });

  describe('quando é inserido com sucesso', async () => {
    it('retorna um objeto', async () => {
      const response = await StoreModel.create(payloadProduct);
      expect(response).to.be.a('object');
    });

    it('retorna objeto com "_id", "name" e "quantity" do produto inserido', async () => {
      const response = await StoreModel.create(payloadProduct);
      expect(response).to.have.a.property('_id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });
  });

  describe('procura no banco de dados um produto por nome', async () => {
    it('retorna objeto com "_id", "name" e "quantity" do produto encontrado', async () => {
      await StoreModel.create(payloadProduct);
      const response = await StoreModel.findByName(payloadProduct.name);
      expect(response).to.have.a.property('_id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });
  });
})