const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectID, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Connection = require('../../models/connection');
const ProductModel = require('../../models/productModel');
const dataBaseFake = require('../data');
const { stub } = require('sinon');


describe('Insere um novo produto no BD', () => {
  const newProduct = {
    "name": "Produto do Batista",
    "quantity": 100,
  }

  let DBServer = new MongoMemoryServer();
  before(async () => {
    const URLMock = await DBServer.getUri();
    const connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
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
    it('retorne throw', async() => {
      const { message } = await ProductModel.create({});
      expect('Parâmetro(s) inválido(s)').to.be.eql(message);
    });
  })
});