const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const DEFAULT_PORT = 3000; 
const PORT = process.env.PORT || DEFAULT_PORT;
const middlewareError = require('./middlewares/error');
const products = require('./controllers/Products');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', products.findById);
app.get('/products', products.findAll);
app.post('/products',products.createProduct);



app.use(middlewareError.error);
app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
