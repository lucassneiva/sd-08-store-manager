const sinon = require('sinon');
const { expect } = require('chai');

const ProductsController = require('../../controllers/productsController');
const ProductModel = require('../../models/productsModel');
const ProductService = require('../../services/productsServices');
const SalesController = require('../../controllers/salesController');
const SalesModel = require('../../models/salesModel');
const SalesServices = require('../../services/salesServices');

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

      sinon.stub(ProductService, 'validateNewProduct').returns(errMessage);
      sinon.stub(ProductService, 'verifyIfExists').resolves(errMessage);

      sinon.stub(ProductModel, 'createProduct')
        .resolves();
      sinon.stub(ProductModel, 'getProducts')
        .resolves();
    })
    after(() => {
      ProductModel.createProduct.restore();
      ProductModel.getProducts.restore();
      ProductService.validateNewProduct.restore();
      ProductService.verifyIfExists.restore();
    });

    it('The create is resolved with status code 422and with the response in json()', async () => {
      await ProductsController.create(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWith({  err: errMessage })).to.be.equal(true);
    });

    it('The getAll is resolved with status code 422and with the response in json()', async () => {
      await ProductsController.getAll(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWith({ err: 'None product in DB' })).to.be.equal(true);
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

      sinon.stub(ProductService, 'validateNewProduct').returns(errMessage);
      sinon.stub(ProductService, 'verifyIfExists').resolves(errMessage);

      sinon.stub(ProductModel, 'getProductById')
        .resolves();
      sinon.stub(ProductModel, 'updateProduct')
        .resolves(errMessage);
      sinon.stub(ProductModel, 'removeProduct')
        .resolves();
    })
    after(() => {
      ProductModel.getProductById.restore();
      ProductModel.updateProduct.restore();
      ProductModel.removeProduct.restore();
      ProductService.validateNewProduct.restore();
      ProductService.verifyIfExists.restore();
    });

    it('The getById is resolved with status code 422 and with the response in json()', async () => {
      await ProductsController.getById(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWith({ err: { code: 'invalid_data', message: 'Wrong id format' } })).to.be.equal(true);
    });

    it('The update is resolved with status code 422 and with the response in json()', async () => {
      await ProductsController.update(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWith({  err: errMessage })).to.be.equal(true);
    });

    it('The remove is resolved with status code 422 and with the response in json()', async () => {
      await ProductsController.remove(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWith({ err: { code: 'invalid_data', message: 'Wrong id format' } })).to.be.equal(true);
    });
  });

  // router /products or /products/:id

  describe('When the router is /products with other errors', async () => {
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

      sinon.stub(ProductService, 'validateNewProduct').returns(null);
      sinon.stub(ProductService, 'verifyIfExists').resolves(errMessage);

      sinon.stub(ProductModel, 'createProduct')
        .resolves();
      sinon.stub(ProductModel, 'updateProduct')
        .resolves();
    })
    after(() => {
      ProductModel.createProduct.restore();
      ProductModel.updateProduct.restore();
      ProductService.validateNewProduct.restore();
      ProductService.verifyIfExists.restore();
    });

    it('The create is resolved with status code 422 and with the response in json()', async () => {
      await ProductsController.create(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWith({  err: errMessage })).to.be.equal(true);
    });

    it('The update is resolved with status code 422 and with the response in json()', async () => {
      await ProductsController.update(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWith({ err: { code: 'invalid_data', message: 'Wrong id format' } })).to.be.equal(true);
    });
  });

});

