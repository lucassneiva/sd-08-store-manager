const sinon = require('sinon');
const { expect } = require('chai');

const ProductsServices = require('../../services/Products');
const SalesServices = require('../../services/Sales');
const ProductsControllers = require('../../controllers/Products');
const SalesControllers = require('../../controllers/Sales');

const {
  PRODUCT,
  GET_ALL_PRODUCTS,
  VALID_PRODUCT_ID,
  INVALID_ID,
  SALE,
  GET_ALL_SALES,
  VALID_SALE_ID,
} = require('./constants');
const ALL_PRODUCTS = { products: GET_ALL_PRODUCTS };
const ALL_SALES = { sales: GET_ALL_SALES };
const ERROR = { err: { code: 'code', message: 'message' } };
const STOCK_ERROR = { err: { code: 'stock_problem', message: 'message' } };

describe('Testa o controller do Produto', () => {
  describe('Testa a função add', () => {
    const res = {};
    const req = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      ProductsServices.add.restore();
    });

    it('1 - Deve retornar o produto adicionado com sucesso com status 201', async () => {
      sinon.stub(ProductsServices, 'add').resolves(PRODUCT);
      req.body = {
        name: 'Bola de futebol',
        quantity: 10,
      };

      await ProductsControllers.add(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(PRODUCT)).to.be.equal(true);
    });

    it('2 - Deve retornar um erro com status 422 se houver um erro', async () => {
      sinon.stub(ProductsServices, 'add').resolves(ERROR);
      req.body = { name: 'Bola', quantity: 10 };

      await ProductsControllers.add(req, res);
      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(res.json.calledWith(ERROR)).to.be.equal(true);
    });
  });

  describe('Testa a função getAll', () => {
    const req = {};
    const res = {};

    it('3 - Deve retornar a lista de produtos com status 200', async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(ProductsServices, 'getAll').resolves(ALL_PRODUCTS);

      await ProductsControllers.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(ALL_PRODUCTS)).to.be.equal(true);

      ProductsServices.getAll.restore();
    });
  });

  describe('Testa a função getById', () => {
    const res = {};
    const req = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      ProductsServices.getById.restore();
    });

    it('4 - Deve retornar o produto com ID com status 200', async () => {
      req.params = { id: VALID_PRODUCT_ID };
      sinon.stub(ProductsServices, 'getById').resolves(PRODUCT);

      await ProductsControllers.getById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(PRODUCT)).to.be.equal(true);
    });

    it('5 - Deve retornar um erro com status 422 se houver um erro', async () => {
      req.params = { id: INVALID_ID };
      sinon.stub(ProductsServices, 'getById').resolves(ERROR);

      await ProductsControllers.getById(req, res);
      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(res.json.calledWith(ERROR)).to.be.equal(true);
    });
  });

  describe('Testa a função updateById', () => {
    const res = {};
    const req = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      ProductsServices.updateById.restore();
    });

    it('6 - Deve atualizar o produto com ID com status 200', async () => {
      req.params = { id: VALID_PRODUCT_ID };
      req.body = {
        name: 'Bola de futebol',
        quantity: 20,
      };
      const updatedProduct = { ...PRODUCT, quantity: 20 };
      sinon.stub(ProductsServices, 'updateById').resolves(updatedProduct);

      await ProductsControllers.updateById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(updatedProduct)).to.be.equal(true);
    });

    it('7 - Deve retornar um erro com status 422 se houver um erro', async () => {
      req.params = { id: INVALID_ID };
      req.body = {
        name: 'Bola de futebol',
        quantity: 20,
      };
      sinon.stub(ProductsServices, 'updateById').resolves(ERROR);

      await ProductsControllers.updateById(req, res);
      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(res.json.calledWith(ERROR)).to.be.equal(true);
    });
  });

  describe('Testa a função deleteById', () => {
    const res = {};
    const req = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      ProductsServices.deleteById.restore();
    });

    it('8 - Deve atualizar o produto com ID com status 200', async () => {
      req.params = { id: VALID_PRODUCT_ID };
      sinon.stub(ProductsServices, 'deleteById').resolves(PRODUCT);

      await ProductsControllers.deleteById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(PRODUCT)).to.be.equal(true);
    });

    it('9 - Deve retornar um erro com status 422 se houver um erro', async () => {
      req.params = { id: INVALID_ID };
      sinon.stub(ProductsServices, 'deleteById').resolves(ERROR);

      await ProductsControllers.deleteById(req, res);
      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(res.json.calledWith(ERROR)).to.be.equal(true);
    });
  });
});

