const { expect } = require('chai');

const ProductsModel = require('../../models/productsModel');


describe('Cadastra o produto no banco de dados', () => {
  describe('Quando passa os dados válido e da certo', () => {
    const payload = {
      name: 'Produto de teste',
      quantity: 20,
    };

    before(() => {

    })

    it('retorna o objeto', async () => {
      const response = await ProductsModel.create(payload);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com a chave "_id"', async () => {
      const response = await ProductsModel.create(payload);
      expect(response).to.have.property('_id');
    })
  })
})
