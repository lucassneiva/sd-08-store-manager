const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const ProductsModels = require('../../models/Products');
const SalesModels = require('../../models/Sales');

const payloadProduct = { name: 'Bola de futebol', quantity: 20 };
const anotherProduct = { name: 'Bola de beisebol', quantity: 10 };

describe('Testa o model do Produto', () => {
  let DBServer;
  let connectionMock;

  before(async () => {
    DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  it('add - Deve adicionar um produto e retorna um objeto com chaves "_id", "name" e "quantity"', async () => {
    const response = await ProductsModels.add(payloadProduct);

    expect(response).to.be.a('object');
    expect(response).to.have.property('_id');
    expect(response).to.have.property('name');
    expect(response).to.have.property('quantity');
  });

  it('findProduct - Deve procurar um produto pelo nome e retornar um objeto com chaves "_id", "name" e "quantity"', async () => {
    const response = await ProductsModels.findProduct(payloadProduct);

    expect(response).to.be.a('object');
    expect(response).to.have.property('_id');
    expect(response).to.have.property('name');
    expect(response).to.have.property('quantity');

    const responseNull = await ProductsModels.findProduct(anotherProduct);
    expect(responseNull).to.be.null;
  });

  it('getAll - Deve listar todos os produtos', async () => {
    await ProductsModels.add(anotherProduct);
    const response = await ProductsModels.getAll();

    expect(response).to.be.a('array');
    expect(response).to.have.length(2);
    response.forEach((product) => {
      expect(product).to.have.property('_id');
      expect(product).to.have.property('name');
      expect(product).to.have.property('quantity');
    });
  });

  it('getById - Deve buscar um produto pelo ID', async () => {
    const products = await ProductsModels.getAll();
    const id = products[0]._id;

    const response = await ProductsModels.getById(id);

    expect(response).to.be.a('object');
    expect(response).to.have.property('_id');
    expect(response).to.have.property('name');
    expect(response).to.have.property('quantity');
  });

  it('updateById - Deve atualizar um produto pelo ID', async () => {
    const product = await ProductsModels.getAll().then((item) => item[0]);
    const id = product._id;
    const oldQnt = product.quantity;
    await ProductsModels.updateById(id, { quantity: 30 });

    const newQnt = await ProductsModels.getAll().then((item) => item[0].quantity);
    expect(newQnt).not.to.be.equal(oldQnt);
    expect(newQnt).not.to.be.equal(undefined);
  });

  it('deleteById - Deve apagar um produto pelo ID', async () => {
    const product = await ProductsModels.getAll().then((item) => item[0]);
    const id = product._id;
    await ProductsModels.deleteById(id);
    const getProductById = await ProductsModels.getById(id);
    expect(getProductById).to.be.null;
  });
});

describe('Testa o model de Vendas', () => {
  let DBServer;
  let connectionMock;

  before(async () => {
    DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  it('add - Deve adicionar uma venda e retorna um objeto com chaves "_id" e "itensSold"', async () => {
    const productToSell = await ProductsModels.getAll().then((item) => item[0]);
    const { _id, quantity } = productToSell;
    const soldItens = [{ productId: _id, quantity }];

    const response = await SalesModels.add(soldItens);

    expect(response).to.be.a('object');
    expect(response).to.have.property('_id');
    expect(response).to.have.property('itensSold');
  });

  it('getAll - Deve listar todos as vendas', async () => {
    const response = await SalesModels.getAll();

    expect(response).to.be.a('array');
    expect(response).to.have.length(1);
    response.forEach((product) => {
      expect(product).to.have.property('_id');
      expect(product).to.have.property('itensSold');
    });
  });

  it('getById - Deve buscar uma venda pelo ID', async () => {
    const sales = await SalesModels.getAll();
    const id = sales[0]._id;

    const response = await SalesModels.getById(id);

    expect(response).to.be.a('object');
    expect(response).to.have.property('_id');
    expect(response).to.have.property('itensSold');
  });

  it('updateById - Deve atualizar uma venda pelo ID', async () => {
    const sales = await SalesModels.getAll().then((item) => item[0]);
    const id = sales._id;
    const { productId, quantity: oldQnt } = sales.itensSold[0];
    const updatedSoldItens = [{ productId, quantity: 30 }];
    await SalesModels.updateById(id, updatedSoldItens);

    const newQnt = await SalesModels.getAll().then((item) => item[0].itensSold[0].quantity);
    expect(newQnt).not.to.be.equal(oldQnt);
    expect(newQnt).not.to.be.equal(undefined);
  });

  it('deleteById - Deve apagar um produto pelo ID', async () => {
    const sales = await SalesModels.getAll().then((item) => item[0]);
    const id = sales._id;
    await SalesModels.deleteById(id);
    const getSalesById = await SalesModels.getById(id);
    expect(getSalesById).to.be.null;
  });
});
