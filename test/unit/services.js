const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const ProductModel = require('../../models/Products');
const ProductService = require('../../services/Products');

const SalesModel = require('../../models/Sales');
const SalesService = require('../../services/Sales');

/* Product services */
describe('2 - Busca todos os produtos no BD', () => {
    describe('quando não existe nenhum produto criado', () => {
        before(() => {
            sinon.stub(ProductModel, 'findAll')
                .resolves(null);
        });

        after(() => {
            ProductModel.findAll.restore();
        });

        it('retorna um array', async () => {
            const response = await ProductService.findAll();
            expect(response).to.be.null;
        });

    });


});

describe('quando existem produto no banco', () => {
    const payload = {
        products: [
            {
                _id: "60d2789f29fb9c5c6ea1190e",
                name: "Bola futebol",
                quantity: 9
            },
            {
                _id: "60d278fe29fb9c5c6ea1190f",
                name: "Caneca Quadrada",
                quantity: 7
            }
        ]
    }

    before(() => {
        sinon.stub(ProductModel, 'findAll')
            .resolves(payload);
    });

    after(() => {
        ProductModel.findAll.restore();
    });

    it('retorna um objeto', async () => {
        const response = await ProductService.findAll();

        expect(response).to.be.a('object');
    });



});

describe('Quando cadastra um produto', () => {
    const payload = { _id: "60d278fe29fb9c5c6ea1190f", name: "Lampada", quantity: 4 }
    before(() => {
        sinon.stub(ProductModel, 'createProduct')
            .resolves(payload);
    });

    after(() => {
        ProductModel.createProduct.restore();
    });
    it('retorna um objeto', async () => {
        const response = await ProductService.createProduct(payload);

        expect(response).to.be.a('object');
    });
    it('retorna um objeto com _id name e quantity', async () => {
        const response = await ProductService.createProduct(payload);

        expect(response).to.include.all.keys('_id', 'name', 'quantity');
    });

})

describe('Quando não é possivel cadastrar um produto', () => {
    const payload = {
        error: {
            code: "UNPROCESSABLE_ENTITY",
            message: 'Product already exists'
        }
    };
    const payload2 = { _id: "60d278fe29fb9c5c6ea1190f", name: "Lampada", quantity: 4 }

    before(() => {
        sinon.stub(ProductModel, 'createProduct')
            .resolves(payload);
    });

    after(() => {
        ProductModel.createProduct.restore();
    });

    it('retorna o erro', async () => {
        const response = await ProductService.createProduct(payload2);
        expect(response).to.be.a.key('error')
    })

});
describe('executa funçao findById passando Id do produto', () => {
    const payload = {
        _id: "60d2789f29fb9c5c6ea1190e",
        name: "Bola futebol",
        quantity: 9
    }
    before(() => {
        sinon.stub(ProductModel, 'findById')
            .resolves(payload);
    });

    after(() => {
        ProductModel.findById.restore();
    });
    it('encontra o produto com seu ID', async () => {

        const response = await ProductService.findById(payload._id);

        expect(response).to.include.all.keys('_id', 'name', 'quantity');
    })

})

describe('executa funçao updateItem ', () => {
    const payload = { name: "produto1", quantity: 4 }
    before(() => {
        sinon.stub(ProductModel, 'updateItem')
            .resolves(payload);
    });

    after(() => {
        ProductModel.updateItem.restore();
    });


    it('faz o update do iten com sucesso', async () => {

        const id = "60d2789f29fb9c5c6ea1190e"
        const response = await ProductService.updateItem(id);

        expect(response).to.include.all.keys('name', 'quantity');
    })

});

describe('quando delete um item', () => {
    const payload = { _id: "60d2789f29fb9c5c6ea1190e", name: "produto1", quantity: 4 }
    before(() => {
        sinon.stub(ProductModel, 'deleteItem')
            .resolves(payload);
    });

    after(() => {
        ProductModel.deleteItem.restore();
    });
    it('retorna o item deletado', async () => {
        const response = await ProductService.deleteItem(payload.id);
        expect(response).to.include.all.keys('_id', 'name', 'quantity');

    });

})

