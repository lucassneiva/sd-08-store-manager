const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectID, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const rewire = require('rewire');

const productService = rewire('../../services/productService');
const ProductModel = rewire('../../models/productModel.js');
const schema = require('../../schema/resolveRequest');
const dataBaseFake = require('../data');

describe('SERVICE', () => {
  describe('Teste do "service.productCreate"', () => {
    const newProduct = { name: 'TV LCD LED SONY 73`', quantity: 10 };
    const expectedProduct = {
      _id: ObjectId('60b94259571f2b7f873e6de7'),
      name: 'TV LCD LED SONY 73`',
      quantity: 10,
    };
    const expectedId = { _id: ObjectId('60b94259571f2b7f873e6de7') };
    
    
    describe('Produto inserido com sucesso!', async () => {

      before(async () => {
        sinon.stub(ProductModel, 'create').resolves(expectedId);
        sinon.stub(ProductModel, 'getByKey').resolves(null);
        productService.__set__({
          modelProduct: ProductModel,
        });
      });

      after(() => {
        sinon.restore();
      });

      it('Deve retornar um "object"!', async () => {
        const resolve = await productService.productCreate(newProduct);
        expect(resolve).to.be.a('object');
      });

      it('Deve retornar um objeto com as propríedades "status e result"', async () => {
        const resolve = await productService.productCreate(newProduct);
        expect(resolve).to.be.property('status');
        expect(resolve).to.be.property('result');
      });

      it('A propríedade "result" deve conter ("_id", "name", "quantity")!', async () => {
        const resolve = await productService.productCreate(newProduct);
        const { result } = resolve;
        expect(result).to.be.property('_id');
        expect(result).to.be.property('name');
        expect(result).to.be.property('quantity');
      });

      it('Status deve retornar "{ status: 201 }"', async () => {
        const resolve = await productService.productCreate(newProduct);
        const result = { status: resolve.status };
        expect({ status: 201 }).to.deep.equal(result);
      });

      it(`Result deve retornar 
        "{ '_id': "60b94259571f2b7f873e6de7",
           'name': 'TV LCD LED SONY 73' ,
           'quantity': 10, }"`, async () => {
             const resolve = await productService.productCreate(newProduct);
             const result = resolve.result;
             expect(expectedProduct).to.deep.equal(result);
           });
    });

    describe('Produto a ser cadastrado já existe no DB!', async () => {
      before(async () => {
        sinon.stub(ProductModel, 'getByKey').resolves(expectedProduct);
        productService.__set__({
          modelProduct: ProductModel,
        });
      });
      after(() => {
        sinon.restore();
      });

      it('Deve retornar um "object"', async () => {
        const result = await productService.productCreate(newProduct);
        expect(result).to.be.a('object');
      });

      it('Deve retornar um objeto com as propríedades "status e err"', async () => {
        const result = await productService.productCreate(newProduct);
        expect(result).to.property('status');
        expect(result).to.property('err');
      });

      it('A propríedade "err" deve conter "code e message"', async () => {
        const result = await productService.productCreate(newProduct);
        expect(result.err).to.property('code');
        expect(result.err).to.property('message');
      });

      it('Status deve retornar "{ status: 422 }"', async () => {
        const result = await productService.productCreate(newProduct);
        expect({ status: 422 }).to.deep.equal({ status: result.status });
      });

      it(`Err deve ter os seguintes valores:
        "{ code: 'invalid_data', message: 'Product already exists'}"`, async () => {
          const result = await productService.productCreate(newProduct);
          expect(schema('product_exists').err).to.deep.equal(result.err);
        });
    });

    describe('Validação do schema retornar com erro', async () => {
      describe('Teste se o "name" não for válido', async () => {
        const errTypeName = { code: 'invalid_data', message: '"name" must be a string' };
        const errNameEmpty = {code: 'invalid_data',message: '"name" is not allowed to be empty' };
        const errNameLength = {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long' };
        it('Retorna um "object"', async () => {
          const resolve = await productService.productCreate({ name: [], quantity: 4 });
          expect(resolve).to.be.a('object');
        });
        
        it('Retorno esperado -> "{ status: 422 }"', async () => {
          const resolve = await productService.productCreate({ name: {}, quantity: 5 });
          expect({ status: resolve.status }).to.deep.equal({ status: 422 });
        });

        it(`Retorno esperado -> 
          "{ code: 'invalid_Data', message: '"name" must be a string'}"
          `, async () => {
            const resolve = await productService.productCreate({ name: 1, quantity: 9 });
            expect(errTypeName).to.deep.equal(resolve.err);
        });

        it(`Retorno esperado ->
          "{ code: 'invalid_data', message: '"name" is not allowed to be empty' }"
          `, async () => {
          const resolve = await productService.productCreate({ name: '', quantity: 2 });
          expect(errNameEmpty).to.deep.equal(resolve.err);
          expect({ status: 422 }).to.deep.equal({ status: resolve.status });
        });

        it(`Retorno esperado `, async () => {
          const resolve = await productService.productCreate({ name: 'TV', quantity: 6 });
          expect(errNameLength).to.deep.equal(resolve.err);
        });        
      });
      describe('Teste se a "quantity" não for válido', () => {
        it (`Retorno esperado`, async () => {
          const result = {
            status: 422,
            err:
             { code: 'invalid_data',
               message: '"quantity" must be larger than or equal to 1'
          } };
          const resolve = await productService.productCreate({ name: 'TV SAMSUNG', quantity: 0 });
          expect(result).to.deep.equal(resolve);
        });
        it(`Retorno esperado`, async () => {
          const result = {
            status: 422,
            err:
             { code: 'invalid_data',
               message: '"quantity" must be larger than or equal to 1'
          } };

          const resolve = await productService.productCreate({ name: 'PILHAS AAA', quantity: -3 });
          expect(result).to.deep.equal(resolve);
        });
        it(`Retorno esperado`, async () => {
          const expected = {
            status: 422,
            err:
            { code: 'invalid_data',
                message: '"quantity" must be an integer' } }
          
          const resolve = await productService.productCreate({ name: 'MESA 4 cadeiras', quantity: 2.4 });
          expect(expected).to.deep.equal(resolve);
        })
      });
    });
  });
});
