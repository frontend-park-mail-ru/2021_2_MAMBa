const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const {v4: uuid} = require('uuid');
const path = require('path');
const app = express();
const initMocks = require('./mocks');

app.use(express.static('dist'));

app.use('/', express.static(__dirname));
app.use(express.static(__dirname));

app.use(body.json());
app.use(cookie());

initMocks(app);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../dist/index.html`));
});

const port = process.env.PORT || 8085;

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});

