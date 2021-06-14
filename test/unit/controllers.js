const sinon = require('sinon');
const { expect } = require('chai');

const StoreService = require('../../services/storeService');
const StoreController = require('../../controllers/storeController');
const SalesService = require('../../services/salesService');
const SalesController = require('../../controllers/salesController');

const ID_VALID_1 = '5f43a7ca92d58904914656b6';
const NAME_VALID_1 = 'Produto do Batista';
const QUANTITY_VALID_1 = 100;

const ID_VALID_2 = '60c13544b7b98a438cb1e2cd';
const NAME_VALID_2 = 'Produto do Silva';
const QUANTITY_VALID_2 = 10;

const payloadProduct = {
  name: NAME_VALID_1,
  quantity: QUANTITY_VALID_1,
};

const productResult = {
  _id: ID_VALID_1,
  name: NAME_VALID_1,
  quantity: QUANTITY_VALID_1,
};

const productsResults = [
  { _id: ID_VALID_1, name: NAME_VALID_1, quantity: QUANTITY_VALID_1 },
  { _id: ID_VALID_2, name: NAME_VALID_2, quantity: QUANTITY_VALID_2 },
];

const payloadSales = [
  { _id: ID_VALID_1, quantity: QUANTITY_VALID_1 },
  { _id: ID_VALID_2, quantity: QUANTITY_VALID_2 },
];

const saleResult = {
  itensSold: payloadSales,
  _id: '60c6c65d71dfe53c7a466acd',
};

