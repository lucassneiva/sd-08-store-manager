const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const ProductsModel = require('../../models/productsModel');
const SalesModel = require('../../models/salesModel');

describe('Products Models', () => {
  const payloadProducts = { name: "example_product", quantity: 100 };

  const mockedProducts = [
    { name: "example_product1", quantity: 100 },
    { name: "example_product2", quantity: 200 }
  ]
  let mockedId;

  let productID;

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    const conncetionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    sinon.stub(MongoClient, 'connect').resolves(conncetionMock);

    const respOne = await ProductsModel.createProduct(mockedProducts[0]);
    mockedId = respOne._id;
    await ProductsModel.createProduct(mockedProducts[1]);

  });
  after(async () => {
    MongoClient.connect.restore();
  });

  describe('create a new product with success', async () => {
    it('Returns an object and has an _id generated by MongoDB', async () => {
      const response = await ProductsModel.createProduct(payloadProducts);

      expect(response).to.be.a('object');
      productID = response._id;
      expect(response).to.have.a.property('_id');
    });
  });

  describe('get all products with success', async () => {

    it('Returns a not empty array with an object type', async () => {
      const response = await ProductsModel.getProducts();

      expect(response).to.be.an('array');
      expect(response).to.be.not.empty;
      expect(response[0]).to.be.an('object');
    });
  });

  describe('get a product by ID with success', async () => {

    it('Returns an object with _id property', async () => {
      const response = await ProductsModel.getProductById(productID);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('_id');
    });

    it('Returns a null if id not found', async () => {
      const response = await ProductsModel.getProductById('999999');

      expect(response).to.be.a('null');
    });
  });

  describe('get a product by Name with success', async () => {

    it('Returns an object with _id property', async () => {
      const response = await ProductsModel.getProductByName('example_product');

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('_id');
    });
  });

  describe('get a product updated with success', async () => {

    it('Returns an object with an id property', async () => {
      const response = await ProductsModel.updateProduct(productID, 'example_product', 200);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('id');
    });

    it('Returns a null if id not found', async () => {
      const response = await ProductsModel.updateProduct('999999', 'example_product', 200);

      expect(response).to.be.a('null');
    });
  });

  describe('get a product deleted with success', async () => {

    it('Returns a null if id not found', async () => {
      const response = await ProductsModel.removeProduct('999999');

      expect(response).to.be.a('null');
    });
    it('Returns an object with an _id property', async () => {
      const response = await ProductsModel.removeProduct(mockedId);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('_id');
    });
  });

});

// SalesModel

describe('Sales Models', () => {
  const mockedSales = [
    {
      "productId": "60b792a98ef44634865ebb3f",
      "quantity": 10
    },
    {
      "productId": "60b792a98ef44634865ebb3f",
      "quantity": 20
    }
  ];
  const updateMockSales = [
    {
      "productId": "60b792a98ef44634865ebb3f",
      "quantity": 5
    },
    {
      "productId": "60b792a98ef44634865ebb3f",
      "quantity": 10
    }
  ];
  let mockedSaleId;

  const payloadSales = [
    {
      "productId": "60b792a98ef44634865ebb3f",
      "quantity": 10
    }
  ]

  const mockedProducts = [
    { name: "example_product1", quantity: 100 },
    { name: "example_product2", quantity: 200 }
  ]
  let mockedId;

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    const conncetionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    sinon.stub(MongoClient, 'connect').resolves(conncetionMock);

    const response = await SalesModel.createSales(mockedSales);
    mockedSaleId = response._id;
  });
  after(async () => {
    MongoClient.connect.restore();
  });

  describe('create a new sale with success', async () => {
    it('Returns an object and has an _id generated by MongoDB', async () => {
      const response = await SalesModel.createSales(payloadSales);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('_id');
    });
  });

  describe('get all sales with success', async () => {
    it('Returns a not empty array with an object type', async () => {
      const response = await SalesModel.getSales();

      expect(response).to.be.an('array');
      expect(response).to.be.not.empty;
      expect(response[0]).to.be.an('object');
    });
  });

  describe('get a sale by ID with success', async () => {
    it('Returns an object with _id property', async () => {
      const response = await SalesModel.getSalesById(mockedSaleId);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('_id');
    });

    it('Returns a null if id not found', async () => {
      const response = await SalesModel.getSalesById('999999');

      expect(response).to.be.a('null');
    });
  });

  describe('get a sale updated with success', async () => {
    it('Returns an object with an _id property', async () => {
      const response = await SalesModel.updateSale(mockedSaleId, updateMockSales);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('_id');
    });

    it('Returns a null if id not found', async () => {
      const response = await SalesModel.updateSale('999999', updateMockSales);

      expect(response).to.be.a('null');
    });
  });

  describe('get a sales deleted with success', async () => {
    it('Returns a null if id not found', async () => {
      const response = await SalesModel.removeSale('999999');

      expect(response).to.be.a('null');
    });

    it('Returns an object', async () => {
      const response = await SalesModel.removeSale(mockedSaleId);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('_id');
    });
  });
});
