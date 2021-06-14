const { expect } = require('chai');

const ProductsModel = require('../../models/productsModel');


describe('Ao chamar o "create" do model', () => {
  describe('Quando insere os dados válido', () => {
    const payload = {
      name: 'Produto de teste',
      quantity: 20,
    };

    it('retorna o objeto', async () => {
      const response = await ProductsModel.create(payload);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com a chave "_id"', async () => {
      const response = await ProductsModel.create(payload);
      expect(response).to.have.property('_id');
    })
  })
});

