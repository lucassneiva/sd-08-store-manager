const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const PORT = 3000;
const productModel = require('./models/Products');


const productController = require('./controllers/Product');
const salesController = require('./controllers/Sales');


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products',productController.getAll);

app.post('/products', productController.createProducts);

app.get('/products/:id', productController.findById);

app.put('/products/:id', productController.updateProduct);

app.delete('/products/:id', productController.deleteProduct);

// app.get('/sales', salesController.getAll);

app.post('/sales', salesController.createSales);

// app.get('/sales/:id', salesController.findById);

// app.put('/sales/:id', salesController.updateSales);

// app.delete('/sales/:id', salesController.deleteSale);


app.listen(PORT, () => {
  console.log('Servidor Ativo');
});
