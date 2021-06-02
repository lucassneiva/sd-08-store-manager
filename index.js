const express = require('express');
const bodyParser = require('body-parser');

const DEFAULT_PORT = 8082;
const app = express();
app.use(bodyParser.json());


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
