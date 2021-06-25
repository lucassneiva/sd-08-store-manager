const express = require('express');
const bodyParser = require('body-parser');

const controller = require('./controllers/product');
const Sale = require('./controllers/sale');
const error = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.post('/products', controller.create);
app.get('/products', controller.getAll);
app.get('/products/:id', controller.getById);
app.put('/products/:id', controller.update);
app.delete('/products/:id', controller.deleteById);

app.post('/sales', Sale.create);
app.get('/sales', Sale.getAll);
app.get('/sales/:id', Sale.getById);
app.use(error);


const PORT = 3000;

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
