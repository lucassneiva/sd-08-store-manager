const express = require('express');
const products = require('./controllers/productController');

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', products.create);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
