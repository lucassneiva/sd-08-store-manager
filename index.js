const express = require('express');
const bodyParser = require('body-parser');
const products = require('./controller/productController');
const sales = require('./controller/salesController');

const app = express();
app.use(bodyParser.json());

app.route('/products')
  .post(products.createProduct)
  .get(products.getAll);

app.route('/products/:id')
  .get(products.getById)
  .put(products.updateProduct)
  .delete(products.deleteProduct);


app.route('/sales')
  .post(sales.addSale)
  .get(sales.getAll);

app.route('/sales/:id')
  .get(sales.getAll)
  .put(sales.updateSale);

const PORT = 3000;
app.listen(PORT, () => console.log(`Online port: ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
