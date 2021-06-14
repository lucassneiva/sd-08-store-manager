const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { ObjectId } = require('mongodb');


const StoreModel = require('../../models/storeModel');
const SalesModel = require('../../models/salesModel');

const ID_VALID_1 = '5f43a7ca92d58904914656b6';
const NAME_VALID_1 = 'Produto do Batista';
const QUANTITY_VALID_1 = 100;

const ID_VALID_2 = '60c13544b7b98a438cb1e2cd';
const NAME_VALID_2 = 'Produto do Silva';
const QUANTITY_VALID_2 = 10;

const ID_VALID_3 = '60c6bbd36597202f5d3565ee';
const NAME_VALID_3 = 'Produto da Joana';
const QUANTITY_VALID_3 = 50;

const ID_VALID_4 = '60c6bbd36597202f5d3565ff';
const NAME_VALID_4 = 'Produto da Olivia';
const QUANTITY_VALID_4 = 5;

const UPDATE_NAME = 'Produto do Batista Atualizado';
const UPDATE_QUANTITY = 1000;

const payloadProducts = [
  { name: NAME_VALID_1, quantity: QUANTITY_VALID_1 },
  { name: NAME_VALID_2, quantity: QUANTITY_VALID_2 },
];

const payloadSales_1 = [
  { productId: ID_VALID_1, quantity: QUANTITY_VALID_1 },
  { productId: ID_VALID_2, quantity: QUANTITY_VALID_2 },
];

const payloadSales_2 = [
  { productId: ID_VALID_3, quantity: QUANTITY_VALID_3 },
  { productId: ID_VALID_4, quantity: QUANTITY_VALID_4 },
];

