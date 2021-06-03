const express = require('express');
const productsController = require('./controllers/Products');
const salesController = require('./controllers/Sales');
const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);
app.use('/sales', salesController);

app.listen('3000', () => console.log('Rodando, rodando...roque'));