const express = require('express');
const bodyParser = require('body-parser');
const {
  create,
  searchById,
  getAll,
  updateById,
  deleteById,
} = require('./controllers/Products');
const { DEFAULT_PORT } = require('./utils/consts');
const prodValidMiddle = require('./middlewares/productValidadeMiddleware');
const reqValidMiddle = require('./middlewares/requestValidateMiddleware');
const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', searchById);
app.delete('/products/:id', deleteById);
app.put('/products/:id', reqValidMiddle, updateById);
app.get('/products/', getAll);

app.post('/products', reqValidMiddle, prodValidMiddle, create);


const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
