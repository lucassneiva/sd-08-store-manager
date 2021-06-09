const express = require('express');
const bodyParser = require('body-parser');

const products = require('./controllers/products');
// const sales = require('./controllers/Sales');

const app = express();
const PORT = '3000';

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', products.create);
app.get('/products', products.getAll);
app.get('/products/:id', products.getById);
app.put('/products/:id', products.updateById);
app.delete('/products/:id', products.deleteById);

app.listen(PORT, () => {
  console.log('Online');
});
