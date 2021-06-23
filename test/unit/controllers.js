const { expect } = require('chai');
const sinon = require('sinon');

const ProductsController = require('../../controllers/productsController');
const ProductsService = require('../../services/productsService');
const ProductsModel = require('../../models/productsModel');
const SalesController = require('../../controllers/salesController');
const SalesService = require('../../services/salesServices');
const SalesModel = require('../../models/salesModel');


describe('Products Controller', () => {
  describe('Ao chamar o "create"', () => {
    const productDB = {
      _id: '60cd2b9443dfec28a4a4241e',
      name: 'Martelo',
      quantity: 2
    }

    const errorObj = {
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    }
    describe('Quando informa dados inválidos', () => {
      const response = {};
      const request = {};

      before(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(errorObj);
        sinon.stub(ProductsService, 'create').returns({error: true, message: 'Product already exists'});
      })

      after(() => {
        ProductsService.create.restore();
      })

      it('retorna um JSON com o formato correto', async () => {
        await ProductsController.create(request, response);
        expect(response.status.calledWith(422)).to.be.true;
        expect(response.json.calledWith(errorObj)).to.be.true;
      })
    })

    describe('Quando informa os dados validos', () => {
      const response = {};
      const request = {};

      before(() => {
        request.body = { name: 'Martelo', quantity: 2 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(ProductsService, 'create').returns(productDB);
      })

      after(() => {
        ProductsService.create.restore();
      })
      it('retorna o status "201"', async () => {
        await ProductsController.create(request, response);
        expect(response.status.calledWith(201)).to.be.true;
      })

      it('retorna um JSON com o produto cadastrado', async () => {
        await ProductsController.create(request, response);
        expect(response.json.calledWith(productDB)).to.be.true;
      })
    })
  })

  describe('Ao chamar "getAll"', () => {
    const response = {};
    const request = {};
    const allProducts = {
      products: [
        { _id: '60cd2b9443dfec28a4a4241e', name: 'Tesoura', quantity: 2 },
        { _id: '60cd2b9443dfec28a4a7531d', name: 'Machado', quantity: 12 }
      ]
    }

    before(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      sinon.stub(ProductsModel, 'getAll').resolves([
        { _id: '60cd2b9443dfec28a4a4241e', name: 'Tesoura', quantity: 2 },
        { _id: '60cd2b9443dfec28a4a7531d', name: 'Machado', quantity: 12 }
      ]);
    })

    after(() => {
      ProductsModel.getAll.restore();
    })

    it('retorna o status "200"', async () => {
      await ProductsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })

    it('retorna um JSON com todos os produtos cadastrados', async () => {
      await ProductsController.getAll(request, response);
      expect(response.json.calledWith(allProducts)).to.be.true;
    })
  })

  describe('Ao chamar o "getById"', () => {
    describe('Quando informa um "ID" no formato inválido', () => {
      const response = {};
      const request = {};
      const errorJSON = {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }
      }
      before(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(ProductsModel, 'getById').rejects();
      })

      after(() => {
        ProductsModel.getById.restore();
      })

      it('retorna o status "422"', async () => {
        await ProductsController.getById(request, response);
        expect(response.status.calledWith(422)).to.be.true;
      })

      it('retorna o JSON de erro no formato correto', async () => {
        await ProductsController.getById(request, response);
        expect(response.json.calledWith(errorJSON)).to.be.true;
      })
    })

    describe('Quando informa um "id" válido', () => {
      const response = {};
      const request = {};
      const productDB = {
        _id: '69cd2b9443dfec28a4a9631c',
        name: 'Martelo',
        quantity: 2
      }

      before(() => {
        request.body = {};
        request.params = { id: '69cd2b9443dfec28a4a9631c'}
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(ProductsModel, 'getById').resolves(productDB);
      })

      after(() => {
        ProductsModel.getById.restore();
      })

      it('retorna o status "200"', async () => {
        await ProductsController.getById(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      })
      it('retorna o JSON com o produto encontrado', async () => {
        await ProductsController.getById(request, response);
        expect(response.json.calledWith(productDB)).to.be.true;
      })
    })

    describe('Quando não encontra nenhum produto com o "id" informado', () => {
      const response = {};
      const request = {};

      before(() => {
        request.body = {};
        request.params = { id: '69cd2b9443dfec28a4a9631c'}
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(ProductsModel, 'getById').resolves(null);
      })

      after(() => {
        ProductsModel.getById.restore();
      })

      it('retorna o status "404"', async () => {
        await ProductsController.getById(request, response);
        expect(response.status.calledWith(404)).to.be.true;
      })

      it('retorna o JSON com a mensagem "Product not found"', async () => {
        await ProductsController.getById(request, response);
        expect(response.json.calledWith({ message: 'Product not found'})).to.be.true;
      })
    })
  })


  describe('Ao chamar "update"', () => {
    describe('Ao passar dados no formato inválido', () => {
      const response = {};
      const request = {};
      const errorObj = {
        err: {
        code: 'invalid_data',
        message: 'Formato inválido'
      }}

      before(() => {
        request.body = { name: 'Tes', quantity: 0 };
        request.params = { id: '69cd2b9443dfec28a4a9631c'}
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(errorObj);
        sinon.stub(ProductsService, 'update').resolves({error: true, message: 'Formato inválido'});
      })

      after(() => {
        ProductsService.update.restore();
      })

      it('retorna o status "422"', async () => {
        await ProductsController.update(request, response);
        expect(response.status.calledWith(422)).to.be.true;
      })

      it('retorna um JSON com o formato correto', async () => {
        await ProductsController.update(request, response);
        expect(response.json.calledWith(errorObj)).to.be.true;
      })

    })

    describe('Quando informa dados válidos', () => {
      const response = {};
      const request = {};
      const updatedProduct = {
        _id: '69cd2b9443dfec28a4a9631c',
        name: 'Novo produto',
        quantity: 212
      }

      before(() => {
        request.body = { name: 'Novo produto', quantity: 212 };
        request.params = { id: '69cd2b9443dfec28a4a9631c'}
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(ProductsService, 'update').resolves(updatedProduct);
      })

      after(() => {
        ProductsService.update.restore();
      })

      it('retorna o status "200"', async () => {
        await ProductsController.update(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      })

      it('retorna um JSON com o novo produto cadastrado', async () => {
        await ProductsController.update(request, response);
        expect(response.json.calledWith(updatedProduct)).to.be.true;
      })
    })
  })


  describe('Ao chamar "exclude"', () => {
    describe('Quando o "id" informado não existe no DB', () => {
      const response = {};
      const request = {};
      const deletedProduct = {
        _id: '69cd2b9443dfec28a4a9631c',
        name: 'Novo produto',
        quantity: 212
      }

      before(() => {
        request.body = {};
        request.params = { id: '69cd2b9443dfec28a4a9631c'}
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns({message: 'Product not found'});
        sinon.stub(ProductsModel, 'exclude').resolves({ value: null });
      })

      after(() => {
        ProductsModel.exclude.restore();
      })

      it('retorna o status "422"', async () => {
        await ProductsController.exclude(request, response);
        expect(response.status.calledWith(422)).to.be.true;
      })

      it('retorna um JSON com o formato correto', async () => {
        await ProductsController.exclude(request, response);
        expect(response.json.calledWith({message: 'Product not found'})).to.be.true;
      })
    })

    describe('Quando o produto é deletado com sucesso', () => {
      const response = {};
      const request = {};
      const deletedProduct = {
        _id: '69cd2b9443dfec28a4a9631c',
        name: 'Novo produto',
        quantity: 212
      }

      before(() => {
        request.body = {};
        request.params = { id: '69cd2b9443dfec28a4a9631c'}
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(ProductsModel, 'exclude').resolves({ value: deletedProduct });
      })

      after(() => {
        ProductsModel.exclude.restore();
      })

      it('retorna o status "200"', async () => {
        await ProductsController.exclude(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      })

      it('retorna um JSON com o formato correto', async () => {
        await ProductsController.exclude(request, response);
        expect(response.json.calledWith(deletedProduct)).to.be.true;
      })
    })
  })
})


