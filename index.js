const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;
const app = express();
app.use(bodyParser.json());

const ProductsController = require('./controllers/productsController');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', ProductsController.getAll);
app.get('/products/:id', ProductsController.findByID);
app.post('/products', ProductsController.insert);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
