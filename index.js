const express = require('express');
const bodyParser = require('body-parser');

const controller = require('./controllers/productController');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {response.send();});
app.get('/products/:id', controller.readById);
app.get('/products', controller.readAll);
app.post('/products', controller.create);

app.use(errorMiddleware);

const LOCALHOST = 3000;
const port = process.env.PORT || LOCALHOST;

app.listen(port, () => { console.log(`Listening on port ${port}`); });
