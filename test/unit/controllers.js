const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../services/productsServices');
const productsController = require('../../controllers/productsController');

const salesServices = require('../../services/salesServices');
const salesController = require('../../controllers/salesController');

describe('Chamar o controller de addProduct', () => {
  describe('Quando exite produtos', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: 'Bola de futebol',
        quantity: 20,
      }

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productsServices, 'addProduct')
        .resolves({
          statusCode: 201,
          json: {
            name: 'Bola de futebol',
            quantity: 20,
          }
        });
    });
        
    after(() => {
      productsServices.addProduct.restore();
    });
    
      it('é chamado o status com o código 201', async () => {
        await productsController.addProduct(request, response);

        expect(response.status.calledWith(201)).to.be.equal(true);
      });

      it('é chamado o json com o produto', async () => {
        await productsController.addProduct(request, response);
  
        expect(response.json.calledWith({
          name: 'Bola de futebol',
          quantity: 20,
        })).to.be.equal(true);
      });
  });

  describe('quando o dado informado não é válido', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productsServices, 'addProduct')
        .resolves({
          statusCode: 422,
          json: {
            err: {
              code: 'invalid_data',
              message: 'Product already exists',
            }
          }
        });
    });

    after(() => {
      productsServices.addProduct.restore();
    });

    it('é chamado o status com o código 422', async () => {
      await productsController.addProduct(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('é chamado o json com o json "Err"', async () => {
      await productsController.addProduct(request, response);

      expect(response.json.calledWith({ err: {
        code: 'invalid_data',
        message: 'Product already exists',
      } })).to.be.equal(true);
    });
  });
});

describe('Chamar o controller getAll', () => {
  describe('Quando existe produtos', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productsServices, 'getAllProductsServices')
        .resolves({
          statusCode: 200,
          json: {
            products: true,
          }
        });
    });

    after(() => {
      productsServices.getAllProductsServices.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await productsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com os produtos', async () => {
      await productsController.getAll(request, response);

      expect(response.json.calledWith({ products: true })).to.be.equal(true);
    });
  });
});

describe('Chamar o controller findById', () => {
  describe('Quando existe o produto com o Id', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: '60be5b5e3fb914a301cb682a' };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productsServices, 'getByIdProductsServices')
        .resolves({
          statusCode: 200,
          json: {
            _id:'60be5b5e3fb914a301cb682a',
            name: 'Bola de futebol',
            quantity: 20,
          }
        });
    });

    after(() => {
      productsServices.getByIdProductsServices.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await productsController.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('é chamado o json com os produtos', async () => {
      await productsController.findById(request, response);

      expect(response.json.calledWith({
        _id:'60be5b5e3fb914a301cb682a',
        name: 'Bola de futebol',
        quantity: 20,
      })).to.be.equal(true);
    });
  });

  describe('Quando o id e inválido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: '1' };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productsServices, 'getByIdProductsServices')
        .resolves({
          statusCode: 422,
          json: {
            err: {
              code: 'invalid_data',
              message: 'Wrong id format'
            }
          }
        });
    });

    after(() => {
      productsServices.getByIdProductsServices.restore();
    });

    it('é chamado o status com o código 422', async () => {
      await productsController.findById(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('é chamado o json com o "Err', async () => {
      await productsController.findById(request, response);

      expect(response.json.calledWith({ err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }})).to.be.equal(true);
    });
  });
});

describe('Chamar o controller updateProducts', () => {
  describe('Quando o update da certo', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = { 
        name: 'Bola de futebol',
        quantity: 20,
      }
      request.params = { id: '60be5b5e3fb914a301cb682a' };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productsServices, 'updateProductsServices')
        .resolves({
          statusCode: 200,
          json: {
            _id: '60be5b5e3fb914a301cb682a',
            name: 'Bola de futebol',
            quantity: 20,
          }
        });
    });

    after(() => {
      productsServices.updateProductsServices.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await productsController.updateProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('é chamado o json com os produtos atualizados', async () => {
      await productsController.updateProducts(request, response);

      expect(response.json.calledWith({
        _id: '60be5b5e3fb914a301cb682a',
        name: 'Bola de futebol',
        quantity: 20,
      })).to.be.equal(true);
    });
  });

  describe('Quando o update da erro com parametros passados errados', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = { 
        name: 'Bola de futebol',
        quantity: 'string',
      }
      request.params = { id: '60be5b5e3fb914a301cb682a' };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productsServices, 'updateProductsServices')
        .resolves({
          statusCode: 422,
          json: {
            err: {
              code: 'invalid_data',
              message: '"\"quantity\" must be a number',
            }
          }
        });
    });

    after(() => {
      productsServices.updateProductsServices.restore();
    });

    it('é chamado o status com o código 422', async () => {
      await productsController.updateProducts(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('é chamado o json com o json "Err"', async () => {
      await productsController.updateProducts(request, response);

      expect(response.json.calledWith({ err: {
        code: 'invalid_data',
        message: '"\"quantity\" must be a number',
      }})).to.be.equal(true);
    });
  });
});

