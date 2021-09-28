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

const Collections = {
  collections_list: [
    {id: 1, title: 'Для ценителей Хогвардса',
      picture_url: 'server/images/collections1.png'},
    {id: 2, title: 'Про настоящую любовь',
      picture_url: 'server/images/collections2.png'},
    {id: 3, title: 'Аферы века', picture_url: 'server/images/collections3.png'},
    {id: 4, title: 'Про Вторую Мировую',
      picture_url: 'server/images/collections4.jpg'},
    {id: 5, title: 'Осеннее настроение',
      picture_url: 'server/images/collections5.png'},
    {id: 6, title: 'Летняя атмосфера',
      picture_url: 'server/images/collections6.png'},
    {id: 7, title: 'Под Новый Год',
      picture_url: 'server/images/collections7.png'},
    {id: 8, title: 'Романтические фильмы',
      picture_url: 'server/images/collections8.jpg'},
    {id: 9, title: 'Джунгли зовут',
      picture_url: 'server/images/collections9.jpg'},
    {id: 10, title: 'Фантастические фильмы',
      picture_url: 'server/images/collections10.jpg'},
    {id: 11, title: 'Про петлю времени',
      picture_url: 'server/images/collections11.png'},
    {id: 12, title: 'Классика на века',
      picture_url: 'server/images/collections12.jpg'},
  ],
  collection_total: 16,
  more_available: true,
  current_limit: 12,
  current_skip: 0,
};

app.get('/collections/getCollections/skip=0&limit=12', function(req, res) {
  res.json(Collections);
});

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
    return res.status(400).json({error: 'Не валидные данные пользователя'});
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

const port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log(`Server listening port ${port}`);
});
