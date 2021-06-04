const express = require('express');
const bodyParser = require('body-parser');
const { DEFAULT_PORT } = require('./utils/consts');
const prodValidMiddle = require('./middlewares/Products/productValidadeMiddleware');
const ProdReqValidMiddle = require('./middlewares/Products/requestValidateMiddleware');
const SaleReqValidMiddle = require('./middlewares/Sales/requestValidateMiddleware');
const Products = require('./controllers/Products');
const Sales = require('./controllers/Sales');
const validProdIdMiddleware = require('./middlewares/Sales/validateProductIdMiddleware');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

//Products
app.get('/products/', Products.getAll);
app.get('/products/:id', Products.searchById);
app.post('/products', ProdReqValidMiddle, prodValidMiddle, Products.create);
app.put('/products/:id', ProdReqValidMiddle, Products.updateById);
app.delete('/products/:id', Products.deleteById);

//Sales
app.post('/sales', SaleReqValidMiddle, Sales.create);

const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
