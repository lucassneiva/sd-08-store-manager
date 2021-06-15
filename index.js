const express = require('express');
const bodyParser = require('body-parser');

const Products = require('./models/Products');
const { validateMiddleware } = require('./schemas/ProductSchema');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (_req, res) => {
  const products = await Products.getAll();

  if (products.length === 0) return res.status(404)
    .json({ message: 'you dont have products' });

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
  const deleteProduct = await Products.deleteProduct(id);

  if (!deleteProduct) return res.status(422).json({ err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  } });
  res.status(200).json(deleteProduct);
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

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