/* Sales services */

describe('executa funçao createSale', () => {
    const payload = {
        _id: "5f43ba333200020b101fe4a0",
        itensSold: [
            {
                productId: "5f43ba273200020b101fe49f",
                quantity: 2
            }
        ]
    }
    const newProduct = [
        {
            productId: "5f43ba333200020b101fe4a0",
            quantity: 4
        }, {
            productId: "5f43ba333200020b101fe4a0",
            quantity: 4
        }

    ]

    before(() => {
        sinon.stub(SalesModel, 'createSale')
            .resolves(payload);
    });

    after(() => {
        SalesModel.createSale.restore();
    });
    it('produto cadastrado retorna um objeto', async () => {

        const response = await SalesService.createSale(newProduct);
        expect(response).to.be.a.a('object')


    })
    // it('objeto retornado tem as keys ',async()=>{

    //     const response = await SalesService.createSale(newProduct);
    //     console.log(response)
    //     expect(response).to.include.all.keys( 'id', 'itensSold');

    // })


})

describe('procura por todas as vendas', () => {
    const payload = {
        sales: [{
            _id: "5f43ba333200020b101fe4a0"
        }]
    }

    before(() => {
        sinon.stub(SalesModel, 'findAll')
            .resolves(payload);
    });

    after(() => {
        SalesModel.findAll.restore();
    });
    it('exectura funçao findAll', async () => {

        const response = await SalesService.findAll();
        expect(response).to.be.a('object')
        expect(response).to.be.a.property('sales')

    })

})

describe('procura vendas pelo ID', () => {
    const payload = {
        sales: [
            {
                _id: "5f43ba333200020b101fe4a0",
                itensSold: [
                    { productId: "5f43ba273200020b101fe49f", quantity: 6 }
                ]
            }
        ]
    }
    before(() => {
        sinon.stub(SalesModel, 'findById')
            .resolves(payload);
    });

    after(() => {
        SalesModel.findById.restore();
    });
    it('encontra venda pelo ID', async () => {

        const response = await SalesService.findById();
        expect(response).to.be.a('object')
        expect(response).to.be.a.property('sales')

    })


});

describe('não encontra id da venda', () => {

    it('espera o erro', async () => {
        const response = await SalesService.findById();
        expect(response).to.be.a('object')

    })
    it('espera o erro', async () => {
        const response = await SalesService.findById();
        expect(response).to.be.a('object')
        expect(response).to.be.a.property('error')
    })
})


describe('atualiza vendas pelo ID', () => {

    const payload = {
        sales: [
            {
                _id: "5f43ba333200020b101fe4a0",
                itensSold: [
                    { productId: "5f43ba273200020b101fe49f", quantity: 6 }
                ]
            }
        ]
    }

    before(() => {
        sinon.stub(SalesModel, 'updateSale')
            .resolves(payload);
    });

    after(() => {
        SalesModel.updateSale.restore();
    });
    it('encontra venda pelo ID', async () => {

        const response = await SalesService.updateSale();
        expect(response).to.be.a.property('sales')


    })


});

describe('deleta vendas pelo ID', () => {

    const payload = {
        _id: "60d2aa38cbb4efa0ecea317d",
        itensSold: [
          { productId: '60d2789f29fb9c5c6ea1190e', quantity: 1 },
          { productId: '60d278fe29fb9c5c6ea1190f', quantity: 1 }
        ]
      }

    before(() => {
        sinon.stub(SalesModel, 'findById')
            .resolves(payload);
        sinon.stub(SalesModel, 'deleteSale')
            .resolves(payload);
    });

    after(() => {
        SalesModel.findById.restore();
        SalesModel.deleteSale.restore();
    });
   it('e retorna um objeto com propriedades da venda deletada',async()=>{

    const response = await SalesService.findById();
    const response1 = await SalesService.deleteSale();
    
    expect(response).to.be.a('object')
    expect(response1).to.be.a.property('_id')
    expect(response1).to.be.a.property('itensSold')
   })
    

});