describe('Na camada CONTROLLERS', () => {
  describe('ao chamar CREATE para inserir um novo produto', () => {
    describe('quando o payload informado não é válido', () => {
      const response = {};
      const request = {};
      let next = {};
      const error = {
        isJoi: true,
        details: [{
          message: 'validate error JOI',
        }],
      };
  
      before(() => {
        request.body = {};
        next = sinon.stub().returns();
        sinon.stub(StoreService, 'create').resolves(error);
      });
  
      after(() => {
        StoreService.create.restore();
      });
  
      it('chama o método next com uma string', async () => {
        await StoreController.create(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('validate error JOI')).to.be.equal(true);
      });
    });
  
    describe('quando já existe um produto com mesmo nome', () => {
      const response = {};
      const request = {};
      let next = {};
      const error = {
        message: 'Product already exists',
      };
  
      before(() => {
        request.body = {};
        next = sinon.stub().returns();
        sinon.stub(StoreService, 'create').resolves(error);
      });
  
      after(() => {
        StoreService.create.restore();
      });
  
      it('chama o método next com a string de erro', async () => {
        await StoreController.create(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('Product already exists')).to.be.equal(true);
      });
    });
  
    describe('quando é inserido com sucesso', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = payloadProduct;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(StoreService, 'create').resolves(productResult);
      });
  
      after(() => {
        StoreService.create.restore();
      });
  
      it('é chamado o status com o código 201', async () => {
        await StoreController.create(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
  
      it('é chamado o json com objeto do produto adicionado', async () => {
        await StoreController.create(request, response);
        expect(response.json.calledWith(productResult)).to.be.equal(true);
      });
    });
  });

  describe('ao chamar GETALL para buscar todos os produtos', () => {
    describe('quando não é encontrado uma correspondência', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(StoreService, 'getAll').resolves([]);
      })
  
      after(() => {
        StoreService.getAll.restore();
      })
  
      it('é chamado o método "status" passando 200', async () => {
        await StoreController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um array vazia', async () => {
        await StoreController.getAll(request, response);
        expect(response.json.calledWith({ products: [] })).to.be.equal(true);
      });
    });
  
    describe('quando existe uma correspondência', () => {
      const response = {};
      const request = {};
  
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(StoreService, 'getAll').resolves(productsResults);
      })
  
      after(() => {
        StoreService.getAll.restore();
      })
  
      it('é chamado o método "status" passando o código 200', async () => {
        await StoreController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um array', async () => {
        await StoreController.getAll(request, response);
        expect(response.json.calledWith({ products: productsResults })).to.be.equal(true);
      });
    });
  });

  describe('ao chamar FINDBYID para buscar um produto específico', () => {
    describe('quando não é encontrado uma correspondência', () => {
      const response = {};
      const request = {};
      let next = {};
      const error = {
        message: 'Wrong id format',
      };
  
      before(() => {
        request.params = { id: ID_VALID_1 };
        next = sinon.stub().returns();
        sinon.stub(StoreService, 'findById').resolves(error);
      })
  
      after(() => {
        StoreService.findById.restore();
      })

      it('chama o método next com a string de erro', async () => {
        await StoreController.findById(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('Wrong id format')).to.be.equal(true);
      });
    });
  
    describe('quando existe uma correspondência', () => {
      const response = {};
      const request = {};

      before(() => {
        request.params = { id: ID_VALID_1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(StoreService, 'findById').resolves(productResult);
      })
  
      after(() => {
        StoreService.findById.restore();
      })
  
      it('é chamado o método "status" passando o código 200', async () => {
        await StoreController.findById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um objeto', async () => {
        await StoreController.findById(request, response);
        expect(response.json.calledWith(productResult)).to.be.equal(true);
      });
    });
  });

  describe('ao chamar UPDATEBYID para buscar um produto específico', () => {
    describe('quando não é encontrado uma correspondência', () => {
      const response = {};
      const request = {};
      let next = {};
      const error = { message: 'Wrong id format'};

      before(() => {
        request.params = { id: ID_VALID_1 };
        request.body = payloadProduct;
        next = sinon.stub().returns();
        sinon.stub(StoreService, 'updateById').resolves(error);
      })
  
      after(() => {
        StoreService.updateById.restore();
      })

      it('chama o método next com a string de erro', async () => {
        await StoreController.updateById(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('Wrong id format')).to.be.equal(true);
      });
    });

    describe('quando o payload informado não é válido', () => {
      const response = {};
      const request = {};
      let next = {};
      const error = {
        isJoi: true,
        details: [{
          message: 'validate error JOI',
        }],
      };
  
      before(() => {
        request.params = { id: ID_VALID_1 };
        request.body = payloadProduct;
        next = sinon.stub().returns();
        sinon.stub(StoreService, 'updateById').resolves(error);
      });
  
      after(() => {
        StoreService.updateById.restore();
      });
  
      it('chama o método next com objeto', async () => {
        await StoreController.updateById(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('validate error JOI')).to.be.equal(true);
      });
    });
  
    describe('quando existe uma correspondência', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.params = { id: ID_VALID_1 };
        request.body = payloadProduct;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(StoreService, 'updateById').resolves({ modifiedCount: 1 });
      })
  
      after(() => {
        StoreService.updateById.restore();
      })
  
      it('é chamado o método "status" passando o código 200', async () => {
        await StoreController.updateById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um objeto', async () => {
        await StoreController.updateById(request, response);
        expect(response.json.calledWith(productResult)).to.be.equal(true);
      });
    });
  });

  describe('ao chamar DELETEBYID para deletar um produto específico', () => {
    describe('quando não é encontrado uma correspondência', () => {
      const response = {};
      const request = {};
      let next = {};
      const error = {
        message: 'Wrong id format',
      };
  
      before(() => {
        request.params = { id: ID_VALID_1 };
        next = sinon.stub().returns();
        sinon.stub(StoreService, 'deleteById').resolves(error);
      })
  
      after(() => {
        StoreService.deleteById.restore();
      })

      it('chama o método next com a string de erro', async () => {
        await StoreController.deleteById(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('Wrong id format')).to.be.equal(true);
      });
    });
  
    describe('quando existe uma correspondência', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.params = { id: ID_VALID_1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(StoreService, 'deleteById').resolves(productResult);
      })
  
      after(() => {
        StoreService.deleteById.restore();
      })
  
      it('é chamado o método "status" passando o código 200', async () => {
        await StoreController.deleteById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um objeto', async () => {
        await StoreController.deleteById(request, response);
        expect(response.json.calledWith(productResult)).to.be.equal(true);
      });
    });
  });

  describe('ao chamar CREATE para cadastrar uma nova venda', () => {
    describe('quando o payload informado não é válido', () => {
      const response = {};
      const request = {};
      let next = {};
      const error = { message: 'Wrong product ID or invalid quantity' };
  
      before(() => {
        request.body = {};
        next = sinon.stub().returns();
        sinon.stub(SalesService, 'create').resolves(error);
      });
  
      after(() => {
        SalesService.create.restore();
      });
  
      it('chama o método next com objeto', async () => {
        await SalesController.create(request, response, next);
        expect(next.calledWith(error.message)).to.be.equal(true);
      });
    });
  
    describe('quando é inserido com sucesso', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = payloadSales;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(SalesService, 'create').resolves(saleResult);
      });
  
      after(() => {
        SalesService.create.restore();
      });
  
      it('é chamado o status com o código 200', async () => {
        await SalesController.create(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o json com objeto do produto adicionado', async () => {
        await SalesController.create(request, response);
        expect(response.json.calledWith(saleResult)).to.be.equal(true);
      });
    });
  });
});
