const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/productsController');

const app = express();
app.use(bodyParser.json());
require('dotenv').config();

const PORT = process.env.PORT;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductsController.create);

app.get('/products');

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});