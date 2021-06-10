const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = '3000';
const products = require('./productController');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send({ message: `Porta ${PORT} funfando` });
});

app.post('/products', validateName, validateQuantity, products.create);
app.get('/products', products.getAll);
app.get('/products/:id', products.getById);
app.put('/products/:id', validateName, validateQuantity, products.updateById);
app.delete('/products/:id', products.deleteById);

app.post('/sales', salesMiddle.validateQuantity, sales.create);
app.get('/sales', sales.getAll);
app.get('/sales/:id', sales.getById);
app.put('/sales/:id', salesMiddle.validateQuantity, sales.updateById);
app.delete('/sales/:id', sales.deleteById);

app.listen(PORT, () => console.log(`Porta ${PORT} funfando`));
