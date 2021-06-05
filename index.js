const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;

app.use(bodyParser.json());

app.use('/', require('./routers/index'));

app.listen(PORT, () => console.log('Online!'));
