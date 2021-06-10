const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const StoreModel = require('../../models/storeModel');

describe('Na camada MODELS', async () => {
  let connectionMock;
  let db;

  const DBServer = new MongoMemoryServer();
  const payloadProduct = {
    name: 'Produto do Batista',
    quantity: 100,
  };

  before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  afterEach(async () => {
    db = connectionMock.db('StoreManager');
    await db.collection('products').deleteMany({});
  });
  
  describe('ao cadastrar um novo produto', async () => {
    describe('quando é inserido com sucesso', async () => {
      it('retorna um objeto', async () => {
        const response = await StoreModel.create(payloadProduct);
        expect(response).to.be.a('object');
      });
  
      it('retorna objeto com "_id", "name" e "quantity" do produto inserido', async () => {
        const response = await StoreModel.create(payloadProduct);
        expect(response).to.include.all.keys('_id', 'name', 'quantity')
      });
    });
  
    describe('ao procurar um produto por nome', async () => {
      it('retorna nulo se não encontrar produto', async () => {
        const response = await StoreModel.findByName(payloadProduct.name);
        expect(response).to.be.null;
      });

      it('retorna objeto com "_id", "name" e "quantity" do produto encontrado', async () => {      
        await StoreModel.create(payloadProduct);
        const response = await StoreModel.findByName(payloadProduct.name);
        expect(response).to.include.all.keys('_id', 'name', 'quantity')
      });
    });
  });

  describe('ao procurar todos os produtos', async () => {
    describe('quando não existe nenhum produto criado', async () => { 
      it('retorna um array', async () => {
        const response = await StoreModel.getAll();
        expect(response).to.be.an('array');
      });
  
      it('o array é vazio', async () => {
        const response = await StoreModel.getAll();
        expect(response).to.be.empty;
      });
    });
  
    describe('quando existem produtos criados', async () => {
      beforeEach(async () => {
        db = connectionMock.db('StoreManager');
        await db.collection('products').insertMany([
          { "name": "Produto do Batista", "quantity": 10 },
          { "name": "Produto Silva", "quantity": 10 },
        ]);
      });

      it('retorna um array', async () => {
        const response = await StoreModel.getAll();
        expect(response).to.be.an('array');
      });

      it('o array não está vazio', async () => {
        const response = await StoreModel.getAll();
        expect(response).to.be.an('array');
        expect(response).to.be.not.empty;
      });
  
      it('o array possuem itens do tipo objeto', async () => {
        const [ item ] = await StoreModel.getAll();
        expect(item).to.be.an('object');
      });
  
      it('tais itens possuem as propriedades: "_id", "name" e "quantity"', async () => {
        const [ item ] = await StoreModel.getAll();
        expect(item).to.include.all.keys('_id', 'name', 'quantity')
      });
    });
  });





  describe('ao buscar um filme através do ID', () => {
    describe('quando não é encontrado uma correspondência', () => {
      const ID_EXAMPLE = '5f43a7ca92d58904914656b6'
      it('retorna "null"', async () => {
        const response = await StoreModel.findById(ID_EXAMPLE);
        expect(response).to.be.equal(null)
      });
    });
  
    describe('quando existe um filme para o ID informado', async() => {
      let ID_EXAMPLE = '';
      beforeEach(async () => {
        db = connectionMock.db('StoreManager');
        const id = await db.collection('products').insertMany([
          { "name": "Produto do Batista", "quantity": 10 },
          { "name": "Produto Silva", "quantity": 10 },
        ]);
        ID_EXAMPLE = id.insertedIds[0];
      });
        
      it('retorna um objeto', async () => {
        const response = await StoreModel.findById(ID_EXAMPLE);
        expect(response).to.be.a('object')
      });
  
      it('o objeto possui as propriedades: "_id", "name" e "quantity"', async () => {
        const response = await StoreModel.findById(ID_EXAMPLE);
        expect(response).to.include.all.keys('_id', 'name', 'quantity')
      });
    });
  });
});
