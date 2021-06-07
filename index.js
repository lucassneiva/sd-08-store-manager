// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');

const productsRouter = require('./routes/products');

const app = express();

const PORT = 3000;


app.use('/products', productsRouter);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
