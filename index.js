require('dotenv').config();
const express = require('express');
const app = express();
const ProductsRouter = require('./routes/productsRouter');
const SalesRouter = require('./routes/salesRouter');

const SalesModel = require('./models/salesModel');

const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsRouter);
app.use('/sales', SalesRouter);


app.listen(PORT);
