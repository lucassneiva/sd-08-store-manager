const express = require('express');
const product = require('./controllers/productController');

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', product.create);

app.get('/products/:id?', product.search);

app.put('/products/:id', product.update);

app.delete('/products/:id', product.remove);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
