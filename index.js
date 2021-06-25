const express = require('express');
const bodyParser = require('body-parser');

const controller = require('./controllers/product');
const error = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {response.send();});
app.get('/products', controller.getAll);
app.post('/products', controller.create);

app.use(error);


const PORT = 3000;

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
