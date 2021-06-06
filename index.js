const express = require('express');
const ProductController = require('./controllers/ProductsController');

const app = express(); 
const PORT = '3000';

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductController);

app.listen(PORT, console.log(`Porta ${PORT}`));
