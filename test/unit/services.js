const sinon = require('sinon');
const { expect } = require('chai');
const { ObjectId } = require('mongodb');

const ProductsModel = require('../../models/productsModels');
const SalesModel = require('../../models/salesModels');

const ProductsService = require('../../services/productsServices');
const SalesServices = require('../../services/salesServices');

const PRODUCT = {
  _id: ObjectId(),
  name: 'PlayStation',
  quantity: 10
};

const SALE = {
  _id: ObjectId(),
  itensSold: {
    productId: ObjectId(),
    quantity: 100
  }
};

describe('Testes para os services de produtos', () => {
  describe('addProduct - Verificar se é possível adicionar um produto', () => {
    before(() => {
      sinon.stub(ProductsModel, 'addProduct').resolves(PRODUCT);
    });

    after(() => {
      ProductsModel.addProduct.restore();
    });

    it('Ao adicionar um produto com sucesso, deve retornar um objeto com as chaves "_id", "name" e "quantity"', async () => {
      const { name, quantity } = PRODUCT;
      const response = await ProductsService.addProduct(name, quantity);

      expect(response).to.be.an('object');
      expect(response).to.have.property('_id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });

    it('Deve retornar um objeto de erro caso name não seja uma string ou tenha menos de 05 caracteres', async () => {
      const nameCode = 'invalid_data';
      const nameMessage = '"name" length must be at least 5 characters long';
      const payloadProduct1 = { name: 'Bag', quantity: 10 };
      const response1 = await ProductsService.addProduct(payloadProduct1);

      expect(response1).to.be.an('object');
      expect(response1.err.code).to.be.equal(nameCode);
      expect(response1.err.message).to.be.equal(nameMessage);

      const payloadProduct2 = { name: 100, quantity: 10 };
      const response2 = await ProductsService.addProduct(payloadProduct2);

      expect(response2).to.be.an('object');
      expect(response2.err.code).to.be.equal(nameCode);
      expect(response2.err.message).to.be.equal(nameMessage);
    });

    /* it('Deve retornar um objeto de erro caso quantity não seja um number', async () => {
      const payloadProduct = { name: 'New Product', quantity: 'one' };
      const response = await ProductsService.addProduct(payloadProduct);

      expect(response).to.be.an('object');
      expect(response.err.code).to.be.equal('invalid_data');
      expect(response.err.message).to.be.equal('"quantity" must be a number');
    }); */

    /* it('Deve retornar um objeto de erro caso quantity seja menor ou igual a zero', async () => {
      const payloadProduct1 = { name: 'New Product', quantity: 0 };
      const response1 = await ProductsService.addProduct(payloadProduct1);

      expect(response1).to.be.an('object');
      expect(response1.err.code).to.be.equal('invalid_data');
      expect(response1.err.message).to.be.equal('"quantity" must be larger than or equal to 1');

      const payloadProduct2 = { name: 'Other Product', quantity: -1 };
      const response2 = await ProductsService.addProduct(payloadProduct2);

      expect(response2).to.be.an('object');
      expect(response2.err.code).to.be.equal('invalid_data');
      expect(response2.err.message).to.be.equal('"quantity" must be larger than or equal to 1');
    }); */

  });

  describe('getAllProducts - Verificar se retorna todos os produtos cadastrados', async () => {
    it('Deve listar todos os produtos', async () => {
      sinon.stub(ProductsModel, 'getAllProducts').resolves(PRODUCT);
      const response = await ProductsService.getAllProducts();

      expect(response).to.be.an('object');
      expect(response).to.have.property('products');
      expect(response.products).to.have.property('_id');
      expect(response.products).to.have.property('name');
      expect(response.products).to.have.property('quantity');
    });
  });

  describe('getProductById - Verificar se retorna um produto pelo seu ID', async () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'getProductById').resolves(PRODUCT);
    });

    afterEach(() => {
      ProductsModel.getProductById.restore();
    });

    it('Deve listar um produto pelo seu ID e retornar um objeto com as chaves "_id", "name" e "quantity"', async () => {
      const response = await ProductsService.getProductById(PRODUCT._id);

      expect(response).to.be.an('object');
      expect(response).to.have.property('_id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });

    it('Deve retornar um objeto de erro caso seja um ID inválido', async () => {
      const payloadProductID = '123546';
      const response = await ProductsService.getProductById(payloadProductID);

      expect(response).to.be.an('object');
      expect(response.err.code).to.be.equal('invalid_data');
      expect(response.err.message).to.be.equal('Wrong id format');
    });
  });

  describe('updateProduct - Verificar se atualiza um produto', async () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'updateProduct').resolves(PRODUCT);
    });

    afterEach(() => {
      ProductsModel.updateProduct.restore();
    });

    it('Deve retornar um objeto de erro caso quantity seja uma string', async () => {
      const resolve = await ProductsService.updateProduct(PRODUCT._id, PRODUCT.name, {
        quantity: 'ten'
      });

      expect(resolve).to.be.an('object');
      expect(resolve.err.code).to.be.equal('invalid_data');
      expect(resolve.err.message).to.be.equal('"quantity" must be a number');
    });
  });

  describe('deleteProduct - Verificar se é possível deletar um produto', async () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'deleteProduct').resolves(PRODUCT);
    });

    afterEach(() => {
      ProductsModel.deleteProduct.restore();
    });

    it('Quando removido com sucesso, deve retornar um objeto com o produto deletado', async () => {
      const response = await ProductsService.deleteProduct(PRODUCT._id);

      expect(response).to.be.an('object');
    });

    it('Quando não for possível deletar um produto', async () => {
      const payloadProductID = '123546';
      const response = await ProductsService.deleteProduct(payloadProductID);

      expect(response).to.be.an('object');
      expect(response.err.code).to.be.equal('invalid_data');
      expect(response.err.message).to.be.equal('Wrong id format');
    });
  });
});

