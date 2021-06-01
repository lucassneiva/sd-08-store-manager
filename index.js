const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
// const errorMiddleware = require('./middlewares/errors');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', productsController);

app.use('/sales', salesController);

// app.use(errorMiddleware);


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
