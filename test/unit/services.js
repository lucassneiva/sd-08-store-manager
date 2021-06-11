const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModels = require('../../models/Products');
const SalesModels = require('../../models/Sales');
const ProductsServices = require('../../services/Products');
const SalesServices = require('../../services/Sales');

const {
  PRODUCT,
  OTHER_PRODUCT,
  GET_ALL_PRODUCTS,
  SALE,
  GET_ALL_SALES,
  VALID_PRODUCT_ID,
  VALID_SALE_ID,
  INVALID_ID,
  NOT_FOUND,
  INVALID_DATA,
  STOCK_PROBLEM,
  INVALID_NAME,
  INVALID_QNT,
  INVALID_QNT_FORMAT,
  INVALID_QNT_SOLD,
  INVALID_ID_MESSAGE,
  INVALID_SALE_ID_MESSAGE,
  PRODUCT_EXISTS,
  SALE_NOT_FOUND,
  WRONG_SALE_DATA,
} = require('./constants');

describe('Testa o services do Produto', () => {
  describe('Testa a função add', () => {
    beforeEach(() => {
      sinon.stub(ProductsModels, 'add').resolves(PRODUCT);
    });

    afterEach(() => {
      ProductsModels.add.restore();
    });

    it('1 - Deve adicionar um produto com sucesso e retornar um objeto com chaves "_id", "name" e "quantity"', async () => {
      const payloadProduct = { name: 'Bola de futebol', quantity: 10 };
      const response = await ProductsServices.add(payloadProduct);
      expect(response).to.be.a('object');
      expect(response).to.have.property('_id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });

    it('2 - Deve retornar um objeto de erro se o nome do produto não for uma string ou se tiver menos que 5 caracteres', async () => {
      const payload1 = { name: 'Bola', quantity: 10 };
      const response1 = await ProductsServices.add(payload1);
      const {
        err: { code: code1, message: message1 },
      } = response1;
      expect(response1).to.be.a('object');
      expect(code1).to.be.equal(INVALID_DATA);
      expect(message1).to.be.equal(INVALID_NAME);

      const payload2 = { name: 1234, quantity: 10 };
      const response2 = await ProductsServices.add(payload2);
      const {
        err: { code: code2, message: message2 },
      } = response2;
      expect(response2).to.be.a('object');
      expect(code2).to.be.equal(INVALID_DATA);
      expect(message2).to.be.equal(INVALID_NAME);
    });

    it('3 - Deve retornar um objeto de erro se a quantidade do produto for menor ou igual a zero', async () => {
      const payload1 = { name: 'Bola de futebol', quantity: 0 };
      const response1 = await ProductsServices.add(payload1);
      const {
        err: { code: code1, message: message1 },
      } = response1;
      expect(response1).to.be.a('object');
      expect(code1).to.be.equal(INVALID_DATA);
      expect(message1).to.be.equal(INVALID_QNT);

      const payload2 = { name: 'Bola de futebol', quantity: -1 };
      const response2 = await ProductsServices.add(payload2);
      const {
        err: { code: code2, message: message2 },
      } = response2;
      expect(response2).to.be.a('object');
      expect(code2).to.be.equal(INVALID_DATA);
      expect(message2).to.be.equal(INVALID_QNT);
    });

    it('4 - Deve retornar um objeto de erro se a quantidade do produto não for um número', async () => {
      const payload = { name: 'Bola de futebol', quantity: 'string' };
      const response = await ProductsServices.add(payload);
      const {
        err: { code, message },
      } = response;
      expect(response).to.be.a('object');
      expect(code).to.be.equal(INVALID_DATA);
      expect(message).to.be.equal(INVALID_QNT_FORMAT);
    });

    it('5 - Deve retornar um objeto de erro se o produto já estiver cadastrado', async () => {
      sinon.stub(ProductsModels, 'findProduct').resolves(OTHER_PRODUCT);
      const payload = { name: 'Bola de beisebol', quantity: 10 };
      const response = await ProductsServices.add(payload);
      const {
        err: { code, message },
      } = response;
      expect(response).to.be.a('object');
      expect(code).to.be.equal(INVALID_DATA);
      expect(message).to.be.equal(PRODUCT_EXISTS);
      ProductsModels.findProduct.restore();
    });
  });

  describe('Testa a função getAll', () => {
    it('6 - Deve listar todos os produtos', async () => {
      sinon.stub(ProductsModels, 'getAll').resolves(GET_ALL_PRODUCTS);
      const response = await ProductsServices.getAll();
      const { products } = response;

      expect(response).to.be.a('object');
      expect(response).to.have.property('products');
      expect(products).to.have.length(1);
      products.forEach((product) => {
        expect(product).to.have.property('_id');
        expect(product).to.have.property('name');
        expect(product).to.have.property('quantity');
      });
      ProductsModels.getAll.restore();
    });
  });

  describe('Testa a função getById', () => {
    beforeEach(() => {
      sinon.stub(ProductsModels, 'getById').resolves(PRODUCT);
    });

    afterEach(() => {
      ProductsModels.getById.restore();
    });

    it('7 - Deve buscar um produto pelo ID com sucesso retornando um objeto com "_id", "name" e "quantity"', async () => {
      const response = await ProductsServices.getById(VALID_PRODUCT_ID);

      expect(response).to.be.a('object');
      expect(response).to.have.property('_id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });

    it('8 - Deve retornar um objeto de erro se o ID passado for inválido', async () => {
      const response = await ProductsServices.getById(INVALID_ID);
      const {
        err: { code, message },
      } = response;
      expect(code).to.be.equal(INVALID_DATA);
      expect(message).to.be.equal(INVALID_ID_MESSAGE);
    });
  });

  describe('Testa a função updateById', () => {
    it('9 - Deve atualizar um produto pelo ID', async () => {
      const { quantity: oldQnt } = PRODUCT;
      const updatedProduct = await ProductsServices.updateById(VALID_PRODUCT_ID, {
        name: 'Bola de futebol',
        quantity: 30,
      });
      const { quantity: newQnt } = updatedProduct;
      expect(newQnt).not.to.be.equal(oldQnt);
      expect(newQnt).not.to.be.equal(undefined);
    });

    it('10 - Deve retornar um objeto de erro se o nome do produto não for uma string ou se tiver menos que 5 caracteres', async () => {
      const payload1 = { name: 'Bola', quantity: 10 };
      const response1 = await ProductsServices.updateById(VALID_PRODUCT_ID, payload1);
      const {
        err: { code: code1, message: message1 },
      } = response1;
      expect(response1).to.be.a('object');
      expect(code1).to.be.equal(INVALID_DATA);
      expect(message1).to.be.equal(INVALID_NAME);

      const payload2 = { name: 1234, quantity: 10 };
      const response2 = await ProductsServices.updateById(VALID_PRODUCT_ID, payload2);
      const {
        err: { code: code2, message: message2 },
      } = response2;
      expect(response2).to.be.a('object');
      expect(code2).to.be.equal(INVALID_DATA);
      expect(message2).to.be.equal(INVALID_NAME);
    });

    it('11 - Deve retornar um objeto de erro se a quantidade do produto for menor ou igual a zero', async () => {
      const payload1 = { name: 'Bola de futebol', quantity: 0 };
      const response1 = await ProductsServices.updateById(VALID_PRODUCT_ID, payload1);
      const {
        err: { code: code1, message: message1 },
      } = response1;
      expect(response1).to.be.a('object');
      expect(code1).to.be.equal(INVALID_DATA);
      expect(message1).to.be.equal(INVALID_QNT);

      const payload2 = { name: 'Bola de futebol', quantity: -1 };
      const response2 = await ProductsServices.updateById(VALID_PRODUCT_ID, payload2);
      const {
        err: { code: code2, message: message2 },
      } = response2;
      expect(response2).to.be.a('object');
      expect(code2).to.be.equal(INVALID_DATA);
      expect(message2).to.be.equal(INVALID_QNT);
    });

    it('12 - Deve retornar um objeto de erro se a quantidade do produto não for um número', async () => {
      const payload = { name: 'Bola de futebol', quantity: 'string' };
      const response = await ProductsServices.updateById(VALID_PRODUCT_ID, payload);
      const {
        err: { code, message },
      } = response;
      expect(response).to.be.a('object');
      expect(code).to.be.equal(INVALID_DATA);
      expect(message).to.be.equal(INVALID_QNT_FORMAT);
    });

    it('13 - Deve retornar um objeto de erro se o ID estiver no formato errado', async () => {
      const payload = { name: 'Bola de futebol', quantity: 10 };
      const response = await ProductsServices.updateById(INVALID_ID, payload);
      const {
        err: { code, message },
      } = response;
      expect(response).to.be.a('object');
      expect(code).to.be.equal(INVALID_DATA);
      expect(message).to.be.equal(INVALID_ID_MESSAGE);
    });
  });

  describe('Testa a função deleteById', () => {
    beforeEach(() => {
      sinon.stub(ProductsModels, 'getById').resolves(PRODUCT);
    });

    afterEach(() => {
      ProductsModels.getById.restore();
    });

    it('14 - Deve apagar um produto pelo ID', async () => {
      const response = await ProductsServices.deleteById(VALID_PRODUCT_ID);
      expect(response).to.be.a('object');
      expect(response).to.have.property('_id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });

    it('15 - Deve retornar um objeto de erro se o ID passado for inválido', async () => {
      const response = await ProductsServices.deleteById(INVALID_ID);
      const {
        err: { code, message },
      } = response;
      expect(code).to.be.equal(INVALID_DATA);
      expect(message).to.be.equal(INVALID_ID_MESSAGE);
    });
  });
});

describe('Testa o services das Vendas', () => {
  describe('Testa a função add', () => {
    beforeEach(() => {
      sinon.stub(SalesModels, 'add').resolves(SALE);
      sinon.stub(ProductsModels, 'getById').resolves(PRODUCT);
      sinon.stub(ProductsModels, 'getAll').resolves(GET_ALL_PRODUCTS);
      sinon.stub(ProductsModels, 'updateById').resolves({});
    });

    afterEach(() => {
      SalesModels.add.restore();
      ProductsModels.getById.restore();
      ProductsModels.getAll.restore();
      ProductsModels.updateById.restore();
    });

    it('16 - Deve adicionar uma venda com sucesso e retornar um objeto com chaves "_id", "name" e "quantity"', async () => {
      const payloadSale = [{ productId: '60beb13dd17ae2dec95b598f', quantity: 10 }];
      const response = await SalesServices.add(payloadSale);
      expect(response).to.be.an('object');
      expect(response).to.have.property('_id');
      expect(response).to.have.property('itensSold');
    });

    it('17 - Deve retornar um objeto de erro se a quantidade de produtos vendidos for maior ou igual a quantidade em estoque', async () => {
      const payloadSale = [{ productId: '60beb13dd17ae2dec95b598f', quantity: 20 }];
      const response = await SalesServices.add(payloadSale);
      const {
        err: { code, message },
      } = response;
      expect(response).to.be.a('object');
      expect(code).to.be.equal(STOCK_PROBLEM);
      expect(message).to.be.equal(INVALID_QNT_SOLD);
    });

    it('18 - Deve retornar um objeto de erro se for passado um ID inválido', async () => {
      const payloadSale = [{ productId: '60c28e583707a02186b8ce02', quantity: 2 }];
      const response = await SalesServices.add(payloadSale);
      const {
        err: { code, message },
      } = response;
      expect(response).to.be.a('object');
      expect(code).to.be.equal(INVALID_DATA);
      expect(message).to.be.equal(WRONG_SALE_DATA);
    });

    it('19 - Deve retornar um objeto de erro se for passado uma quantidade menor ou igual a zero', async () => {
      const payloadSale = [{ productId: '60beb13dd17ae2dec95b598f', quantity: 0 }];
      const response = await SalesServices.add(payloadSale);
      const {
        err: { code, message },
      } = response;
      expect(response).to.be.a('object');
      expect(code).to.be.equal(INVALID_DATA);
      expect(message).to.be.equal(WRONG_SALE_DATA);
    });

    it('20 - Deve retornar um objeto de erro se não for passado um número inteiro como quantidade', async () => {
      const payloadSale = [{ productId: '60c28e583707a02186b8ce02', quantity: 'dois' }];
      const response = await SalesServices.add(payloadSale);
      const {
        err: { code, message },
      } = response;
      expect(response).to.be.a('object');
      expect(code).to.be.equal(INVALID_DATA);
      expect(message).to.be.equal(WRONG_SALE_DATA);
    });
  });

  describe('Testa a função getAll', () => {
    it('21 - Deve listar todas as vendas', async () => {
      sinon.stub(SalesModels, 'getAll').resolves(GET_ALL_SALES);
      const response = await SalesServices.getAll();
      const { sales } = response;

      expect(response).to.be.an('object');
      expect(response).to.have.property('sales');
      expect(sales).to.have.length(1);
      sales.forEach((product) => {
        expect(product).to.have.property('_id');
        expect(product).to.have.property('itensSold');
      });
      SalesModels.getAll.restore();
    });
  });

  describe('Testa a função getById', () => {
    afterEach(() => {
      SalesModels.getById.restore();
    });

    it('22 - Deve buscar um produto pelo ID com sucesso retornando um objeto com "_id"e "itensSold"', async () => {
      sinon.stub(SalesModels, 'getById').resolves(SALE);
      const response = await SalesServices.getById(VALID_SALE_ID);

      expect(response).to.be.a('object');
      expect(response).to.have.property('_id');
      expect(response).to.have.property('itensSold');
    });

    it('23 - Deve retornar um objeto de erro se o ID passado for inválido', async () => {
      sinon.stub(SalesModels, 'getById').resolves(undefined);
      const response = await SalesServices.getById(INVALID_ID);
      const {
        err: { code, message },
      } = response;
      expect(code).to.be.equal(NOT_FOUND);
      expect(message).to.be.equal(SALE_NOT_FOUND);
    });

    it('24 - Deve retornar um objeto de erro se o ID passado não existir', async () => {
      sinon.stub(SalesModels, 'getById').resolves(undefined);
      const response = await SalesServices.getById('60b6f3afb16f873447e04cf3');
      const {
        err: { code, message },
      } = response;
      expect(code).to.be.equal(NOT_FOUND);
      expect(message).to.be.equal(SALE_NOT_FOUND);
    });
  });

  describe('Testa a função updateById', () => {
    beforeEach(() => {
      sinon.stub(SalesModels, 'updateById').resolves({});
      sinon.stub(ProductsModels, 'getAll').resolves(GET_ALL_PRODUCTS);
      sinon.stub(ProductsModels, 'getById').resolves(PRODUCT);
      sinon.stub(ProductsModels, 'updateById').resolves({});
    });

    afterEach(() => {
      SalesModels.updateById.restore();
      ProductsModels.getAll.restore();
      ProductsModels.getById.restore();
      ProductsModels.updateById.restore();
    });

    it('25 - Deve atualizar uma venda pelo ID', async () => {
      const salePayload = [{ productId: '60beb13dd17ae2dec95b598f', quantity: 2 }];
      const { _id: saleId, itensSold } = await SalesServices.updateById(VALID_SALE_ID, salePayload);
      expect(saleId).to.be.equal(VALID_SALE_ID);
      expect(itensSold).not.to.have.members(SALE.itensSold);
    });

    it('26 - Deve retornar um objeto de erro se a quantidade de produtos vendidos for maior ou igual a quantidade em estoque', async () => {
      const payloadSale = [{ productId: '60beb13dd17ae2dec95b598f', quantity: 40 }];
      const response = await SalesServices.updateById(VALID_SALE_ID, payloadSale);
      const {
        err: { code, message },
      } = response;
      expect(response).to.be.a('object');
      expect(code).to.be.equal(STOCK_PROBLEM);
      expect(message).to.be.equal(INVALID_QNT_SOLD);
    });

    it('27 - Deve retornar um objeto de erro se for passado um ID inválido', async () => {
      const payloadSale = [{ productId: '60c28e583707a02186b8ce02', quantity: 2 }];
      const response = await SalesServices.updateById(VALID_SALE_ID, payloadSale);
      const {
        err: { code, message },
      } = response;
      expect(response).to.be.a('object');
      expect(code).to.be.equal(INVALID_DATA);
      expect(message).to.be.equal(WRONG_SALE_DATA);
    });

    it('28 - Deve retornar um objeto de erro se for passado uma quantidade menor ou igual a zero', async () => {
      const payloadSale = [{ productId: '60beb13dd17ae2dec95b598f', quantity: 0 }];
      const response = await SalesServices.updateById(VALID_SALE_ID, payloadSale);
      const {
        err: { code, message },
      } = response;
      expect(response).to.be.a('object');
      expect(code).to.be.equal(INVALID_DATA);
      expect(message).to.be.equal(WRONG_SALE_DATA);
    });

    it('29 - Deve retornar um objeto de erro se não for passado um número inteiro como quantidade', async () => {
      const payloadSale = [{ productId: '60c28e583707a02186b8ce02', quantity: 'dois' }];
      const response = await SalesServices.updateById(VALID_SALE_ID, payloadSale);
      const {
        err: { code, message },
      } = response;
      expect(response).to.be.a('object');
      expect(code).to.be.equal(INVALID_DATA);
      expect(message).to.be.equal(WRONG_SALE_DATA);
    });
  });

  describe('Testa a função deleteById', () => {
    beforeEach(() => {
      sinon.stub(SalesModels, 'getById').resolves(SALE);
      sinon.stub(SalesModels, 'deleteById').resolves({});
      sinon.stub(ProductsModels, 'getAll').resolves(GET_ALL_PRODUCTS);
      sinon.stub(ProductsModels, 'getById').resolves(PRODUCT);
      sinon.stub(ProductsModels, 'updateById').resolves({});
    });

    afterEach(() => {
      SalesModels.getById.restore();
      SalesModels.deleteById.restore();
      ProductsModels.getAll.restore();
      ProductsModels.getById.restore();
      ProductsModels.updateById.restore();
    });

    it('30 - Deve apagar um produto pelo ID', async () => {
      const response = await SalesServices.deleteById(VALID_SALE_ID);
      expect(response).to.be.a('object');
      expect(response).to.have.property('_id');
      expect(response).to.have.property('itensSold');
    });

    it('31 - Deve retornar um objeto de erro se o ID passado for inválido', async () => {
      const response = await SalesServices.deleteById(INVALID_ID);
      const {
        err: { code, message },
      } = response;
      expect(code).to.be.equal(INVALID_DATA);
      expect(message).to.be.equal(INVALID_SALE_ID_MESSAGE);
    });
  });
});