describe('Testes para os services de sales', async () => {
  describe('addSale - Varificar se é possível adicionar uma venda', async () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'addSale').resolves(SALE);
      sinon.stub(ProductsModel, 'getProductById').resolves(PRODUCT);
      sinon.stub(ProductsModel, 'updateProduct').resolves({});
    });
    afterEach(() => {
      SalesModel.addSale.restore();
      ProductsModel.getProductById.restore();
      ProductsModel.updateProduct.restore();
    });

    it('Adicionar uma venda com sucesso deve retornar um objeto com as chaves "_id" e "itensSold"', async () => {
      const payloadSale = [{ productId: ObjectId(), quantity: 10 }];
      const resolve = await SalesServices.addSale(payloadSale);

      expect(resolve).to.be.an('object');
      expect(resolve).to.have.property('_id');
      expect(resolve).to.have.property('itensSold');
    });

    it('Deve retornar um objeto de erro caso quantity seja uma string', async () => {
      const payloadSale = [{ productId: ObjectId(), quantity: 'ten' }];
      const resolve = await SalesServices.addSale(payloadSale);

      expect(resolve).to.be.an('object');
      expect(resolve.err.code).to.be.equal('invalid_data');
      expect(resolve.err.message).to.be.equal('Wrong product ID or invalid quantity');
    });

    it('Deve retornar um objeto de erro caso a quantidade em estoque não atenda a venda', async () => {
      const payloadSale = [{ productId: ObjectId(), quantity: 1000 }];
      const resolve = await SalesServices.addSale(payloadSale);

      expect(resolve).to.be.an('object');
      expect(resolve.err.code).to.be.equal('stock_problem');
      expect(resolve.err.message).to.be.equal('Such amount is not permitted to sell');
    });
  });

  describe('getAllSales - Deve listar todas as vendas cadastradas', async () => {
    before(() => {
      sinon.stub(SalesModel, 'getAllSales').resolves(SALE);
    });
    after(() => SalesModel.getAllSales.restore());

    it('Deve retornar um objeto com todas as vendas cadastradas', async () => {
      const response = await SalesServices.getAllSales();

      expect(response).to.be.an('object');
      expect(response).to.have.property('sales');
      expect(response.sales).to.have.property('_id');
      expect(response.sales).to.have.property('itensSold');
    });
  });

  describe('getSaleById - Deve listar uma venda pelo seu ID', async () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'getSaleById').resolves(SALE);
    });
    afterEach(() => {
      SalesModel.getSaleById.restore();
    });

    it('Buscar venda pelo seu ID e deve retornar um objeto com as chaves "_id" e "itensSold"', async () => {
      const response = await SalesServices.getSaleById(SALE._id);

      expect(response).to.be.an('object');
      expect(response).to.have.property('_id');
      expect(response).to.have.property('itensSold');
    });

    it('Deve retornar um objeto de erro caso o ID seja inválido/não existente', async () => {
      const saleId = '123456';
      const response = await SalesServices.getSaleById(saleId);

      expect(response).to.be.an('object');
      expect(response.err.code).to.be.equal('not_found');
      expect(response.err.message).to.be.equal('Sale not found');
    });
  });

  describe('updateSale - Deve atualizar uma venda pelo seu ID', async () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'updateSale').resolves({});
      sinon.stub(ProductsModel, 'getProductById').resolves(PRODUCT);
      sinon.stub(ProductsModel, 'updateProduct').resolves({});
    });
    afterEach(() => {
      SalesModel.updateSale.restore();
      ProductsModel.getProductById.restore();
      ProductsModel.updateProduct.restore();
    });

    it('Se atualizar uma venda com sucesso, deve retornar um objeto com as chaves "_id" e "itensSold"', async () => {
      const payloadSale = [{ productId: ObjectId(), quantity: 10 }];
      const resolve = await SalesServices.updateSale(SALE._id, payloadSale);

      expect(resolve._id).to.be.equal(payloadSale.productId);
    });

    it('Deve retornar um objeto de erro caso quantity seja uma string', async () => {
      const payloadSale = [{ productId: ObjectId(), quantity: 'ten' }];
      const resolve = await SalesServices.updateSale(payloadSale);

      expect(resolve).to.be.an('object');
      expect(resolve.err.code).to.be.equal('invalid_data');
      expect(resolve.err.message).to.be.equal('Wrong product ID or invalid quantity');
    });

  });

  describe('deleteSale - Deve deletar uma venda pelo seu ID', async () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'deleteSale').resolves(SALE);
      sinon.stub(SalesModel, 'getSaleById').resolves({});
      sinon.stub(ProductsModel, 'getProductById').resolves(PRODUCT);
      sinon.stub(ProductsModel, 'updateProduct').resolves({});
    });
    afterEach(() => {
      SalesModel.deleteSale.restore();
      SalesModel.getSaleById.restore();
      ProductsModel.getProductById.restore();
      ProductsModel.updateProduct.restore();
    });

    it('Deve deletar um venda pelo ID e retornar um objeto o item deletado', async () => {
      const saleId = SALE._id;
      const response = await SalesServices.deleteSale(saleId);

      expect(response).to.be.an('object');
      expect(response).to.have.property('_id');
      expect(response).to.have.property('itensSold');
    });

    it('Deve retornar um objeto de erro caso o ID seja inválido', async () => {
      const saleId = '123456';
      const response = await SalesServices.deleteSale(saleId);

      expect(response).to.be.an('object');
      expect(response.err.code).to.be.equal('invalid_data');
      expect(response.err.message).to.be.equal('Wrong sale ID format');
    });
  });
});
