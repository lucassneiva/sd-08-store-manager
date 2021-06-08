require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// const productsController = require('./controllers/productsController');

const ProductsController = require('./controllers/productsController');
const rescue = require('express-rescue');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductsController.insert);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
