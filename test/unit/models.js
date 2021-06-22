const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Products = require('../../models/productsModels');
const Sales = require('../../models/salesModels');

const payloadProduct = {
  name: 'Ukulele',
  quantity: 10
};
const payloadProduct2 = {
  name: 'Cavaquinho',
  quantity: 15
};

describe('Testes para os models de produto', () => {

  before(async () => {
    const DBServer = new MongoMemoryServer();
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
  });

  it('addProduct - Verificar se adiciona um produto e retorna um objeto com as chaves "_id", "name" e "quantity"', async () => {
    const response = await Products.addProduct(payloadProduct);

    expect(response).to.be.an('object');
    expect(response).to.have.property('_id');
    expect(response).to.have.property('name');
    expect(response).to.have.property('quantity');
  });

  it('getAllProducts - Verificar se retorna todos produtos em um array de objetos com as chaves "_id", "name" e "quantity"', async () => {
    await Products.addProduct(payloadProduct2);
    const response = await Products.getAllProducts();

    expect(response).to.be.an('array');
    expect(response).to.have.length(2);
    response.forEach((item) => {
      expect(item).to.have.property('_id');
      expect(item).to.have.property('name');
      expect(item).to.have.property('quantity');
    });
  });

  it('getProductById - Verificar se retorna um produto pelo seu ID, sendo um objeto com as chaves "_id", "name" e "quantity"', async () => {
    const productId = await Products.getAllProducts()
      .then((product) => product[0]._id);
    const response = await Products.getProductById(productId);

    expect(response).to.be.an('object');
    expect(response).to.have.property('_id');
    expect(response).to.have.property('name');
    expect(response).to.have.property('quantity');
  });

  it('updateProduct - Verificar se atualiza um produto pelo seu ID', async () => {
    const productsList = await Products.getAllProducts()
      .then((item) => item[0]);
    const {
      _id: id,
      name,
      quantity: oldQuantity,
    } = productsList;
    await Products.updateProduct(id, name, { quantity: 12 });

    const newQuantity = await Products.getAllProducts()
      .then((item) => item[0].quantity);

    expect(newQuantity).not.to.be.equal(oldQuantity);
    expect(newQuantity).not.to.be.equal(undefined);
  });

  it('deleteProduct - Verificar se deleta um produto pelo sei ID', async () => {
    const productId = await Products.getAllProducts()
      .then((product) => product[0]._id);
    await Products.deleteProduct(productId);
    const deletedProduct = await Products.getProductById(productId);

    expect(deletedProduct).to.be.null;
  });
});

describe('Testes para os models de sales', () => {

  before(async () => {
    const DBServer = new MongoMemoryServer();
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
  });

  it('addSale - Verificar se adiciona uma venda e retorna um objeto com as chaves "_id" e "itensSold"', async () => {
    const productId = await Products.addProduct(payloadProduct)
      .then((product) => product._id);
    const response = await Sales.addSale({ productId, quantity: 2 });

    expect(response).to.be.an('object');
    expect(response).to.have.property('_id');
    expect(response).to.have.property('itensSold');
  });

  it('getAllSales - Verificar se retorna todas as vendas adicionadas', async () => {
    const response = await Sales.getAllSales();

    expect(response).to.be.an('array');
    expect(response).to.have.length(1);
    response.forEach((sale) => {
      expect(sale).to.have.property('_id');
      expect(sale).to.have.property('itensSold');
    });
  });

  it('getSaleById - Verificar se retorna uma venda pelo seu ID', async () => {
    const saleId = await Sales.getAllSales()
      .then((sale) => sale[0]._id);
    const response = await Sales.getSaleById(saleId);

    expect(response).to.be.an('object');
    expect(response).to.have.property('_id');
    expect(response).to.have.property('itensSold');
  });

  /* it('updateSale - Verificar se atualiza uma venda pelo seu ID', async () => {
    const salesList = await Sales.getAllSales();
    const saleId = salesList._id;
    const {
      productId,
      quantity: oldQuantity,
    } = salesList.itensSold;
    await Sales.updateSale(saleId, productId, { quantity: 5 });
    const updatedQuantity = await Sales.getSaleById(saleId)
      .then((sale) => sale.itensSold[0].quantity);

    expect(updatedQuantity).not.to.be.equal(oldQuantity);
    expect(updatedQuantity).not.to.be.equal(undefined);
  }); */

  it('deleteSale - Verificar se deleta uma venda pelo seu ID', async () => {
    const saleId = await Sales.getAllSales()
      .then((sale) => sale[0]._id);
    await Sales.deleteSale(saleId);
    const deletedSale = await Sales.getSaleById(saleId);

    expect(deletedSale).to.be.null;
  });
});
