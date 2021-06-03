const sinon = require('sinon');
const { expect } = require('chai');

const ProductsServices = require('../../services/productsServices');
const ProductsModel = require('../../models/productsModel');
const SalesServices = require('../../services/salesServices');
const SalesModel = require('../../models/salesModel');

// Products Services

describe('ProductsServices', () => {
  describe('VerifyIfExists and validateNewProduct function with success', () => {
    const mockName = 'example_one';
    const mockProduct = [
      {
        name: "example_one",
        quantity: 10
      },
      {
        name: "example_two",
        quantity: 20
      }
    ];

    before(() => {
      sinon.stub(ProductsModel, 'getProductByName')
        .resolves();
    })
    after(() => {
      ProductsModel.getProductByName.restore();
    })

    it('VerifyIfExists returns null', async () => {
      const response = await ProductsServices.verifyIfExists(mockName);

      expect(response).to.be.a('null');
    });

    it('ValidateNewProduct returns null', async () => {
      const response = await ProductsServices.validateNewProduct(mockProduct[0]);

      expect(response).to.be.a('null');
    });
  });

  describe('VerifyIfExists and validateNewProduct function with failing', () => {
    const mockName = 'example_one';
    const mockProduct = [
      {
        name: "exa",
        quantity: 10
      },
      {
        name: "example_two",
        quantity: 0
      },
      {
        name: "example_three",
        quantity: '99'
      }
    ];
    const errMessage = { code: 'invalid_data', message: 'Err message' };

    before(() => {
      sinon.stub(ProductsModel, 'getProductByName')
        .resolves(mockProduct[0]);
    })
    after(() => {
      ProductsModel.getProductByName.restore();
    })

    it('VerifyIfExists returns error with json() message', async () => {
      const response = await ProductsServices.verifyIfExists(mockName);

      expect(response).to.be.a('object');
      expect(response).to.deep.equal({ code: 'invalid_data', message: 'Product already exists' })
    });

    it('validateNewProduct returns a name length error with json() message', async () => {
      const response = await ProductsServices.validateNewProduct(mockProduct[0]);

      expect(response).to.be.a('object');
      expect(response).to.deep.equal({ code: 'invalid_data', message: '"name" length must be at least 5 characters long' })
    });

    it('validateNewProduct returns a quantity error with json() message', async () => {
      const response = await ProductsServices.validateNewProduct(mockProduct[1]);

      expect(response).to.be.a('object');
      expect(response).to.deep.equal({ code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' })
    });

    it('validateNewProduct returns a quantity type error with json() message', async () => {
      const response = await ProductsServices.validateNewProduct(mockProduct[2]);

      expect(response).to.be.a('object');
      expect(response).to.deep.equal({ code: 'invalid_data', message: '"quantity" must be a number' })
    });
  });

});

// Sales Services

describe('SalesServices', () => {
  describe('verifySalesItens function with success', () => {
    const mockPayload = [
      { productId: '1', quantity: 2 },
      { productId: '2', quantity: 3 }
    ];

    before(() => {
      sinon.stub(ProductsModel, 'getProductById')
        .resolves({ name: 'example', quantity: 10 });
    })
    after(() => {
      ProductsModel.getProductById.restore();
    })

    it('verifySalesItens returns null', async () => {
      const response = await SalesServices.verifySalesItens(mockPayload);

      expect(response).to.be.a('null');
    });
  });

  describe('verifySalesItens function with failing', () => {
    const mockPayload = [
      { productId: '1', quantity: 2 },
      { productId: '2', quantity: 3 }
    ];

    before(() => {
      sinon.stub(ProductsModel, 'getProductById')
        .resolves();
    })
    after(() => {
      ProductsModel.getProductById.restore();
    })

    it('verifySalesItens returns error with json() message', async () => {
      const response = await SalesServices.verifySalesItens(mockPayload);

      expect(response).to.be.a('object');
      expect(response).to.deep.equal({ code: 'invalid_data', message: 'Wrong product ID or invalid quantity' })
    });
  });

  describe('handleQuantitySale function with success', () => {
    const mockPayloadSold = [{ productId: '1', quantity: 10 }];
    const mockStored = [{ _id: '1', name: 'example', quantity: 5 }];

    before(() => {
      sinon.stub(ProductsModel, 'getProductById')
        .resolves({ _id: '1', name: 'example', quantity: 100 });
    })
    after(() => {
      ProductsModel.getProductById.restore();
    })

    it('handleQuantitySale returns null', async () => {
      const response = await SalesServices.handleQuantitySale(mockStored, mockPayloadSold);

      expect(response).to.be.a('null');
    });
  });

  describe('handleQuantitySale function with failing', () => {
    const mockPayloadSold = [
      { productId: '1', quantity: 20 },
      { productId: '2', quantity: 3 }
    ];

    before(() => {
      sinon.stub(ProductsModel, 'getProductById')
        .resolves({ _id: '1', name: 'example', quantity: 10 });
    })
    after(() => {
      ProductsModel.getProductById.restore();
    })

    it('handleQuantitySale returns error with json() message', async () => {
      const response = await SalesServices.handleQuantitySale(null, mockPayloadSold);

      expect(response).to.be.a('object');
      expect(response).to.deep.equal({ code: 'stock_problem', message: 'Such amount is not permitted to sell' })
    });
  });

  describe('handleQuantityReturned function with success', () => {
    const mockPayloadSold = [
      { productId: '1', quantity: 2 },
      { productId: '2', quantity: 3 }
    ];

    before(() => {
      sinon.stub(ProductsModel, 'getProductById')
        .resolves({ _id: '1', name: 'example', quantity: 100 });
    })
    after(() => {
      ProductsModel.getProductById.restore();
    })

    it('handleQuantityReturned returns null', async () => {
      const response = await SalesServices.handleQuantityReturned(mockPayloadSold);

      expect(response).to.be.a('null');
    });
  });

  describe('handleQuantityReturned function with failing', () => {
    const mockPayloadSold = [
      { productId: '1', quantity: -20 },
      { productId: '2', quantity: 3 }
    ];

    before(() => {
      sinon.stub(ProductsModel, 'getProductById')
        .resolves({ _id: '1', name: 'example', quantity: 2 });
    })
    after(() => {
      ProductsModel.getProductById.restore();
    })

    it('handleQuantityReturned returns error with json() message', async () => {
      const response = await SalesServices.handleQuantityReturned(mockPayloadSold);

      expect(response).to.be.a('object');
      expect(response).to.deep.equal({ code: 'stock_problem', message: 'Such amount is not permitted to sell' })
    });
  });

});
