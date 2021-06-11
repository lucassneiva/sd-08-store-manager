const express = require('express');
const bodyParser = require('body-parser');
const products = require('./controllers/productController');
const sales = require('./controllers/saleController');

const errorMiddleware = require('./middlewares/error');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

//Listar todos os produtos
app.get('/products', products.getAllProducts );
//Procurar por ID
app.get('/products/:id', products.getById);
// Criar produtos
app.post('/products', products.createProducts);
//Atualizar produtos
app.put('/products/:id', products.updateProduct);
//Deletando produtos
app.delete('/products/:id', products.deleteProduct);

//Listar todas as vendas
app.get('/sales', sales.getAllSales );
//Procurar por ID
app.get('/sales/:id', sales.getById);
// Criar vendas
app.post('/sales', sales.createSales);
//Atualizar vendas
app.put('/sales/:id', sales.updateSale);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Online!');
});