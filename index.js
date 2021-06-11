require('dotenv').config();

const express = require('express');

const products = require('./controllers/Products');
const sales = require('./controllers/Sales');
const errorMiddleware = require('./middlewares/error');

const app = express();

const DEFAULT_PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', products.create);
app.get('/products/:id', products.findById);
app.get('/products', products.findAll);
app.put('/products/:id', products.update);
app.delete('/products/:id', products.remove);
app.post('/sales', sales.create);
app.get('/sales/:id', sales.findById);
app.get('/sales', sales.findAll);
app.put('/sales/:id', sales.update);
app.delete('/sales/:id', sales.remove);

app.use(errorMiddleware);

const PORT = process.env.PORT || DEFAULT_PORT;

app.listen(PORT);
