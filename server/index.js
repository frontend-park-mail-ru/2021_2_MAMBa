const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const {v4: uuid} = require('uuid');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.use('/', express.static(__dirname));

app.use(body.json());
app.use(cookie());


app.get('/api/collections/getCollections/skip=0&limit=12', (req, res) => {
  res.json(COLLECTIONS);
  console.log("in col");
});

app.get('/api/actor/getActor/skipPopular=0&limitPopular=11&skipFull=0&limitFull=3&id=1', (req, res) => {
  res.json(ACTOR);
});

app.get('/api/film/getFilm/skipReview=0&limitReview=11&skipRec=0&limitRec=11&id=1', (req, res) => {
  console.log("in film api");
  res.json(FILM);
});

app.get('/api/person/getPersonFilms/id=1&skip=3&limit=3', (req, res) => {
  res.json(PERSONFILMS);
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../dist/index.html`));
});

const FILM = {
  "status": 200,
  "body": {
    "film": {
      "id": 1,
      "title": "Еще по одной",
      "title_original": "Druk",
      "origin_countries": [
        "Дания"
      ],
      "rating": 8.5,
      "poster_url": "server/images/one-more-drink.webp",
      "trailer_url": "string",
      "content_type": "film",
      "release_year": 2020,
      "duration": 132,
      "total_revenue": "12 миллионов $",
      "description": "В первом и последнем плавании шикарного «Титаника» встречаются двое. Пассажир нижней палубы Джек выиграл билет в карты, а богатая наследница Роза отправляется в Америку, чтобы выйти замуж по расчёту. Чувства молодых людей только успевают расцвести, и даже не классовые различия создадут испытания влюблённым, а айсберг, вставший на пути считавшегося непотопляемым лайнера.",
      "genres": [
        {
          "name": "Драма",
          "genre_id": 0
        }
      ],
      "director": {
        "id": 0,
        "name_en": "Mads Mikkelsen",
        "name_rus": "Томас Винтерберг",
        "picture_url": "string",
        "career": [
          "Актер"
        ]
      },
      "screenwriter": {
        "id": 0,
        "name_en": "Mads Mikkelsen",
        "name_rus": "Томас Винтерберг",
        "picture_url": "string",
        "career": [
          "Актер"
        ]
      },
      "actors": [
        {
          "id": 1,
          "name_en": "Mads Mikkelsen",
          "name_rus": "Мадс Миккельсен",
          "picture_url": "string",
          "career": [
            "Актер"
          ]
        },
        {
          "id": 2,
          "name_en": "Mads Mikkelsen",
          "name_rus": "Томас Бо Ларсен",
          "picture_url": "string",
          "career": [
            "Актер"
          ]
        },
        {
          "id": 3,
          "name_en": "Mads Mikkelsen",
          "name_rus": "Ларс Ранте",
          "picture_url": "string",
          "career": [
            "Актер"
          ]
        },
        {
          "id": 4,
          "name_en": "Mads Mikkelsen",
          "name_rus": "Мария Бонневи",
          "picture_url": "string",
          "career": [
            "Актер"
          ]
        },
      ],
    },
    "reviews": {
      "review_list": [
        {
          "id": 0,
          "film_id": 1,
          "film_name_ru": "",
          "film_name_en": "string",
          "author_name": "Леша",
          "author_picture_url": "string",
          "text": "Учители и пьют? В моей школе такого не было",
          "review_type": -1,
          "date": "2021-10-28"
        },
        {
          "id": 1,
          "film_id": 1,
          "film_name_ru": "",
          "film_name_en": "string",
          "author_name": "Макс",
          "author_picture_url": "",
          "text": "Впечатлился еще как, думаю, пересмотрю-ка я этот фильм еще раз, слищком глубокий смысл",
          "review_type": 1,
          "date": "2021-10-29"
        },
        {
          "id": 2,
          "film_id": 1,
          "film_name_ru": "string",
          "film_name_en": "string",
          "author_name": "Борис",
          "author_picture_url": "",
          "text": "Ну как бы а какой смысл? Правильно, без смысла и не информативно, только напрягает и всё. Время занять",
          "review_type": 0,
          "date": "2021-10-30"
        },
        {
          "id": 3,
          "film_id": 1,
          "film_name_ru": "",
          "film_name_en": "string",
          "author_name": "Лиза",
          "author_picture_url": "string",
          "text": "Лично мне понравилось, очень красивая картинка",
          "review_type": 1,
          "date": "2021-10-28"
        },
        {
          "id": 4,
          "film_id": 1,
          "film_name_ru": "",
          "film_name_en": "string",
          "author_name": "Катя",
          "author_picture_url": "",
          "text": "Ну как-то не продумано, где логика, где смысл",
          "review_type": -1,
          "date": "2021-10-29"
        },
        {
          "id": 5,
          "film_id": 1,
          "film_name_ru": "string",
          "film_name_en": "string",
          "author_name": "Марина",
          "author_picture_url": "",
          "text": "ОООООчень понравился, затрагивает многие темы, причем глупокие, всем советую",
          "review_type": 1,
          "date": "2021-10-30"
        }
      ],
      "more_available": true,
      "review_total": 0,
      "current_sort": "string",
      "current_limit": 0,
      "current_skip": 0
    },
    "recommendations": {
      "recommendation_list": [
        {
          id: 13, title: 'Хоббит',
          poster_url: 'server/images/filmSlider1.webp',
        },
        {
          id: 14, title: 'Дюна',
          poster_url: 'server/images/filmSlider2.webp',
        },
        {
          id: 15, title: 'Босс Молокосос',
          poster_url: 'server/images/filmSlider3.webp',
        },
        {
          id: 16, title: 'Король Лев',
          poster_url: 'server/images/filmSlider5.webp',
        },
        {
          id: 17, title: 'Валли',
          poster_url: 'server/images/filmSlider6.webp',
        },
        {
          id: 18, title: 'Главный герой',
          poster_url: 'server/images/filmSlider7.webp',
        },
        {
          id: 19, title: 'Титаник',
          poster_url: 'server/images/filmSlider8.webp',
        },
        {
          id: 20, title: 'Дневник памяти',
          poster_url: 'server/images/filmSlider9.webp',
        },
        {
          id: 21, title: 'Стажер',
          poster_url: 'server/images/filmSlider10.webp',
        },
        {
          id: 22, title: 'Подростки',
          poster_url: 'server/images/filmSlider11.webp',
        },
        {
          id: 23, title: 'После',
          poster_url: 'server/images/filmSlider12.webp',
        },
      ],
      "more_available": true,
      "recommendation_total": 0,
      "current_sort": "string",
      "current_limit": 11,
      "current_skip": 0
    },
    "my_rating": -1
  }
};

const PERSONFILMS = {
  full_actor_film_current_limit: 3,
  full_actor_current_skip: 3,
  more_available: false,
  film_with_description_list: [
    {
      id: 18,
      title: 'Главный герой',
      year: 2012,
      description: 'У сотрудника крупного банка всё идёт по накатанной, пока однажды он не выясняет, что окружающий его мир — это часть огромной видеоигры, а сам он в ней — всего лишь второстепенный персонаж. Хватит ли у него духу переписать свой код, обратить на себя внимание прекрасной девушки и, наконец, спасти мир? Одним словом, получится ли из него главный герой?',
      poster_url: 'server/images/filmSlider7.webp',
    },
    {
      id: 21,
      title: 'Стажер',
      year: '2019',
      description: '70-летний вдовец Бен Уитакер обнаруживает, что выход на пенсию — еще не конец. Пользуясь случаем, он становится старшим стажером в интернет-магазине модной одежды под руководством Джулс Остин.',
      poster_url: 'server/images/filmSlider10.webp',
    },
    {
      id: 23,
      title: 'После',
      year: '2019',
      description: 'Случайная встреча перевернула их привычный мир. Она – прилежная студентка и образцовая дочь, а он – притягательный бунтарь с непростым прошлым. Живя в параллельных вселенных, они бы вряд ли даже взглянули друг на друга. Однако этому знакомству суждено разделить жизнь влюбленных на до и после.',
      poster_url: 'server/images/filmSlider12.webp',
    },
  ],
};


const COLLECTIONS = {
  collections_list: [
    {
      id: 1, title: 'Для ценителей Хогвардса',
      poster_url: 'server/images/collections1.png',
    },
    {
      id: 2, title: 'Про настоящую любовь',
      poster_url: 'server/images/collections2.png',
    },
    {
      id: 3, title: 'Аферы века',
      poster_url: 'server/images/collections3.png',
    },
    {
      id: 4, title: 'Про Вторую Мировую',
      poster_url: 'server/images/collections4.jpg',
    },
    {
      id: 5, title: 'Осеннее настроение',
      poster_url: 'server/images/collections5.png',
    },
    {
      id: 6, title: 'Летняя атмосфера',
      poster_url: 'server/images/collections6.png',
    },
    {
      id: 7, title: 'Под Новый Год',
      poster_url: 'server/images/collections7.png',
    },
    {
      id: 8, title: 'Романтические фильмы',
      poster_url: 'server/images/collections8.jpg',
    },
    {
      id: 9, title: 'Джунгли зовут',
      poster_url: 'server/images/collections9.jpg',
    },
    {
      id: 10, title: 'Фантастические фильмы',
      poster_url: 'server/images/collections10.jpg',
    },
    {
      id: 11, title: 'Про петлю времени',
      poster_url: 'server/images/collections11.png',
    },
    {
      id: 12, title: 'Классика на века',
      poster_url: 'server/images/collections12.jpg',
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
  biography: 'Мадс Миккельсен — датский и голливудский киноактер. Карьера Миккельсена началась поздно, однако это не помешало ему добиться больших успехов. Мировая популярность пришла к нему после роли Ганнибала Лектера в телесериале «Ганнибал»',

  popular_actor_film_current_limit: 12,
  popular_actor_current_skip: 0,
  film_list_with_actor: [
    {
      id: 13, title: 'Хоббит',
      poster_url: 'server/images/filmSlider1.webp',
    },
    {
      id: 14, title: 'Дюна',
      poster_url: 'server/images/filmSlider2.webp',
    },
    {
      id: 15, title: 'Босс Молокосос',
      poster_url: 'server/images/filmSlider3.webp',
    },
    {
      id: 16, title: 'Король Лев',
      poster_url: 'server/images/filmSlider5.webp',
    },
    {
      id: 17, title: 'Валли',
      poster_url: 'server/images/filmSlider6.webp',
    },
    {
      id: 18, title: 'Главный герой',
      poster_url: 'server/images/filmSlider7.webp',
    },
    {
      id: 19, title: 'Титаник',
      poster_url: 'server/images/filmSlider8.webp',
    },
    {
      id: 20, title: 'Дневник памяти',
      poster_url: 'server/images/filmSlider9.webp',
    },
    {
      id: 21, title: 'Стажер',
      poster_url: 'server/images/filmSlider10.webp',
    },
    {
      id: 22, title: 'Подростки',
      poster_url: 'server/images/filmSlider11.webp',
    },
    {
      id: 23, title: 'После',
      poster_url: 'server/images/filmSlider12.webp',
    },
  ],

  full_actor_film_current_limit: 3,
  full_actor_current_skip: 0,
  more_available: true,
  film_with_description_list: [
    {
      id: 20,
      title: 'Дневник памяти',
      year: '2004',
      description: 'Это история отношений юноши и девушки из разных социальных слоев, живших в Южной Каролине. Ной и Элли провели вместе незабываемое лето, пока их не разделили вначале родители, а затем Вторая мировая война. После войны все изменилось: Элли обручилась с удачливым бизнесменом, а Ной жил наедине со своими воспоминаниями в старинном доме, который ему удалось отреставрировать. Когда Элли прочла об этом в местной газете, она поняла: ей нужно найти его и решить наконец судьбу их любви..',
      poster_url: 'server/images/filmSlider9.webp',
    },
    {
      id: 19,
      title: 'Титаник',
      year: '1990',
      description: 'В первом и последнем плавании шикарного «Титаника» встречаются двое. Пассажир нижней палубы Джек выиграл билет в карты, а богатая наследница Роза отправляется в Америку, чтобы выйти замуж по расчёту. Чувства молодых людей только успевают расцвести, и даже не классовые различия создадут испытания влюблённым, а айсберг, вставший на пути считавшегося непотопляемым лайнера',
      poster_url: 'server/images/filmSlider8.webp',
    },
    {
      id: 22,
      title: 'Валли',
      year: '2008',
      description: 'Робот ВАЛЛ·И из года в год прилежно трудится на опустевшей Земле, очищая нашу планету от гор мусора, которые оставили после себя улетевшие в космос люди. Он и не представляет, что совсем скоро произойдут невероятные события, благодаря которым он встретит друзей, поднимется к звездам и даже сумеет изменить к лучшему своих бывших хозяев, совсем позабывших родную Землю.',
      poster_url: 'server/images/filmSlider6.webp',
    },
  ],
};
const users = {
  'vasya@bk.ru': {
    name: 'Vasya',
    surname: 'Petrov',
    email: 'vasya@bk.ru',
    password: 'password',
  },
};
const ids = {};

app.post('/signup', function (req, res) {
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

app.post('/login', function (req, res) {
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

const port = process.env.PORT || 8085;

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});
