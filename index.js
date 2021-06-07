const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

const RegisterProductMiddleware = require('./controllers/RegisterProductMiddleware');
const ListProductsMiddleware = require('./controllers/ListProductsMiddleware');
const UpdateProductMiddleware = require('./controllers/UpdateProductMiddleware');
const DeleteProductMiddleware = require('./controllers/DeleteProductMiddleware');

const RegisterSalesMiddleware = require('./controllers/RegisterSalesMiddleware');
const ListSalesMiddleware = require('./controllers/ListSalesMiddleware');
const UpdateSaleMiddleware = require('./controllers/UpdateSaleMiddleware');
const DeleteSaleMiddleware = require('./controllers/DeleteSaleMiddleware');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('Dale'); });

app.post('/products', RegisterProductMiddleware);

app.get('/products', ListProductsMiddleware);

app.get('/products/:id', ListProductsMiddleware);

app.put('/products/:id', UpdateProductMiddleware);

app.delete('/products/:id', DeleteProductMiddleware);

app.post('/sales', RegisterSalesMiddleware);

app.get('/sales', ListSalesMiddleware);

app.get('/sales/:id', ListSalesMiddleware);

app.put('/sales/:id', UpdateSaleMiddleware);

app.delete('/sales/:id', DeleteSaleMiddleware);