describe('Chamar o controller deleteProducts', () => {
  describe('Quando o produto e deletado com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: '60be5b5e3fb914a301cb682a' };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productsServices, 'deleteProductsServices')
        .resolves({
          statusCode: 200,
          json: {
            _id: '60be5b5e3fb914a301cb682a',
            name: 'Bola de golf',
            quantity: 20
          },
        });
    });

    after(() => {
      productsServices.deleteProductsServices.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await productsController.deleteProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('é chamado o json com os produtos atualizados', async () => {
      await productsController.deleteProducts(request, response);

      expect(response.json.calledWith({
        _id: '60be5b5e3fb914a301cb682a',
        name: 'Bola de golf',
        quantity: 20
      })).to.be.equal(true);
    });
  });
})

describe('Chamar o controller de addSales', () => {
  describe('Quando exite produtos', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = [
        {
          productId: '5f43ba273200020b101fe49f',
          quantity: 2,
        }
      ];

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(salesServices, 'addSalesServices')
        .resolves({
          statusCode: 200,
          json: {
            _id: '5f43ba333200020b101fe4a0',
            itensSold: [
            {
              productId: '5f43ba273200020b101fe49f',
              quantity: 2
            }
            ]
          }
        });
    });
        
    after(() => {
      salesServices.addSalesServices.restore();
    });
    
      it('é chamado o status com o código 200', async () => {
        await salesController.addSales(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('é chamado o json com o produto', async () => {
        await salesController.addSales(request, response);
  
        expect(response.json.calledWith({
          _id: '5f43ba333200020b101fe4a0',
          itensSold: [
          {
            productId: '5f43ba273200020b101fe49f',
            quantity: 2
          }
          ]
        })).to.be.equal(true);
      });
  });
});

describe('Chamar o controller getAll', () => {
  describe('Quando existe produtos', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(salesServices, 'getAllSalesServices')
        .resolves({
          statusCode: 200,
          json: {
            sales: [
              {
                _id: '5f43ba333200020b101fe4a0',
                itensSold: [
                  {
                    productId: '5f43ba273200020b101fe49f',
                    quantity: 2
                  }
                ]
              }
            ]
          }
        });
    });

    after(() => {
      salesServices.getAllSalesServices.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await salesController.getAllSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com os produtos', async () => {
      await salesController.getAllSales(request, response);

      expect(response.json.calledWith({
        sales: [
          {
            _id: '5f43ba333200020b101fe4a0',
            itensSold: [
              {
                productId: '5f43ba273200020b101fe49f',
                quantity: 2
              }
            ]
          }
        ]
      })).to.be.equal(true);
    });
  });
});

describe('Chamar o controller findById', () => {
  describe('Quando existe o produto com o Id', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: '60be5b5e3fb914a301cb682a' };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(salesServices, 'findByIdSalesServices')
        .resolves({
          statusCode: 200,
          json: {
            _id:'60be5b5e3fb914a301cb682a',
            itensSold: [
              {
                productId: '5f43ba273200020b101fe49f',
                quantity: 2
              }
            ]
          }
        });
    });

    after(() => {
      salesServices.findByIdSalesServices.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await salesController.findByIdSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('é chamado o json com os produtos', async () => {
      await salesController.findByIdSales(request, response);

      expect(response.json.calledWith({
        _id:'60be5b5e3fb914a301cb682a',
        itensSold: [
          {
            productId: '5f43ba273200020b101fe49f',
            quantity: 2
          }
        ]
      })).to.be.equal(true);
    });
  });
});

describe('Chamar o controller updateProducts', () => {
  describe('Quando o update da certo', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = [{ 
        productId: '5f43ba273200020b101fe49f',
        quantity: 2
      }]
      request.params = { id: '60be5b5e3fb914a301cb682a' };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(salesServices, 'updateSalesServices')
        .resolves({
          statusCode: 200,
          json: {
            _id: '60be5b5e3fb914a301cb682a',
            itensSold: [
              {
                productId: '5f43ba273200020b101fe49f',
                quantity: 2
              }
            ]
          }
        });
    });

    after(() => {
      salesServices.updateSalesServices.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await salesController.updateSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('é chamado o json com os produtos atualizados', async () => {
      await salesController.updateSales(request, response);

      expect(response.json.calledWith({
        _id: '60be5b5e3fb914a301cb682a',
        itensSold: [
          {
            productId: '5f43ba273200020b101fe49f',
            quantity: 2
          }
        ]
      })).to.be.equal(true);
    });
  });
});

describe('Chamar o controller deleteProducts', () => {
  describe('Quando o produto e deletado com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: '60be5b5e3fb914a301cb682a' };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(salesServices, 'deleteSalesServices')
        .resolves({
          statusCode: 200,
          json: {
            _id: '60be5b5e3fb914a301cb682a',
            itensSold: [
              {
                productId: '5f43ba273200020b101fe49f',
                quantity: 2
              }
            ]
          },
        });
    });

    after(() => {
      salesServices.deleteSalesServices.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await salesController.deleteSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('é chamado o json com os produtos atualizados', async () => {
      await salesController.deleteSales(request, response);

      expect(response.json.calledWith({
        _id: '60be5b5e3fb914a301cb682a',
        itensSold: [
          {
            productId: '5f43ba273200020b101fe49f',
            quantity: 2
          }
        ]
      })).to.be.equal(true);
    });
  });
})