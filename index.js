const express = require('express');
const bodyParser = require('body-parser');
const { productsController } = require('./controllers/productsController');

const app = express();
app.use(bodyParser.json());

// const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('Server is running'));

app.post('/products', productsController.registerProduct);
app.get('/products', productsController.listProducts);
app.get('/products/:id', productsController.listProducts);
app.post('/products/:id', productsController.updateProduct);
