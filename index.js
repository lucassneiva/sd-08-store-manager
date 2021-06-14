require('dotenv').config();
const express = require('express');
const app = express();
const ProductsRouter = require('./routes/productsRouter');
const ProductsModel = require('./models/productsModel');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsRouter);

app.listen(process.env.PORT);
