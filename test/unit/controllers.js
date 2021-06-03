const sinon = require('sinon');
const { expect } = require('chai');

const ProductsController = require('../../controllers/productsController');
const ProductModel = require('../../models/productsModel');
const ProductService = require('../../services/productsServices');
const SalesController = require('../../controllers/salesController');

describe('ProductsController', () => {

  // router /products

  describe('When the router is /products with success', async () => {
    const response = {};
    const request = {};
    const mockProduct = {
      _id: 1,
      name: "example_product",
      quantity: 100
    };

    before(() => {
      request.body = {
        name: "example_product",
        quantity: 100
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(mockProduct);

      sinon.stub(ProductService, 'validateNewProduct').returns(null);
      sinon.stub(ProductService, 'verifyIfExists').resolves(null);

      sinon.stub(ProductModel, 'createProduct')
        .resolves(mockProduct);
      sinon.stub(ProductModel, 'getProducts')
        .resolves([ mockProduct ]);
    })
    after(() => {
      ProductModel.createProduct.restore();
      ProductModel.getProducts.restore();
      ProductService.validateNewProduct.restore();
      ProductService.verifyIfExists.restore();
    });

    it('The create is resolved with status code 201 and with the response in json()', async () => {
      await ProductsController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith(mockProduct)).to.be.equal(true);
    });

    it('The getAll is resolved with status code 200 and with the response in json()', async () => {
      await ProductsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith({ products: [mockProduct] })).to.be.equal(true);
    });
  });

  // router /products/:id

  describe('When the router is /products/:id with success', async () => {
    const response = {};
    const request = {};
    const mockProduct = {
      _id: 1,
      name: "example_product",
      quantity: 100
    };

    before(() => {
      request.params = '1';
      request.body = {
        name: "example_product",
        quantity: 100
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductService, 'validateNewProduct').returns(null);
      sinon.stub(ProductService, 'verifyIfExists').resolves(null);

      sinon.stub(ProductModel, 'getProductById')
        .resolves(mockProduct);
      sinon.stub(ProductModel, 'updateProduct')
        .resolves(mockProduct);
      sinon.stub(ProductModel, 'removeProduct')
        .resolves(mockProduct);
    })
    after(() => {
      ProductModel.getProductById.restore();
      ProductModel.updateProduct.restore();
      ProductModel.removeProduct.restore();
      ProductService.validateNewProduct.restore();
      ProductService.verifyIfExists.restore();
    });

    it('The getById is resolved with status code 200 and with the response in json()', async () => {
      await ProductsController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(mockProduct)).to.be.equal(true);
    });

    it('The update is resolved with status code 200 and with the response in json()', async () => {
      await ProductsController.update(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(mockProduct)).to.be.equal(true);
    });

    it('The remove is resolved with status code 200 and with the response in json()', async () => {
      await ProductsController.remove(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(mockProduct)).to.be.equal(true);
    });
  });

  // router /products

  describe('When the router is /products failing', async () => {
    const response = {};
    const request = {};

    const errMessage = { code: 'invalid_data', message: 'Err message' };

    before(() => {
      request.body = {
        name: "exa",
        quantity: 0
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductService, 'validateNewProduct').returns(true);
      sinon.stub(ProductService, 'verifyIfExists').resolves(true);

      sinon.stub(ProductModel, 'createProduct')
        .resolves(errMessage);
      sinon.stub(ProductModel, 'getProducts')
        .resolves(errMessage);
    })
    after(() => {
      ProductModel.createProduct.restore();
      ProductModel.getProducts.restore();
      ProductService.validateNewProduct.restore();
      ProductService.verifyIfExists.restore();
    });

    it('The create is resolved with status code 422', async () => {
      await ProductsController.create(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('The getAll is resolved with status code 422', async () => {
      await ProductsController.getAll(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });
  });

    // router /products/:id

  describe('When the router is /products/:id failing', async () => {
    const response = {};
    const request = {};

    const errMessage = { code: 'invalid_data', message: 'Err message' };

    before(() => {
      request.params = '9';
      request.body = {
        name: "exa",
        quantity: 0
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductService, 'validateNewProduct').returns(true);
      sinon.stub(ProductService, 'verifyIfExists').resolves(errMessage);

      sinon.stub(ProductModel, 'getProductById')
        .resolves(null);
      sinon.stub(ProductModel, 'updateProduct')
        .resolves(errMessage);
      sinon.stub(ProductModel, 'removeProduct')
        .resolves(errMessage);
    })
    after(() => {
      ProductModel.getProductById.restore();
      ProductModel.updateProduct.restore();
      ProductModel.removeProduct.restore();
      ProductService.validateNewProduct.restore();
      ProductService.verifyIfExists.restore();
    });

    it('The getById is resolved with status code 422', async () => {
      await ProductsController.getById(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('The update is resolved with status code 422', async () => {
      await ProductsController.update(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('The remove is resolved with status code 422', async () => {
      await ProductsController.remove(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });
  });



});
