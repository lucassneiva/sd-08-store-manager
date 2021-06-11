const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const StoreController = require('./controllers/storeController');
const ErrorMiddleware = require('./middlewares/error.js');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', StoreController.create);
app.get('/products', StoreController.getAll);
app.get('/products/:id', StoreController.findById);
app.put('/products/:id', StoreController.updateById);
app.delete('/products/:id', StoreController.deleteById);

app.use(ErrorMiddleware);

const PORT = 3000;

app.listen(PORT, () => { console.log(`Ouvindo a porta ${PORT}`); });
