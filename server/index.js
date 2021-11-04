const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const {v4: uuid} = require('uuid');
const path = require('path');
const app = express();

app.use(express.static('dist'));

app.use('/', express.static(__dirname));

app.use(body.json());
app.use(cookie());


app.get('/api/collections/getCollections/skip=0&limit=12', (req, res) => {
  res.json(COLLECTIONS);
});

app.get('/api/user/354', (req, res) => {
  res.json({
      "id": 354,
      "first_name": 'Vasya',
      "surname": 'Petrov',
      "email": 'v@v.v',
      "profile_pic": "/user/images/avatar.jpg"
  });
});

app.get('/api/user/checkAuth', (req, res) => {
  res.json({
      "id": 354
  });
});

app.get('/api/actor/getActor/skipPopular=0&limitPopular=11&skipFull=0&limitFull=6&id=1', (req, res) => {
  res.json(ACTOR);
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../dist/index.html`));
});


const COLLECTIONS = {
  collections_list: [
    {
      id: 1, title: 'Для ценителей Хогвардса',
      picture_url: 'server/images/collections1.png',
    },
    {
      id: 2, title: 'Про настоящую любовь',
      picture_url: 'server/images/collections2.png',
    },
    {
      id: 3, title: 'Аферы века',
      picture_url: 'server/images/collections3.png',
    },
    {
      id: 4, title: 'Про Вторую Мировую',
      picture_url: 'server/images/collections4.jpg',
    },
    {
      id: 5, title: 'Осеннее настроение',
      picture_url: 'server/images/collections5.png',
    },
    {
      id: 6, title: 'Летняя атмосфера',
      picture_url: 'server/images/collections6.png',
    },
    {
      id: 7, title: 'Под Новый Год',
      picture_url: 'server/images/collections7.png',
    },
    {
      id: 8, title: 'Романтические фильмы',
      picture_url: 'server/images/collections8.jpg',
    },
    {
      id: 9, title: 'Джунгли зовут',
      picture_url: 'server/images/collections9.jpg',
    },
    {
      id: 10, title: 'Фантастические фильмы',
      picture_url: 'server/images/collections10.jpg',
    },
    {
      id: 11, title: 'Про петлю времени',
      picture_url: 'server/images/collections11.png',
    },
    {
      id: 12, title: 'Классика на века',
      picture_url: 'server/images/collections12.jpg',
    },
  ],
  collection_total: 16,
  more_available: true,
  current_limit: 12,
  current_skip: 0,
};

const ACTOR = {
  id: 1,
  picture_url: 'server/images/mad_mikkelsen.webp',
  name_rus: 'Мадс Миккельсон',
  name_en: 'Mads Mikkelsen',
  career: ['Актер', 'Сценарист', 'Продюсер'],
  height: 183,
  born: '22 ноября, 1965',
  age: 55,
  birth_place: 'Копенгаген, Дания',
  gender: 'male',
  family_status: 'married',
  film_number: 87,
  biography:'Мадс Миккельсен — датский и голливудский киноактер. Карьера Миккельсена началась поздно, однако это не помешало ему добиться больших успехов. Мировая популярность пришла к нему после роли Ганнибала Лектера в телесериале «Ганнибал»',

  popular_actor_film_current_limit: 12, // буду запрашивать примерно по 30
  popular_actor_current_skip: 0,
  film_list_with_actor: [// по рейтингу мировому
    {
      id: 13, title: 'Хоббит',
      picture_url: 'server/images/filmSlider1.webp',
    },
    {
      id: 14, title: 'Дюна',
      picture_url: 'server/images/filmSlider2.webp',
    },
    {
      id: 15, title: 'Босс Молокосос',
      picture_url: 'server/images/filmSlider3.webp',
    },
    {
      id: 16, title: 'Король Лев',
      picture_url: 'server/images/filmSlider5.webp',
    },
    {
      id: 17, title: 'Валли',
      picture_url: 'server/images/filmSlider6.webp',
    },
    {
      id: 18, title: 'Главный герой',
      picture_url: 'server/images/filmSlider7.webp',
    },
    {
      id: 19, title: 'Титаник',
      picture_url: 'server/images/filmSlider8.webp',
    },
    {
      id: 20, title: 'Дневник памяти',
      picture_url: 'server/images/filmSlider9.webp',
    },
    {
      id: 21, title: 'Стажер',
      picture_url: 'server/images/filmSlider10.webp',
    },
    {
      id: 22, title: 'Подростки',
      picture_url: 'server/images/filmSlider11.webp',
    },
    {
      id: 23, title: 'После',
      picture_url: 'server/images/filmSlider12.webp',
    },
  ],

  full_actor_film_current_limit: 6, // буду запрашивать примерно по 15
  full_actor_current_skip: 0,
  film_with_description_list: [// по возрастанию даты
    {
      id: 20,
      title: 'Дневник памяти',
      year: '2004',
      description: 'Это история отношений юноши и девушки из разных социальных слоев, живших в Южной Каролине. Ной и Элли провели вместе незабываемое лето, пока их не разделили вначале родители, а затем Вторая мировая война. После войны все изменилось: Элли обручилась с удачливым бизнесменом, а Ной жил наедине со своими воспоминаниями в старинном доме, который ему удалось отреставрировать. Когда Элли прочла об этом в местной газете, она поняла: ей нужно найти его и решить наконец судьбу их любви..',
      picture_url: 'server/images/filmSlider9.webp',
    },
    {
      id: 19,
      title: 'Титаник',
      year: '1990',
      description: 'В первом и последнем плавании шикарного «Титаника» встречаются двое. Пассажир нижней палубы Джек выиграл билет в карты, а богатая наследница Роза отправляется в Америку, чтобы выйти замуж по расчёту. Чувства молодых людей только успевают расцвести, и даже не классовые различия создадут испытания влюблённым, а айсберг, вставший на пути считавшегося непотопляемым лайнера',
      picture_url: 'server/images/filmSlider8.webp',
    },
    {
      id: 22,
      title: 'Валли',
      year: '2008',
      description: 'Робот ВАЛЛ·И из года в год прилежно трудится на опустевшей Земле, очищая нашу планету от гор мусора, которые оставили после себя улетевшие в космос люди. Он и не представляет, что совсем скоро произойдут невероятные события, благодаря которым он встретит друзей, поднимется к звездам и даже сумеет изменить к лучшему своих бывших хозяев, совсем позабывших родную Землю.',
      picture_url: 'server/images/filmSlider6.webp',
    },
    {
      id: 18,
      title: 'Главный герой',
      year: 2012,
      description: 'У сотрудника крупного банка всё идёт по накатанной, пока однажды он не выясняет, что окружающий его мир — это часть огромной видеоигры, а сам он в ней — всего лишь второстепенный персонаж. Хватит ли у него духу переписать свой код, обратить на себя внимание прекрасной девушки и, наконец, спасти мир? Одним словом, получится ли из него главный герой?',
      picture_url: 'server/images/filmSlider7.webp',
    },
    {
      id: 21,
      title: 'Стажер',
      year: '2019',
      description: '70-летний вдовец Бен Уитакер обнаруживает, что выход на пенсию — еще не конец. Пользуясь случаем, он становится старшим стажером в интернет-магазине модной одежды под руководством Джулс Остин.',
      picture_url: 'server/images/filmSlider10.webp',
    },
    {
      id: 23,
      title: 'После',
      year: '2019',
      description: 'Случайная встреча перевернула их привычный мир. Она – прилежная студентка и образцовая дочь, а он – притягательный бунтарь с непростым прошлым. Живя в параллельных вселенных, они бы вряд ли даже взглянули друг на друга. Однако этому знакомству суждено разделить жизнь влюбленных на до и после.',
      picture_url: 'server/images/filmSlider12.webp',
    },
  ],
};
const users = {
  'v@v.v': {
    name: 'Vasya',
    surname: 'Petrov',
    email: 'v@v.v',
    password: '123456as',
  },
};
const ids = {};

app.post('/api/user/register', function(req, res) {
  const name = req.body.first_name;
  const surname = req.body.surname;
  const password = req.body.password;
  const email = req.body.email;
  const passwordRepeat = req.body.password_repeat;
  if (
    !password || !email ||
      !password.match(/^\S{4,}$/) ||
      !email.match(/@/)
  ) {
    return res.status(400).json({error: 'Невалидные данные пользователя'});
  }
  if (users[email]) {
    return res.status(401).json({error: 'Пользователь уже существует'});
  }

  const id = uuid();
  const user = {
    first_name: name,
    surname: surname,
    email: email,
    password: password,
    password_repeat: passwordRepeat,
  };
  ids[id] = email;
  users[email] = user;

  res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(201).json({id});
});

app.post('/api/user/login', function (req, res) {
  const password = req.body.password;
  const email = req.body.email;
  if (!password || !email) {
    return res.status(400).json({error: 'Не указан E-Mail или пароль'});
  }
  if (!users[email] || users[email].password !== password) {
    return res.status(401).json({error: 'Не верный E-Mail и/или пароль'});
  }

  const id = uuid();
  ids[id] = email;

  res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(200).json({
      id: 1,
      first_name: "Vasya",
      surname: "Petrov",
      email: "v@v.v",
      profile_pic: "/user/images/avatar.jpg",
  });
});

const port = process.env.PORT || 8082;

app.listen(port, function() {
  console.log(`Server listening port ${port}`);
});
