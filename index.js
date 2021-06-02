const express = require('express');
const bodyParser = require('body-parser');
const products = require('./controller/productController');

const app = express();
app.use(bodyParser.json());

app.route('/products')
  .post(products.createProduct)
  .get(products.getAll);

app.route('/products/:id')
  .get(products.getById)
  .put(products.updateProduct)
  .delete(products.deleteProduct);

const PORT = 3000;
app.listen(PORT, () => console.log(`Online port: ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
