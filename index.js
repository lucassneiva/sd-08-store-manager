const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productController);
app.use('/sales', saleController);

const PORT = 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
