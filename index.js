const express = require('express');
const bodyParser = require('body-parser');

const ProductController = require('./controllers/productController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductController.create);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}`);
});
