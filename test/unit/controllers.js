const sinon = require('sinon');
const { expect } = require('chai');

const StoreService = require('../../services/storeService');
const StoreController = require('../../controllers/storeController');

describe('Na camada CONTROLLERS', () => {
  describe('ao chamar CREATE para inserir um novo produto', () => {
    describe('quando o payload informado não é válido', async () => {
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
  
      it('chama o método next com objeto', async () => {
        await StoreController.create(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('validate error JOI')).to.be.equal(true);
      });
    });
  
    describe('quando já existe um produto com mesmo nome', async () => {
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
  
    describe('quando é inserido com sucesso', async () => {
      const response = {};
      const request = {};
      const ID_EXAMPLE = '5f43a7ca92d58904914656b6';
      const payloadProduct = {
        name: 'Produto do Batista',
        quantity: 100,
      };
  
      before(() => {
        request.body = payloadProduct;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(StoreService, 'create')
          .resolves({ _id: ID_EXAMPLE, ...payloadProduct });
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
  
        expect(response.json.calledWith({ _id: ID_EXAMPLE, ...payloadProduct })).to.be.equal(true);
      });
    });
  });

  describe('ao chamar GETALL para buscar todos os produtos', () => {
    describe('quando não é encontrado uma correspondência', async () => {
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
  
    describe('quando existe uma correspondência', async () => {
      const response = {};
      const request = {};

      const payloadProduct = [
        {
          _id: '60c13544b7b98a438cb1e2cc',
          name: 'Produto do Batista',
          quantity: 10
        },
        {
          _id: '60c13544b7b98a438cb1e2cd',
          name: 'Produto Silva',
          quantity: 10
        },
      ];
  
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(StoreService, 'getAll').resolves(payloadProduct );
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
        expect(response.json.calledWith({ products: payloadProduct })).to.be.equal(true);
      });
    });
  });

  describe('ao chamar FINDBYID para buscar um produto específico', async () => {
    describe('quando não é encontrado uma correspondência', async () => {
      const response = {};
      const request = {};
      const ID_EXAMPLE = '5f43a7ca92d58904914656b6'
      let next = {};
      const error = {
        message: 'Wrong id format',
      };
  
      before(() => {
        request.params = { id: ID_EXAMPLE };
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
  
    describe('quando existe uma correspondência', async () => {
      const response = {};
      const request = {};
      const ID_EXAMPLE = '5f43a7ca92d58904914656b6'
      const payloadProduct = {
        name: 'Produto do Batista',
        quantity: 100,
      };
  
      before(() => {
        request.params = { id: ID_EXAMPLE };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(StoreService, 'findById').resolves({ _id: ID_EXAMPLE, ...payloadProduct });
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
        expect(response.json.calledWith({ _id: ID_EXAMPLE, ...payloadProduct })).to.be.equal(true);
      });
    });
  });

  describe('ao chamar UPDATEBYID para buscar um produto específico', async () => {
    describe('quando não é encontrado uma correspondência', async () => {
      const response = {};
      const request = {};
      let next = {};
      const error = { message: 'Wrong id format'};
      const ID_EXAMPLE = '5f43a7ca92d58904914656b6';
      const payloadProduct = {
        name: 'Produto do Batista',
        quantity: 100,
      };
  
      before(() => {
        request.params = { id: ID_EXAMPLE };
        request.body = { ...payloadProduct }
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

    describe('quando o payload informado não é válido', async () => {
      const response = {};
      const request = {};
      let next = {};
      const error = {
        isJoi: true,
        details: [{
          message: 'validate error JOI',
        }],
      };
      const ID_EXAMPLE = '5f43a7ca92d58904914656b6';
      const payloadProduct = {
        name: 'Produto do Batista',
        quantity: 100,
      };
  
      before(() => {
        request.params = { id: ID_EXAMPLE };
        request.body = { ...payloadProduct }
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
  
    describe('quando existe uma correspondência', async () => {
      const response = {};
      const request = {};
      const ID_EXAMPLE = '5f43a7ca92d58904914656b6'
      const payloadProduct = {
        name: 'Produto do Batista',
        quantity: 100,
      };
  
      before(() => {
        request.params = { id: ID_EXAMPLE };
        request.body = { ...payloadProduct }
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
        expect(response.json.calledWith({ _id: ID_EXAMPLE, ...payloadProduct })).to.be.equal(true);
      });
    });
  });




  describe('ao chamar DELETEBYID para deletar um produto específico', async () => {
    describe('quando não é encontrado uma correspondência', async () => {
      const response = {};
      const request = {};
      const ID_EXAMPLE = '5f43a7ca92d58904914656b6'
      let next = {};
      const error = {
        message: 'Wrong id format',
      };
  
      before(() => {
        request.params = { id: ID_EXAMPLE };
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
  
    describe('quando existe uma correspondência', async () => {
      const response = {};
      const request = {};
      const ID_EXAMPLE = '5f43a7ca92d58904914656b6'
      const payloadProduct = {
        name: 'Produto do Batista',
        quantity: 100,
      };
  
      before(() => {
        request.params = { id: ID_EXAMPLE };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(StoreService, 'deleteById').resolves({ _id: ID_EXAMPLE, ...payloadProduct });
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
        expect(response.json.calledWith({ _id: ID_EXAMPLE, ...payloadProduct })).to.be.equal(true);
      });
    });
  });
});
