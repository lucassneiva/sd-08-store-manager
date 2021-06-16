const express = require('express');
const bodyParser = require('body-parser');

const Products = require('./models/Products');
const Sales = require('./models/Sales');
const { validateMiddleware } = require('./schemas/ProductSchema');
const { validateSaleMiddleware } = require('./schemas/SaleSchema');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (_req, res) => {
  const products = await Products.getAll();
  res.status(200).json({ products });
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  const findProduct = await Products.findById(id);
  if (!findProduct) return res.status(422).json({ err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  } });
  res.status(200).json(findProduct);
});

app.put('/products/:id', validateMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updateProduct = await Products.updateProduct(id, name, quantity);
  res.status(200).json(updateProduct);
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const getProduct = await Products.findById(id);
  const deleteProduct = await Products.deleteProduct(id);

  if (!deleteProduct) return res.status(422).json({ err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  } });
  res.status(200).json(getProduct);
});

app.post('/products', validateMiddleware, async (req, res) => {
  const { name, quantity } = req.body;
  const list = await Products.getAll();

  const isUnique = list.find(item => item.name === name);
  if (isUnique) {
    return res.status(422).json({ err: {
      'code': 'invalid_data',
      'message': 'Product already exists',
    }});;
  }

  const addNewProduct = await Products.newProduct(name, quantity);

  res.status(201).json(addNewProduct);
});

app.get('/sales', async (_req, res) => {
  const sales = await Sales.getAll();
  res.status(200).json({ sales });
});

app.post('/sales', validateSaleMiddleware, async (req, res) => {
  const productsArray = req.body;
  
  const addNewSale = await Sales.newSale(productsArray);
  res.status(200).json(addNewSale);
});

app.get('/sales/:id', async (req, res) => {
  const { id } = req.params;
  const findSale = await Sales.findById(id);

  if (!findSale) return res.status(404).json({ err: {
    code: 'not_found',
    message: 'Sale not found',
  } });
  res.status(200).json(findSale);
});

app.put('/sales/:id', validateSaleMiddleware, async (req, res) => {
  const { id } = req.params;
  const modifiedSale = req.body;
  const updateSale = await Sales.updateSale(id, modifiedSale);
  res.status(200).json(updateSale);
});

app.delete('/sales/:id', async (req, res) => {
  const { id } = req.params;
  const findSale = await Sales.findById(id);
  const deleteSale = await Sales.deleteSale(id);

  if (!deleteSale) return res.status(422).json({ err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  } });
  res.status(200).json(findSale);
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