describe('Sales Controller', () => {
  describe('Ao chamar "create"', () => {
    describe('Quando informa dados em formato inválido', () => {
      const response = {};
      const request = {};

      const errorObj = {
        err: {
          code: 'invalid_data',
          message: 'Formato inválido'
        }
      }

      before(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(SalesService, 'create').rejects({
          code: 'invalid_data',
          message: 'Formato inválido',
          statusCode: 422
        });
      })

      after(() => {
        SalesService.create.restore();
      })

      it('retorna o status "422"', async () => {
        await SalesController.create(request, response);
        expect(response.status.calledWith(422)).to.be.true;
      })

      it('retorna um JSON com o formato correto', async () => {
        await SalesController.create(request, response);
        expect(response.json.calledWith(errorObj)).to.be.true;
      })
    })

    describe('Quando informa dados no formato válido', () => {
      const response = {};
      const request = {};
      const newSale = {
        _id: '69cd2b9443dfec28a4a9631c',
        itensSold: [
          { productId: '69cd2b9443ceec28a4a7462d', quantity: 2 },
          { productId: '60cd2b9443dfec28a4a4241e', quantity: 5 }
        ]
      }

      before(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(SalesService, 'create').resolves(newSale);
      })

      after(() => {
        SalesService.create.restore();
      })

      it('retorna o status "200"', async () => {
        await SalesController.create(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      })

      it('retorna um JSON com o formato correto', async () => {
        await SalesController.create(request, response);
        expect(response.json.calledWith(newSale)).to.be.true;
      })
    })
  })


  describe('Ao chamar "getAll"', () => {
    const response = {};
    const request = {};
    const allSales = {
      sales: [
        { _id: '60cd2b9443dfec28a4a4241e',
        itensSold: [{productId: '60cd2b9443dfec28a4a4241f', quantity: 2}] },
        { _id: '60cd2b9443dfec28a4a7531d',
        itensSold: [{productId:'60cd2b9443dfec28a4a7531c' , quantity: 12}] }
      ]
    }

    before(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      sinon.stub(SalesModel, 'getAll').resolves([
        { _id: '60cd2b9443dfec28a4a4241e',
        itensSold: [{productId: '60cd2b9443dfec28a4a4241f', quantity: 2}] },
        { _id: '60cd2b9443dfec28a4a7531d',
        itensSold: [{productId:'60cd2b9443dfec28a4a7531c' , quantity: 12}] }
      ]);
    })

    after(() => {
      SalesModel.getAll.restore();
    })

    it('retorna o status "200"', async () => {
      await SalesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })

    it('retorna um JSON com todos os produtos cadastrados', async () => {
      await SalesController.getAll(request, response);
      expect(response.json.calledWith(allSales)).to.be.true;
    })
  })







})
