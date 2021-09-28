'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());

const users = {
  'vasya@bk.ru': {
    name: 'Vasya',
    surname: 'Petrov',
    email: 'vasya@bk.ru',
    password: 'password',
  },
};
const ids = {};

app.post('/signup', function(req, res) {
  const name = req.body.name;
  const surname = req.body.surname;
  const password = req.body.password;
  const email = req.body.email;
  if (
    !password || !email ||
        !password.match(/^\S{4,}$/) ||
        !email.match(/@/)
  ) {
    return res.status(400).json({error: 'Невалидные данные пользователя'});
  }
  if (users[email]) {
    return res.status(400).json({error: 'Пользователь уже существует'});
  }

  const id = uuid();
  const user = {name, surname, email, password};
  ids[id] = email;
  users[email] = user;

  res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(201).json({id});
});

app.post('/login', function(req, res) {
  const password = req.body.password;
  const email = req.body.email;
  if (!password || !email) {
    return res.status(400).json({error: 'Не указан E-Mail или пароль'});
  }
  if (!users[email] || users[email].password !== password) {
    return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
  }

  const id = uuid();
  ids[id] = email;

  res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(200).json({id});
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Server listening port ${port}`);
});
