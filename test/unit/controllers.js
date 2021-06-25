const sinon = require('sinon');
const { expect } = require('chai');
const { ObjectId } = require('mongodb');

const ProductsService = require('../../services/productsServices');
const ProductsController = require('../../controllers/productsController');

const PRODUCT = {
  _id: ObjectId(),
  name: 'PlayStation',
  quantity: 10
};
const ERROR = {
  err: {
    code: 'code',
    message: 'message',
  }
};

describe('Testes para os controllers de produto', async () => {
  describe('/post - Teste para a função addProduct', async () => {
    const res = {};
    const req = {};

    before(() => {
      req.body = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    after(() => ProductsService.addProduct.restore());

    it('Deve retornar o produto criado com status 201', async () => {
      sinon.stub(ProductsService, 'addProduct').resolves(PRODUCT);
      req.body = {
        name: 'Ukulele',
        quantity: 20,
      };

      await ProductsController.post(req, res);
      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(res.json.calledWith(ERROR)).to.be.equal(true);
    });
  });
});
