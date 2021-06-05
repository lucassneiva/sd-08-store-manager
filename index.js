const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const addProduct = require('./controllers/ProductsController');

const PORT = 3000;
const Message = () => console.log(`Estou escutando a porta ${ PORT }`);

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', addProduct);

app.listen(PORT, Message());
