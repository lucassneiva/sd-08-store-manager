const express = require('express');
const routes = require('./routes');

const app = express();

const PORT_NUMBER = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT_NUMBER, () => (console.log('Server is running on port 3000.')));
