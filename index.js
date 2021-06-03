const express = require('express');
const productsController = require('./controllers/products');
const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/products', productsController.getProducts);
app.post('/products', productsController.createProduct);

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