describe('Testa o controller de Vendas', () => {
  describe('Testa a função add', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      SalesServices.add.restore();
    });

    it('10 - Deve retornar a venda criada com sucesso com status 200', async () => {
      sinon.stub(SalesServices, 'add').resolves(SALE);

      await SalesControllers.add(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(SALE)).to.be.equal(true);
    });

    it('11 - Deve retornar um erro com status 404 se houver um erro de estoque', async () => {
      req.body = [
        {
          productId: VALID_PRODUCT_ID,
          quantity: 3,
        },
      ];
      sinon.stub(SalesServices, 'add').resolves(STOCK_ERROR);

      await SalesControllers.add(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith(STOCK_ERROR)).to.be.equal(true);
    });

    it('12 - Deve retornar um erro com status 422 se houver um erro', async () => {
      req.body = [
        {
          productId: INVALID_ID,
          quantity: 3,
        },
      ];
      sinon.stub(SalesServices, 'add').resolves(ERROR);

      await SalesControllers.add(req, res);
      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(res.json.calledWith(ERROR)).to.be.equal(true);
    });
  });

  describe('Testa a função getAll', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      SalesServices.getAll.restore();
    });

    it('13 - Deve retornar a venda criada com sucesso com status 200', async () => {
      sinon.stub(SalesServices, 'getAll').resolves(ALL_SALES);

      await SalesControllers.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(ALL_SALES)).to.be.equal(true);
    });
  });

  describe('Testa a função getById', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      SalesServices.getById.restore();
    });

    it('14 - Deve retornar a venda por ID com sucesso com status 200', async () => {
      req.params = { id: VALID_SALE_ID };
      sinon.stub(SalesServices, 'getById').resolves(SALE);

      await SalesControllers.getById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(SALE)).to.be.equal(true);
    });

    it('15 - Deve retornar um erro com status 404 se houver um erro', async () => {
      req.body = [
        {
          productId: INVALID_ID,
          quantity: 3,
        },
      ];
      sinon.stub(SalesServices, 'getById').resolves(ERROR);

      await SalesControllers.getById(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith(ERROR)).to.be.equal(true);
    });
  });

  describe('Testa a função updateById', () => {
    const req = {};
    const res = {};
    const updateData = [
      {
        productId: '60beb13dd17ae2dec95b598f',
        quantity: 5,
      },
    ]

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      SalesServices.updateById.restore();
    });

    it('15 - Deve retornar a venda atualizada por ID com sucesso com status 200', async () => {
      req.params = { id: VALID_SALE_ID };
      req.body = updateData;
      const updatedSale = { ...SALE, itensSold: updateData };
      sinon.stub(SalesServices, 'updateById').resolves(updatedSale);

      await SalesControllers.updateById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(updatedSale)).to.be.equal(true);
    });

    it('16 - Deve retornar um erro com status 422 se houver um erro', async () => {
      req.params = { id: VALID_SALE_ID };
      req.body = updateData;
      sinon.stub(SalesServices, 'updateById').resolves(ERROR);

      await SalesControllers.updateById(req, res);
      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(res.json.calledWith(ERROR)).to.be.equal(true);
    });
  });

  describe('Testa a função deleteById', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      SalesServices.deleteById.restore();
    });

    it('17 - Deve retornar a venda deletada por ID com sucesso com status 200', async () => {
      req.params = { id: VALID_SALE_ID };
      sinon.stub(SalesServices, 'deleteById').resolves(SALE);

      await SalesControllers.deleteById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(SALE)).to.be.equal(true);
    });

    it('18 - Deve retornar um erro com status 422 se houver um erro', async () => {

      sinon.stub(SalesServices, 'deleteById').resolves(ERROR);

      await SalesControllers.deleteById(req, res);
      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(res.json.calledWith(ERROR)).to.be.equal(true);
    });
  });
});
