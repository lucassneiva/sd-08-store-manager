const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/products', productsController.create);
app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);
app.put('/products/:id', productsController.update);
app.delete('/products/:id', productsController.remove);

app.post('/sales', salesController.create);
app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);
app.put('/sales/:id', salesController.update);
app.delete('/sales/:id', salesController.remove);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
