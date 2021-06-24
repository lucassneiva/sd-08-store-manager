const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const productController = require('../../controllers/products');
const productModel = require('../../models/productModels');
const salesController = require('../../controllers/sales');
const salesModel = require('../../models/salesModels');


describe('Teste Controller Products', () => {

  const productPayload = {
    name: 'kombi',
    quantity: 10
  };

  const res = {};
  const req = {};
  describe('Testa a criação de um produto', async () => {
    before( async () => {

      const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    const connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);


      req.body = productPayload;
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns({ _id: '1', ...productPayload });
      sinon.stub(productModel, 'createProduct').resolves({ _id: '1', ...productPayload });
    });

    after(() => {
      productModel.createProduct.restore();
      MongoClient.connect.restore();
    });

    it('Retorno o status esperado', async () => {
      await productController.create(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });

  describe('Testa a busca de um produto pelo Id', async () => {
    before(() => {
      req.params = {_id: '1'};
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns({ _id: '1', ...productPayload });
      sinon.stub(productModel, 'createProduct').resolves({ _id: '1', ...productPayload });
    });

    after(() => {
      productModel.createProduct.restore();
    });

    it('Retorno o status esperado', async () => {
      await productController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Testa a busca por todos os produtos', async () => {
    before(() => {
      req.params = {_id: '1'};
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns({ _id: '1', ...productPayload });
      sinon.stub(productModel, 'getByID').resolves({ _id: '1', ...productPayload });
    });

    after(() => {
      productModel.getByID.restore();
    });

    it('Retorno o status esperado', async () => {
      await productController.findById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Testa o update produtos', async () => {
    before(() => {
      req.params = {_id: '1'};
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns({ _id: '1', ...productPayload });
      sinon.stub(productModel, 'getByID').resolves({ _id: '1', ...productPayload });
    });

    after(() => {
      productModel.getByID.restore();
    });

    it('Retorno o status esperado', async () => {
      await productController.updateProductController(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Testa se é possivel deletar produtos', async () => {
    before(() => {
      req.params = {_id: '1'};
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns({ _id: '1', ...productPayload });
      sinon.stub(productModel, 'getByID').resolves({ _id: '1', ...productPayload });
    });

    after(() => {
      productModel.getByID.restore();
    });

    it('Retorno o status esperado', async () => {
      await productController.deleteProductController(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

});

describe('Teste Controller Sales', () => {

  const salePayload = [
    { productId: 'id1', quantity: 10 },
    { productId: 'id2', quantity: 20 }
  ];

  const res = {};
  const req = {};

  describe('Testa venda', async () => {
    before( async () => {

      const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    const connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);


      // req.body = salePayload;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', itensSold: salePayload });
      sinon.stub(salesModel, 'getAllSales').resolves({ _id: '1', itensSold: salePayload });
    });

    after(() => {
      salesModel.getAllSales.restore();
      MongoClient.connect.restore();
    });

    it('Retorno o status esperado', async () => {
      await salesController.getAllSalesController(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Testa busca por Id', async () => {
    before( async () => {

      const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    const connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);


      req.params = { id: '5f43cbf4c45ff5104986e81d' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', itensSold: salePayload });
      sinon.stub(salesModel, 'getAllSales').resolves({ _id: '1', itensSold: salePayload });
      sinon.stub(salesModel, 'getSaleByID').resolves({});
    });

    after(() => {
      salesModel.getAllSales.restore();
      salesModel.getSaleByID.restore();
      MongoClient.connect.restore();
    });

    it('Retorno o status esperado', async () => {
      await salesController.getSaleByIdController(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
    });
  });

  describe('Testa busca por Id invalido', async () => {
    before( async () => {

      const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    const connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);


      req.params = { id: '5f43cbf4c45ff5104986ed' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', itensSold: salePayload });
      sinon.stub(salesModel, 'getAllSales').resolves({ _id: '1', itensSold: salePayload });
      sinon.stub(salesModel, 'getSaleByID').resolves({});
    });

    after(() => {
      salesModel.getAllSales.restore();
      salesModel.getSaleByID.restore();
      MongoClient.connect.restore();
    });

    it('Retorno o status esperado', async () => {
      await salesController.getSaleByIdController(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
    });
  });

  describe('Testa o delete', async () => {
    before( async () => {

      const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    const connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);


      req.params = { id: '5f43cbf4c45ff5104986e815' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', itensSold: salePayload });
      // sinon.stub(salesModel, 'getAllSales').resolves({ _id: '1', itensSold: salePayload });
      sinon.stub(salesModel, 'getSaleByID').resolves({sale:"ops"});
    });

    after(() => {
      // salesModel.getAllSales.restore();
      salesModel.getSaleByID.restore();
      MongoClient.connect.restore();
    });

    it('Retorno o status esperado', async () => {
      await salesController.deleteSaleController(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
    });
  });

  describe('Testa o delete com Id invalido', async () => {
    before( async () => {

      const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    const connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);


      req.params = { id: '5f43cbf4c45ff5104986e1' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', itensSold: salePayload });
      // sinon.stub(salesModel, 'getAllSales').resolves({ _id: '1', itensSold: salePayload });
      sinon.stub(salesModel, 'getSaleByID').resolves({sale:"ops"});
    });

    after(() => {
      // salesModel.getAllSales.restore();
      salesModel.getSaleByID.restore();
      MongoClient.connect.restore();
    });

    it('Retorno o status esperado', async () => {
      await salesController.deleteSaleController(req, res);

      expect(res.status.calledWith(422)).to.be.equal(true);
    });
  });

  describe('Testa de update', async () => {
    before( async () => {

      const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    const connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      req.body = salePayload;
      req.params = { id: '5f43cbf4c45ff5104986e81d' }
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns({ _id: '1', itensSold: salePayload });
      // sinon.stub(salesModel, 'getAllSales').resolves({ _id: '1', itensSold: salePayload });
      sinon.stub(salesModel, 'getSaleByID').resolves({sale:"ops"});
    });

    after(() => {
      // salesModel.getAllSales.restore();
      salesModel.getSaleByID.restore();
      MongoClient.connect.restore();
    });

    it('Retorno o status esperado', async () => {
      await salesController.updateSaleController(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

});