describe('Na camada MODELS', () => {
  let connectionMock;
  let db;
  const DBServer = new MongoMemoryServer();

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
    await db.collection('sales').deleteMany({});
  });
  
  describe('ao chamar o CREATE para cadastrar um novo produto', () => {
    describe('quando é inserido com sucesso', () => {
      it('retorna um objeto', async () => {
        const response = await StoreModel.create(NAME_VALID_1, QUANTITY_VALID_1);
        expect(response).to.be.a('object');
      });
  
      it('retorna objeto com "_id", "name" e "quantity" do produto inserido', async () => {
        const response = await StoreModel.create(NAME_VALID_1, QUANTITY_VALID_1);
        expect(response).to.include.all.keys('_id', 'name', 'quantity')
      });
    });
  
    describe('ao procurar um produto por nome', () => {
      it('retorna nulo se não encontrar produto', async () => {
        const response = await StoreModel.findByName(NAME_VALID_1);
        expect(response).to.be.null;
      });

      it('retorna objeto com "_id", "name" e "quantity" do produto encontrado', async () => {      
        await StoreModel.create(NAME_VALID_1, QUANTITY_VALID_1);
        const response = await StoreModel.findByName(NAME_VALID_1);
        expect(response).to.include.all.keys('_id', 'name', 'quantity')
      });
    });
  });

  describe('ao chamar o GETALL para retornar todos os produtos', () => {
    describe('quando não existe nenhum produto criado', () => { 
      it('retorna um array', async () => {
        const response = await StoreModel.getAll();
        expect(response).to.be.an('array');
      });
  
      it('o array é vazio', async () => {
        const response = await StoreModel.getAll();
        expect(response).to.be.empty;
      });
    });
  
    describe('quando existem produtos criados', () => {
      beforeEach(async () => {
        db = connectionMock.db('StoreManager');
        await db.collection('products').insertMany(payloadProducts);
      });

      it('retorna um array', async () => {
        const response = await StoreModel.getAll();
        expect(response).to.be.an('array');
      });

      it('o array não está vazio', async () => {
        const response = await StoreModel.getAll();
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

  describe('ao chamar o FINDBYID para buscar um filme através do ID', () => {
    describe('quando não é encontrado uma correspondência', () => {
      it('retorna "null"', async () => {
        const response = await StoreModel.findById(ID_VALID_1);
        expect(response).to.be.equal(null)
      });
    });
  
    describe('quando existe uma correspondência', () => {
      let INSERTED_ID = '';
      beforeEach(async () => {
        db = connectionMock.db('StoreManager');
        const id = await db.collection('products').insertMany(payloadProducts);
        INSERTED_ID = id.insertedIds[0];
      });
        
      it('retorna um objeto', async () => {
        const response = await StoreModel.findById(INSERTED_ID);
        expect(response).to.be.a('object')
      });
  
      it('o objeto possui as propriedades: "_id", "name" e "quantity"', async () => {
        const response = await StoreModel.findById(INSERTED_ID);
        expect(response).to.include.all.keys('_id', 'name', 'quantity')
      });
    });
  });

  describe('ao chamar o UPDATEBYID para atualizar um filme através do ID', () => {
    describe('quando não é encontrado uma correspondência', () => {
      it('retorna um objeto', async () => {
        const response = await StoreModel.updateById(ID_VALID_1, UPDATE_NAME, UPDATE_QUANTITY);
        expect(response).to.be.a('object')
      });

      it('o objeto possui a propriedade: "modifiedCount", com valor igual a "0" ', async () => {
        const response = await StoreModel.updateById(ID_VALID_1, UPDATE_NAME, UPDATE_QUANTITY);
        expect(response.modifiedCount).to.be.equal(0)
      });
    });
  
    describe('quando existe uma correspondência', () => {
      let INSERTED_ID = '';
      beforeEach(async () => {
        db = connectionMock.db('StoreManager');
        const id = await db.collection('products').insertMany(payloadProducts);
        INSERTED_ID = id.insertedIds[0];
      });
        
      it('retorna um objeto', async () => {
        const response = await StoreModel.updateById(INSERTED_ID, UPDATE_NAME, UPDATE_QUANTITY);
        expect(response).to.be.a('object')
      });
  
      it('o objeto possui a propriedade: "modifiedCount", com valor igual a "1" ', async () => {
        const response = await StoreModel.updateById(INSERTED_ID, UPDATE_NAME, UPDATE_QUANTITY);
        expect(response.modifiedCount).to.be.equal(1)
      });
    });
  });

  describe('ao chamar o DELETEBYID para deletar um filme através do ID', () => {
    describe('quando não é encontrado uma correspondência', () => {
      it('retorna "null"', async () => {
        const response = await StoreModel.deleteById(ID_VALID_1);
        expect(response).to.be.equal(null)
      });
    });
  
    describe('quando existe uma correspondência', () => {
      let INSERTED_ID = '';
      beforeEach(async () => {
        db = connectionMock.db('StoreManager');
        const id = await db.collection('products').insertMany(payloadProducts);
        INSERTED_ID = id.insertedIds[0];
      });
        
      it('retorna um objeto', async () => {
        const response = await StoreModel.deleteById(INSERTED_ID);
        expect(response).to.be.a('object')
      });
  
      it('o objeto possui as propriedades: "_id", "name" e "quantity"', async () => {
        const response = await StoreModel.deleteById(INSERTED_ID);
        expect(response).to.include.all.keys('_id', 'name', 'quantity')
      });
    });
  });

  describe('ao chamar o CREATE para registrar vendas', () => {
    describe('quando é inserido com sucesso', () => { 
      it('retorna objeto com "_id" e "itensSold" da venda inserida', async () => {
        const response = await SalesModel.create(payloadSales_1);
        expect(response).to.include.all.keys('_id', 'itensSold')
      });

      it('na propriedade "itensSold" com um array de objetos', async () => {
        const { itensSold } = await SalesModel.create(payloadSales_1);
        expect(itensSold).to.be.an('array');
        expect(itensSold[0]).to.be.a('object');
      });
    });

    describe('quando verifica se os ids da compra já estão cadastrados, porém não são encontrados', () => { 
      beforeEach(async () => {
        db = connectionMock.db('StoreManager');
        const id = await db.collection('products').insertMany(payloadProducts);
      });

      it('retorna um array vazio', async () => {
        const response = await SalesModel.findById(payloadSales_1);
        expect(response).to.be.an('array');
        expect(response).to.be.empty;
      });
    });

    describe('quando verifica se os ids da compra já estão cadastrados, e são encontrados', () => { 
      let INSERTED_IDS = [];
      let payload = [];
      beforeEach(async () => {
        db = connectionMock.db('StoreManager');
        const ids = await db.collection('products').insertMany(payloadProducts);
        INSERTED_IDS = ids.insertedIds;
        payload = [
          { productId: INSERTED_IDS[0], quantity: QUANTITY_VALID_1 },
          { productId: INSERTED_IDS[1], quantity: QUANTITY_VALID_2 },
        ];
      });

      it('retorna array de objetos', async () => {
        const response = await SalesModel.findById(payload);
        expect(response).to.be.an('array');
        expect(response[0]).to.be.an('object');
      });

      it('o objeto tem as propriedades "_id", "name" e "quantity"', async () => {
        const response = await SalesModel.findById(payload);
        expect(response[0]).to.include.all.keys('_id', 'name', 'quantity')
      });
    });
  });

  describe('ao chamar o GETALL para procurar todas as vendas', () => {
    describe('quando não existe nenhum produto criado', () => { 
      it('retorna um array', async () => {
        const response = await SalesModel.getAll();
        expect(response).to.be.an('array');
      });
  
      it('o array é vazio', async () => {
        const response = await SalesModel.getAll();
        expect(response).to.be.empty;
      });
    });
  
    describe('quando existem produtos criados', () => {
      beforeEach(async () => {
        db = connectionMock.db('StoreManager');
        await db.collection('sales').insertOne({ 'itensSold': payloadSales_1 });
        await db.collection('sales').insertOne({ 'itensSold': payloadSales_2 });
      });

      it('retorna um array não vazio', async () => {
        const response = await SalesModel.getAll();
        console.log(response);
        expect(response).to.be.an('array');
        expect(response).to.be.not.empty;
      });
  
      it('o array possuem itens do tipo objeto', async () => {
        const [ item ] = await SalesModel.getAll();
        expect(item).to.be.an('object');
      });
  
      it('tais itens possuem as propriedades "_id" e "itensSold"', async () => {
        const [ item ] = await SalesModel.getAll();
        expect(item).to.include.all.keys('_id', 'itensSold');
      });
    });
  });
});
