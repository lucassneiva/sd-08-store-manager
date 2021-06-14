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

const getAll = () => {};
// const getById = () => {};

describe('Ao chamar o "getAll"', () => {

  it('retorna um array', async () => {
    const response = await getAll();
    expect(response).to.be.an('array');
  })

  it('retorna um array com todos os produtos cadastrados', async () => {
    const response = await getAll();
    expect(response).to.be.equals([{name: 'Martelo', quantity: 2 }, { name: 'Tesoura', quantity: 231 }]);
  });
});

// describe('Ao chamar o "getById"', () => {
//   describe('quando informa um "id" inválido', () => {
//     it('retorna um "boolean" com o valo "false"', async() => {
//       const response = await getById();
//       expect(response).to.be.a('boolean');
//       expect(response).to.be.equals(false);
//     })
//   })

//   describe('quando informa um "id" válido', () => {
//     it('retorna um objeto', async () => {
//       const response = await getById('kaldklaskd');
//       expect(response).to.be.an('object');
//     })

//     it('retorna o objeto com as chaves "_id", "name" e "quantity"', async () => {
//       const response = await getById('lakdlsak');
//       expect(response).to.have.property('_id');
//       expect(response).to.have.property('name');
//       expect(response).to.have.property('quantity');
//     })

//     it('retorna o objeto com os valores corretos', async () => {
//       const response = await getById('lakdlsak');
//       expect(response.id).to.be.equals('lakdlsak');
//       expect(response.id).to.be.equals('Martelo');
//       expect(response.id).to.be.equals(12);
//     })
//   })

// })
