const { expect } = require("chai");
const connection = require('../../models/connection');

const ProductsService = require('../../services/productsService');

describe('A camada service valida os campos corretamente ao inserir um produto', () => {
  describe('Quando insere com os dados inválidos', () => {
    const payload = {
      name: 'Pro',
      quantity: 0,
    };

    it('retorna um objeto', async () => {
      const response = await ProductsService.create(payload);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com a propriedade e valor "error: true"', async () => {
      const response = await ProductsService.create(payload);
      expect(response.error).to.be.equals(true);
    });
  })

  describe('Quado insere com os dados válido', () => {

    before(async () => {
      let db = await connection();
      await db.collection('products').deleteMany({});
      await db.collection('products').insertOne({ name: 'Service', quantity: 22});
    })

    it('retorna um objeto', async () => {
      const response = await ProductsService.create({
        name: 'Produto do service',
        quantity: 1
      });
      expect(response).to.be.an('object');
    })

    it('retorna um objeto com a propriedade "_id"', async () => {
      const response = await ProductsService.create({
        name: 'Produto do service 2',
        quantity: 2
      });
      expect(response).to.have.property('_id');
    })

    it('retorna a mensagem "Product already exists"', async () => {
      const response = await ProductsService.create({name: 'Service', quantity: 22});
      expect(response).to.have.property('message');
      expect(response.message).to.be.equals('Product already exists');
    })
  })
})
