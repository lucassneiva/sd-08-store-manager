const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const { addProduct, getAll, findById,
  updateProducts, deleteProducts } = require('./controllers/productsController');
const { addSales, getAllSales, findByIdSales,
  updateSales, deleteSales } = require('./controllers/salesController');

app.use(bodyParser.json());

app.route('/products')
  .get(getAll)
  .post(addProduct);

app.route('/products/:id')
  .get(findById)
  .put(updateProducts)
  .delete(deleteProducts);

app.route('/sales')
  .get(getAllSales)
  .post(addSales);

app.route('/sales/:id')
  .get(findByIdSales)
  .put(updateSales)
  .delete(deleteSales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('App ouvindo a porta 3000'));
