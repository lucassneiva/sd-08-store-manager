const { expect } = require("chai")

const ProductsService = {
  create: () => {},
}

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
    const payload = {
      name: 'Produto do service para teste',
      quantity: 1
    };
    const ID_EXAMPLE = '604cb554311d68f491ba5781';
    it('retorna um objeto', async () => {
      const response = await ProductsService(payload);
      expect(response).to.be.an('object');
    })
    it('retorna um objeto com a propriedade "_id"', async () => {
      const response = await ProductsService(payload);
      expect(response).to.have.property('_id');
    })
  })
})
