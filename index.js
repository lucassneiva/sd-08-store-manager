const express = require('express');
const bodyParser = require('body-parser');

const controller = require('./controllers/product');
const error = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.post('/products', controller.create);
app.get('/products', controller.getAll);
app.get('/products/:id', controller.getById);
app.put('/products/:id', controller.update);


app.use(error);


const PORT = 3000;

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
