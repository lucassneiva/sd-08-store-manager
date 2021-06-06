// require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const products = require('./controllers/products');
const sales = require('./controllers/sales');
const errorMiddleware = require('./middlewares/error');

const app = express();

const DEFAULT_PORT = 3000;
// const DB_PORT = 27017;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', products.getAllProducts);
app.get('/products/:id', products.getById);
app.get('/sales', sales.getAllSales);
app.get('/sales/:id', sales.getById);

app.post('/products', products.createOne);
app.post('/sales', sales.registerSale);

app.put('/products/:id', products.updateById);
app.put('/sales/:id', sales.updateById);

app.delete('/products/:id', products.deleteById);
app.delete('/sales/:id', sales.deleteById);

app.use(errorMiddleware);

app.listen(
  process.env.PORT || DEFAULT_PORT,
  () => console.log(`Server listening on port ${process.env.PORT || DEFAULT_PORT}`)
);