describe('SalesController', () => {

  // router /sales

  describe('When the router is /sales with success', async () => {
    const response = {};
    const request = {};
    const mockSaleBody = [
      {
        productId: 1,
        quantity: 10
      },
      {
        productId: 2,
        quantity: 5
      }
    ];
    const mockSale = {
      _id: 1,
      itensSold: mockSaleBody
    };

    before(() => {
      request.body = mockSaleBody;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(mockSale);

      sinon.stub(SalesServices, 'verifySalesItens').returns(null);
      sinon.stub(SalesServices, 'handleQuantitySale').returns(null);
      sinon.stub(SalesServices, 'handleQuantityReturned').returns(null);

      sinon.stub(SalesModel, 'createSales')
        .resolves(mockSale);
      sinon.stub(SalesModel, 'getSales')
        .resolves([mockSale]);
    })
    after(() => {
      SalesModel.createSales.restore();
      SalesModel.getSales.restore();
      SalesServices.verifySalesItens.restore();
      SalesServices.handleQuantitySale.restore();
      SalesServices.handleQuantityReturned.restore();
    });

    it('The create is resolved with status code 200 and with the response in json()', async () => {
      await SalesController.create(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(mockSale)).to.be.equal(true);
    });

    it('The getAll is resolved with status code 200 and with the response in json()', async () => {
      await SalesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith({ sales: [mockSale] })).to.be.equal(true);
    });
  });

  // router /sales/:id

  describe('When the router is /sales/:id with success', async () => {
    const response = {};
    const request = {};
    const mockSaleBody = [
      {
        productId: 1,
        quantity: 10
      },
      {
        productId: 2,
        quantity: 5
      }
    ];
    const mockSale = {
      _id: 1,
      itensSold: mockSaleBody
    };


    before(() => {
      request.params = '1';
      request.body = mockSaleBody;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesServices, 'verifySalesItens').returns(null);
      sinon.stub(SalesServices, 'handleQuantitySale').returns(null);
      sinon.stub(SalesServices, 'handleQuantityReturned').returns(null);

      sinon.stub(SalesModel, 'getSalesById')
        .resolves(mockSale);
      sinon.stub(SalesModel, 'updateSale')
        .resolves(mockSale);
      sinon.stub(SalesModel, 'removeSale')
        .resolves(mockSale);
    })
    after(() => {
      SalesModel.getSalesById.restore();
      SalesModel.updateSale.restore();
      SalesModel.removeSale.restore();
      SalesServices.verifySalesItens.restore();
      SalesServices.handleQuantitySale.restore();
      SalesServices.handleQuantityReturned.restore();
    });

    it('The getById is resolved with status code 200 and with the response in json()', async () => {
      await SalesController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(mockSale)).to.be.equal(true);
    });

    it('The update is resolved with status code 200 and with the response in json()', async () => {
      await SalesController.update(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(mockSale)).to.be.equal(true);
    });

    it('The remove is resolved with status code 200 and with the response in json()', async () => {
      await SalesController.remove(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(mockSale)).to.be.equal(true);
    });
  });

  // // router /sales

  describe('When the router is /sales failing', async () => {
    const response = {};
    const request = {};

    const mockSaleBody = [
      {
        productId: 1,
        quantity: 0
      },
      {
        productId: 9,
        quantity: 5
      }
    ];

    const errMessage = { code: 'invalid_data', message: 'Err message' };

    before(() => {
      request.body = mockSaleBody;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesServices, 'verifySalesItens').returns(errMessage);
      sinon.stub(SalesServices, 'handleQuantitySale').returns();
      sinon.stub(SalesServices, 'handleQuantityReturned').returns();

      sinon.stub(SalesModel, 'createSales')
        .resolves();
      sinon.stub(SalesModel, 'getSales')
        .resolves();
    })
    after(() => {
      SalesModel.createSales.restore();
      SalesModel.getSales.restore();
      SalesServices.verifySalesItens.restore();
      SalesServices.handleQuantitySale.restore();
      SalesServices.handleQuantityReturned.restore();
    });

    it('The create is resolved with status code 422 and with the response in json()', async () => {
      await SalesController.create(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWith({ err: errMessage })).to.be.equal(true);
    });

    it('The getAll is resolved with status code 422 and with the response in json()', async () => {
      await SalesController.getAll(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWith({ err: 'None sales in DB' })).to.be.equal(true);
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

      sinon.stub(SalesServices, 'verifySalesItens').returns(errMessage);
      sinon.stub(SalesServices, 'handleQuantitySale').returns(errMessage);
      sinon.stub(SalesServices, 'handleQuantityReturned').returns(errMessage);

      sinon.stub(SalesModel, 'getSalesById')
        .resolves();
      sinon.stub(SalesModel, 'updateSale')
        .resolves(errMessage);
      sinon.stub(SalesModel, 'removeSale')
        .resolves(errMessage);
    })
    after(() => {
      SalesModel.getSalesById.restore();
      SalesModel.updateSale.restore();
      SalesModel.removeSale.restore();
      SalesServices.verifySalesItens.restore();
      SalesServices.handleQuantitySale.restore();
      SalesServices.handleQuantityReturned.restore();
    });

    it('The getById is resolved with status code 422 and with the response in json()', async () => {
      await SalesController.getById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ err: { code: 'not_found', message: 'Sale not found' } })).to.be.equal(true);
    });

    it('The update is resolved with status code 422 and with the response in json()', async () => {
      await SalesController.update(request, response);
      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWith({  err: errMessage })).to.be.equal(true);
    });

    it('The remove is resolved with status code 422 and with the response in json()', async () => {
      await SalesController.remove(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWith({  err: errMessage })).to.be.equal(true);
    });
  });

  // router /sales or /sales/:id

  describe('When the router is /sales with other errors', async () => {
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

      sinon.stub(SalesServices, 'verifySalesItens').returns();
      sinon.stub(SalesServices, 'handleQuantitySale').returns(errMessage);
      sinon.stub(SalesServices, 'handleQuantityReturned').returns(errMessage);

      sinon.stub(SalesModel, 'createSales')
        .resolves();
      sinon.stub(SalesModel, 'getSalesById')
        .resolves();
      sinon.stub(SalesModel, 'updateSale')
        .resolves(errMessage);
      sinon.stub(SalesModel, 'removeSale')
        .resolves(errMessage);
    })
    after(() => {
      SalesModel.createSales.restore();
      SalesModel.getSalesById.restore();
      SalesModel.updateSale.restore();
      SalesModel.removeSale.restore();
      SalesServices.verifySalesItens.restore();
      SalesServices.handleQuantitySale.restore();
      SalesServices.handleQuantityReturned.restore();
    });

    it('The create is resolved with status code 422 and with the response in json()', async () => {
      await SalesController.create(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ err: errMessage })).to.be.equal(true);
    });

    it('The update is resolved with status code 422 and with the response in json()', async () => {
      await SalesController.update(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWith({ err: 'Unable to update sale' })).to.be.equal(true);
    });

    it('The remove is resolved with status code 422 and with the response in json()', async () => {
      await SalesController.remove(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWith({  err: errMessage })).to.be.equal(true);
    });
  });

  describe('When the router is /sales with other errors', async () => {
    const response = {};
    const request = {};

    const mockSaleBody = [
      {
        productId: 1,
        quantity: 10
      },
      {
        productId: 2,
        quantity: 5
      }
    ];
    const mockSale = {
      _id: 1,
      itensSold: mockSaleBody
    };

    const errMessage = { code: 'invalid_data', message: 'Err message' };

    before(() => {
      request.params = '1';
      request.body = [
        {
          productId: 1,
          quantity: 5
        }
      ];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesServices, 'verifySalesItens').returns();
      sinon.stub(SalesServices, 'handleQuantitySale').returns(errMessage);
      sinon.stub(SalesServices, 'handleQuantityReturned').returns();

      sinon.stub(SalesModel, 'getSalesById')
        .resolves(mockSale);
      sinon.stub(SalesModel, 'updateSale')
        .resolves(errMessage);
      sinon.stub(SalesModel, 'removeSale')
        .resolves();
    })
    after(() => {
      SalesModel.getSalesById.restore();
      SalesModel.updateSale.restore();
      SalesModel.removeSale.restore();
      SalesServices.verifySalesItens.restore();
      SalesServices.handleQuantitySale.restore();
      SalesServices.handleQuantityReturned.restore();
    });

    it('The update is resolved with status code 404 and with the response in json()', async () => {
      await SalesController.update(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ err: errMessage })).to.be.equal(true);
    });

    it('The remove is resolved with status code 422 and with the response in json()', async () => {
      await SalesController.remove(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWith({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } })).to.be.equal(true);
    });
  });

  describe('When the router is /sales with other errors', async () => {
    const response = {};
    const request = {};

    const mockSaleBody = [
      {
        productId: 1,
        quantity: 10
      },
      {
        productId: 2,
        quantity: 5
      }
    ];
    const mockSale = {
      _id: 1,
      itensSold: mockSaleBody
    };

    const errMessage = { code: 'invalid_data', message: 'Err message' };

    before(() => {
      request.params = '1';
      request.body = [
        {
          productId: 1,
          quantity: 5
        }
      ];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesServices, 'verifySalesItens').returns();
      sinon.stub(SalesServices, 'handleQuantitySale').returns();
      sinon.stub(SalesServices, 'handleQuantityReturned').returns(errMessage);

      sinon.stub(SalesModel, 'getSalesById')
        .resolves(mockSale);
      sinon.stub(SalesModel, 'updateSale')
        .resolves();
      sinon.stub(SalesModel, 'removeSale')
        .resolves();
    })
    after(() => {
      SalesModel.getSalesById.restore();
      SalesModel.updateSale.restore();
      SalesModel.removeSale.restore();
      SalesServices.verifySalesItens.restore();
      SalesServices.handleQuantitySale.restore();
      SalesServices.handleQuantityReturned.restore();
    });

    it('The update is resolved with status code 422 and with the response in json()', async () => {
      await SalesController.update(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWith({ err: { code: 'invalid_data', message: 'Wrong id format' } })).to.be.equal(true);
    });

    it('The remove is resolved with status code 404 and with the response in json()', async () => {
      await SalesController.remove(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ err: errMessage })).to.be.equal(true);
    });
  });

});
