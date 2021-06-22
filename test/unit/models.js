const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const ProductModel = require('../../models/Products');
const SalesModel = require('../../models/Sales');

const DBServer = new MongoMemoryServer();
let connectionMock;

before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );

    sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
});

after(async () => {
    await connectionMock.close();
    MongoClient.connect.restore();
    await DBServer.stop();
});

/* test Products */
describe('Insere um novo produto no BD', () => {
    const payloadProduct = {
        name: 'Capa de violão',
        quantity: 2,
    };
    const payloadName = {
        name: 'Teclado e mouse',
    }
    const ID_EXAMPLE = '604cb554311d68f491ba5781';

    const payloadUpdate = {
        id: '604cb554311d68f491ba5792',
        name: 'Calculadora',
        quantity: 6,
    };

    describe('quando Produto é inserido com sucesso', async () => {

        it('retorna um objeto', async () => {
            const response = await ProductModel.createProduct(payloadProduct);

            expect(response).to.be.a('object');
        });
        it('retorna um objeto com a propriedade _id , name e quantity', async () => {
            const response = await ProductModel.createProduct(payloadProduct);

            expect(response).to.be.a.property('_id');
            expect(response).to.be.a.property('name');
            expect(response).to.be.a.property('quantity');
        });
    });

    describe('quando procura produto pelo nome', () => {

        it('retorna um objeto', async () => {
            const response = await ProductModel.createProduct(payloadName);

            expect(response).to.be.a('object');
        });
        it('retorna um objeto com a propriedade _id , name e quantity', async () => {
            const response = await ProductModel.findByName(payloadProduct);

            expect(response).to.be.a.property('_id');
            expect(response).to.be.a.property('name');
            expect(response).to.be.a.property('quantity');
        });

    })

    describe('quando procura por todos produtos', () => {
        it('retorna um array', async () => {
            const response = await ProductModel.findAll();

            expect(response).to.be.a('array');
        });
    })

    describe('quando procura um produto por ID', async () => {

        it('quando não é encontrado o ID', async () => {
            const response = await ProductModel.findById(ID_EXAMPLE);

            expect(response).to.be.equal(null);
        });

    });


    describe('quando existe um produto para o ID informado', () => {
        before(async () => {
            const productCollection = await connectionMock.db('StoreManager').collection('products');
            await productCollection.insertOne({
                _id: ObjectId(ID_EXAMPLE),
                name: 'Tesoura',
                quantity: 10
            });
        });

        it('retorna um objeto', async () => {
            const response = await ProductModel.findById(ID_EXAMPLE);
            expect(response).to.be.a('object');
        });


    });

    describe('atualiza um produto com ID informado', () => {
        it('retorna um objeto', async () => {
            const response = await ProductModel.updateItem(payloadUpdate);
            expect(response).to.be.a('object');
        });


    });



});
/* test Sales */

describe('Insere uma nova Venda no BD', () => {
    const payloadSale = [
        {
            "productId": "507cb554311d68f491ba5781",
            "quantity": 8
        },
        {
            "productId": "604cb558987d68f491ba5781",
            "quantity": 5
        }
    ]

    const payloadSale2 = {
        "id": "5f43ba333200020b101fe4a0",
        "itensSold": [ { "productId": '5f43ba273200020b101fe49f', "quantity": 5 } ]
      }


    describe('quando a Venda é inserida com sucesso', async () => {

        it('retorna um array', async () => {
            const response = await SalesModel.createSale(payloadSale);

            expect(response).to.be.a('object');
        });
    })
    
    




    describe('quando procura por todas as Vendas', () => {
        it('retorna um object', async () => {
            const response = await SalesModel.findAll();

            expect(response).to.be.a('object');
        });
    })


    describe('quando procura uma Venda por ID', async () => {
        const ID_EXAMPLE = '604cb554311d68f491ba5781';
        it('quando não é encontrado o ID', async () => {
            const response = await SalesModel.findById(ID_EXAMPLE);

            expect(response).to.be.equal(null);
        });
        it('quando não é enviado o ID', async () => {
            const response = await SalesModel.findById('');

            expect(response).to.be.equal(null);
        });

    });


    describe('quando existe uma Venda para o ID informado', () => {
        const ID_EXAMPLE = "5f43ba333200020b101fe4a0"
        before(async () => {
            const salesCollection = await connectionMock.db('StoreManager').collection('sales');
            await salesCollection.insertOne({
                _id: ObjectId(ID_EXAMPLE),
                itensSold: [
                    {
                        productId: "5f43ba273200020b101fe49f",
                        quantity: 2
                    }
                ]
            });
        });

        it('retorna um objeto', async () => {
            const response = await SalesModel.findById(ID_EXAMPLE);
            expect(response).to.be.a('object');
        });

        it('atualiza uma Venda', async () => {
            const response = await SalesModel.updateSale(payloadSale2);
            expect(response).to.be.a('object');
            
        });

        it('deleta uma Venda', async () => {
            const response = await SalesModel.deleteSale("5f43ba333200020b101fe4a0");
            expect(response).to.be.a('object');
            
        });


       


    });








});
