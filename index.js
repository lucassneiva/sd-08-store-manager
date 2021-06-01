const express = require(express);

const app = express();
const port = 3001;

app.use(express.json());

app.listen(port, () => {
  console.log('App ouvindo a porta 3001!');
});




// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
