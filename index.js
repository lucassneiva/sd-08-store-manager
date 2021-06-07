const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/productsController');
const SalesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());
require('dotenv').config();

const PORT = process.env.PORT;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductsController.create);

app.get('/products', ProductsController.getAll);
app.get('/products/:id', ProductsController.getById);

app.put('/products/:id', ProductsController.updateById);

app.delete('/products/:id', ProductsController.deleteById);

app.post('/sales', SalesController.create);

app.get('/sales', SalesController.getAll);
app.get('/sales/:id', SalesController.getById);

app.put('/sales/:id', SalesController.updateById);

app.delete('/sales/:id', SalesController.deleteById);

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
