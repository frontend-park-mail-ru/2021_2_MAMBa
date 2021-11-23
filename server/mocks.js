const {v4: uuid} = require('uuid');
const path = require('path');

const initMocks = (app) => {
  app.get('/api/collections/getCollections', (req, res) => {
    res.json(COLLECTIONS);
  });

  app.get('/api/genres/getGenres', (req, res) => {
    res.json(GENRES);
  });

  app.get('/api/genres/getGenre', (req, res) => {
    if (req.query.skip == 6) {
      res.json(GENRESKIP6);
    }
    if (req.query.skip == 12) {
      res.json(GENRENOTAVAILABLE);
    }
    if (req.query.skip == 0) {
      res.json(GENRE);
    }
  });

  app.get('/api/genres/getGenreFilms', (req, res) => {
    if (req.query.skip == 6) {
      res.json(GENRESKIP6);
    }
    if (req.query.skip == 12) {
      res.json(GENRENOTAVAILABLE);
    }
  });

  app.get('/api/person/getPerson', (req, res) => {
    res.json(ACTOR);
  });

  app.get('/api/person/getPersonFilms', (req, res) => {
    res.json(PERSONFILMS);
  });

  app.get('/api/film/getFilm', (req, res) => {
    if (req.query.id === "1") {
      res.json(FILM);
    }
    if (req.query.id === "2") {
      res.json(FILM2);
    }
  });

  app.get('/api/person/getPersonFilms?id=1&skip=3&limit=3', (req, res) => {
    res.json(PERSONFILMS);
  });

  app.get('/api/film/getReview/id=1', (req, res) => {
    res.json(REVIEW);
  });

  app.get('/api/user/354', (req, res) => {
    res.json({
      "status": 200,
      "body": {
        "id": 354,
        "first_name": 'Vasya',
        "surname": 'Petrov',
        "email": 'v@v.v',
        "profile_pic": "/user/images/avatar.jpg"
      }
    });
  });

  app.get('/api/user/checkAuth', (req, res) => {
    res.json({
      "status": 200,
      "body": {
        "id": 354
      }
    });
  });

  app.get('/api/user/getProfile', (req, res) => {
    res.json({
      "status": 200,
      "body": {
        "id": 354,
        "first_name": "Vasya",
        "surname": "Petrov",
        "picture_url": "/user/images/avatar.jpg",
        "email": "v@v.v",
        "gender": "male",
        "register_date": "2021-10-29",
        "sub_count": 3,
        "bookmark_count": 10,
      }
    });
  });

  app.get('/api/collections/getCollectionFilms', (req, res) => {
    res.json(COLLECTION);
  });


  const GENRESKIP6 = {
    status: 200,
    body: {
      id: 11,
      title: 'Приключения',
      current_skip: 6,
      current_limit: 6,
      more_available: true,
      film_list: [
        {
          id: 18,
          title: 'Главный герой',
          release_year: 2012,
          description: 'У сотрудника крупного банка всё идёт по накатанной, пока однажды он не выясняет, что окружающий его мир — это часть огромной видеоигры, а сам он в ней — всего лишь второстепенный персонаж. Хватит ли у него духу переписать свой код, обратить на себя внимание прекрасной девушки и, наконец, спасти мир? Одним словом, получится ли из него главный герой?',
          poster_url: '/server/images/filmSlider7.webp',
        },
        {
          id: 21,
          title: 'Стажер',
          release_year: '2019',
          description: '70-летний вдовец Бен Уитакер обнаруживает, что выход на пенсию — еще не конец. Пользуясь случаем, он становится старшим стажером в интернет-магазине модной одежды под руководством Джулс Остин.',
          poster_url: '/server/images/filmSlider10.webp',
        },
        {
          id: 23,
          title: 'После',
          release_year: '2019',
          description: 'Случайная встреча перевернула их привычный мир. Она – прилежная студентка и образцовая дочь, а он – притягательный бунтарь с непростым прошлым. Живя в параллельных вселенных, они бы вряд ли даже взглянули друг на друга. Однако этому знакомству суждено разделить жизнь влюбленных на до и после.',
          poster_url: '/server/images/filmSlider12.webp',
        },
      ],
    },
  };


  const GENRENOTAVAILABLE = {
    status: 200,
    body: {
      id: 11,
      title: 'Приключения',
      current_skip: 6,
      current_limit: 6,
      more_available: false,
      film_list: [
        {
          id: 18,
          title: 'GG',
          release_year: 2012,
          description: 'У сотрудника крупного банка всё идёт по накатанной, пока однажды он не выясняет, что окружающий его мир — это часть огромной видеоигры, а сам он в ней — всего лишь второстепенный персонаж. Хватит ли у него духу переписать свой код, обратить на себя внимание прекрасной девушки и, наконец, спасти мир? Одним словом, получится ли из него главный герой?',
          poster_url: '/server/images/filmSlider7.webp',
        },
        {
          id: 21,
          title: 'GG',
          release_year: '2019',
          description: '70-летний вдовец Бен Уитакер обнаруживает, что выход на пенсию — еще не конец. Пользуясь случаем, он становится старшим стажером в интернет-магазине модной одежды под руководством Джулс Остин.',
          poster_url: '/server/images/filmSlider10.webp',
        },
        {
          id: 23,
          title: 'GG',
          release_year: '2019',
          description: 'Случайная встреча перевернула их привычный мир. Она – прилежная студентка и образцовая дочь, а он – притягательный бунтарь с непростым прошлым. Живя в параллельных вселенных, они бы вряд ли даже взглянули друг на друга. Однако этому знакомству суждено разделить жизнь влюбленных на до и после.',
          poster_url: '/server/images/filmSlider12.webp',
        },
        {
          id: 18,
          title: 'GG',
          release_year: 2012,
          description: 'У сотрудника крупного банка всё идёт по накатанной, пока однажды он не выясняет, что окружающий его мир — это часть огромной видеоигры, а сам он в ней — всего лишь второстепенный персонаж. Хватит ли у него духу переписать свой код, обратить на себя внимание прекрасной девушки и, наконец, спасти мир? Одним словом, получится ли из него главный герой?',
          poster_url: '/server/images/filmSlider7.webp',
        },
        {
          id: 21,
          title: 'GG',
          release_year: '2019',
          description: '70-летний вдовец Бен Уитакер обнаруживает, что выход на пенсию — еще не конец. Пользуясь случаем, он становится старшим стажером в интернет-магазине модной одежды под руководством Джулс Остин.',
          poster_url: '/server/images/filmSlider10.webp',
        },
        {
          id: 23,
          title: 'GG',
          release_year: '2019',
          description: 'Случайная встреча перевернула их привычный мир. Она – прилежная студентка и образцовая дочь, а он – притягательный бунтарь с непростым прошлым. Живя в параллельных вселенных, они бы вряд ли даже взглянули друг на друга. Однако этому знакомству суждено разделить жизнь влюбленных на до и после.',
          poster_url: '/server/images/filmSlider12.webp',
        },
      ],
    },
  };
  const CALENDAR = {
    status: 200,
    body: {

      films: [
          {
            id: 20,
            title: 'Дневник памяти',
            release_year: '2004',
            description: 'Это история отношений юноши и девушки из разных социальных слоев, живших в Южной Каролине. Ной и Элли провели вместе незабываемое лето, пока их не разделили вначале родители, а затем Вторая мировая война. После войны все изменилось: Элли обручилась с удачливым бизнесменом, а Ной жил наедине со своими воспоминаниями в старинном доме, который ему удалось отреставрировать. Когда Элли прочла об этом в местной газете, она поняла: ей нужно найти его и решить наконец судьбу их любви..',
            poster_url: '/server/images/filmSlider9.webp',
            premiereR: "2021-11-25",
          },
          {
            id: 19,
            title: 'Титаник',
            release_year: '1990',
            description: 'В первом и последнем плавании шикарного «Титаника» встречаются двое. Пассажир нижней палубы Джек выиграл билет в карты, а богатая наследница Роза отправляется в Америку, чтобы выйти замуж по расчёту. Чувства молодых людей только успевают расцвести, и даже не классовые различия создадут испытания влюблённым, а айсберг, вставший на пути считавшегося непотопляемым лайнера',
            poster_url: '/server/images/filmSlider8.webp',
            premiereR: "2021-11-25",
          },
          {
            id: 22,
            title: 'Валли',
            release_year: '2008',
            description: 'Робот ВАЛЛ·И из года в год прилежно трудится на опустевшей Земле, очищая нашу планету от гор мусора, которые оставили после себя улетевшие в космос люди. Он и не представляет, что совсем скоро произойдут невероятные события, благодаря которым он встретит друзей, поднимется к звездам и даже сумеет изменить к лучшему своих бывших хозяев, совсем позабывших родную Землю.',
            poster_url: '/server/images/filmSlider6.webp',
            premiereR: "2021-11-25",
          },
        ],
    }
  };

  const COLLECTION = {
    collection: {
      "id": 1,
      "collection_name": "Для ценителей Хорг",
      "description": "В ресторане собираются учитель истории, психологии, музыки и физрук, чтобы отметить 40-летие одного из них. И решают проверить научную теорию о том, что c самого рождения человек страдает от нехватки алкоголя в крови, а чтобы стать по-настоящему счастливым, нужно быть немного нетрезвым. Друзья договариваются наблюдать, как возлияния скажутся на их работе и личной жизни, и устанавливают правила: не пить вечером и по выходным. Казалось бы, что может пойти не так?",
    },
    films: [
      {
        id: 18,
        title: 'Главный герой',
        release_year: 2012,
        description: 'У сотрудника крупного банка всё идёт по накатанной, пока однажды он не выясняет, что окружающий его мир — это часть огромной видеоигры, а сам он в ней — всего лишь второстепенный персонаж. Хватит ли у него духу переписать свой код, обратить на себя внимание прекрасной девушки и, наконец, спасти мир? Одним словом, получится ли из него главный герой?',
        poster_url: '/server/images/filmSlider7.webp',
      },
      {
        id: 21,
        title: 'Стажер',
        release_year: '2019',
        description: '70-летний вдовец Бен Уитакер обнаруживает, что выход на пенсию — еще не конец. Пользуясь случаем, он становится старшим стажером в интернет-магазине модной одежды под руководством Джулс Остин.',
        poster_url: '/server/images/filmSlider10.webp',
      },
      {
        id: 23,
        title: 'После',
        release_year: '2019',
        description: 'Случайная встреча перевернула их привычный мир. Она – прилежная студентка и образцовая дочь, а он – притягательный бунтарь с непростым прошлым. Живя в параллельных вселенных, они бы вряд ли даже взглянули друг на друга. Однако этому знакомству суждено разделить жизнь влюбленных на до и после.',
        poster_url: '/server/images/filmSlider12.webp',
      },
    ],
  };


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
}

const FILM2 = {
  film: {
    "id": 2,
    "title": "С любовью, Рози",
    "title_original": "Rosie",
    "origin_countries": [
      "Дания"
    ],
    "rating": 8.5,
    "poster_url": "/server/images/love-rosie.webp",
    "trailer_url": "string",
    "content_type": "film",
    "release_year": 2014,
    "duration": 132,
    "total_revenue": "12 миллионов $",
    "description": "В ресторане собираются учитель истории, психологии, музыки и физрук, чтобы отметить 40-летие одного из них. И решают проверить научную теорию о том, что c самого рождения человек страдает от нехватки алкоголя в крови, а чтобы стать по-настоящему счастливым, нужно быть немного нетрезвым. Друзья договариваются наблюдать, как возлияния скажутся на их работе и личной жизни, и устанавливают правила: не пить вечером и по выходным. Казалось бы, что может пойти не так?",
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
    "cast": [
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
        "text": "После просмотра этого фильма в ушах продолжает играет крутая песня, которая звучала в конце, а после стала главным саундтреком. Мадс Миккельсен просто бесподобен в этой роли. До этого я его видел(а) только в роли Ганнибала, где он не менее поразил меня.\n" +
            "\n" +
            "Глядя на постер, я и не думала, что фильм будет таким глубоким и серьёзным. Я ждала какую-то комедию про веселуху и пьянки. А тут намного серьёзнее история. Посыл очень хороший, но может не до всех дойти. Кто-то может воспринять фильм так: мол, я взрослый и могу делать, что хочу. А другой увидит в этой картине главную мысль, что, взрослея, мы несём с каждым днём всё больше ответственности за свои поступки. Любой кураж несёт за собой необратимые последствия, о чём не стоит забывать! В этом и разница нас, взрослых, от молодых школьников. Что в 18 лет казалось крутым и безбашенным, то в 40 лет может сыграть злую шутку.",
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
        poster_url: '/server/images/filmSlider1.webp',
      },
      {
        id: 14, title: 'Дюна',
        poster_url: '/server/images/filmSlider2.webp',
      },
      {
        id: 15, title: 'Босс Молокосос',
        poster_url: '/server/images/filmSlider3.webp',
      },
      {
        id: 16, title: 'Король Лев',
        poster_url: '/server/images/filmSlider5.webp',
      },
      {
        id: 17, title: 'Валли',
        poster_url: '/server/images/filmSlider6.webp',
      },
      {
        id: 18, title: 'Главный герой',
        poster_url: '/server/images/filmSlider7.webp',
      },
      {
        id: 19, title: 'Титаник',
        poster_url: '/server/images/filmSlider8.webp',
      },
      {
        id: 20, title: 'Дневник памяти',
        poster_url: '/server/images/filmSlider9.webp',
      },
      {
        id: 21, title: 'Стажер',
        poster_url: '/server/images/filmSlider10.webp',
      },
      {
        id: 22, title: 'Подростки',
        poster_url: '/server/images/filmSlider11.webp',
      },
      {
        id: 23, title: 'После',
        poster_url: '/server/images/filmSlider12.webp',
      },
    ],
    "more_available": true,
    "recommendation_total": 0,
    "current_sort": "string",
    "current_limit": 11,
    "current_skip": 0
  },
  "my_rating": -1
};


const REVIEW = {
  "id": 0,
  "film_id": 1,
  "film_title_ru": "Еще по одной",
  "author_name": "Макс Дудник",
  "author_picture_url": "/server/images/avatar.webp",
  "review_text": "После просмотра этого фильма в ушах продолжает играет крутая песня, которая звучала в конце, а после стала главным саундтреком. Мадс Миккельсен просто бесподобен в этой роли. До этого я его видел(а) только в роли Ганнибала, где он не менее поразил меня.\n" +
      "\n" +
      "Глядя на постер, я и не думала, что фильм будет таким глубоким и серьёзным. Я ждала какую-то комедию про веселуху и пьянки. А тут намного серьёзнее история. Посыл очень хороший, но может не до всех дойти. Кто-то может воспринять фильм так: мол, я взрослый и могу делать, что хочу. А другой увидит в этой картине главную мысль, что, взрослея, мы несём с каждым днём всё больше ответственности за свои поступки. Любой кураж несёт за собой необратимые последствия, о чём не стоит забывать! В этом и разница нас, взрослых, от молодых школьников. Что в 18 лет казалось крутым и безбашенным, то в 40 лет может сыграть злую шутку.",
  "review_type": 1,
  "stars": 0,
  "date": "2021-10-30"
};

const PERSONFILMS = {
  status: 200,
  body: {
    current_skip: 3,
    current_limit: 3,
    more_available: true,
    film_list: [
      {
        id: 18,
        title: 'Главный герой',
        release_year: 2012,
        description: 'У сотрудника крупного банка всё идёт по накатанной, пока однажды он не выясняет, что окружающий его мир — это часть огромной видеоигры, а сам он в ней — всего лишь второстепенный персонаж. Хватит ли у него духу переписать свой код, обратить на себя внимание прекрасной девушки и, наконец, спасти мир? Одним словом, получится ли из него главный герой?',
        poster_url: '/server/images/filmSlider7.webp',
      },
      {
        id: 21,
        title: 'Стажер',
        release_year: '2019',
        description: '70-летний вдовец Бен Уитакер обнаруживает, что выход на пенсию — еще не конец. Пользуясь случаем, он становится старшим стажером в интернет-магазине модной одежды под руководством Джулс Остин.',
        poster_url: '/server/images/filmSlider10.webp',
      },
      {
        id: 23,
        title: 'После',
        release_year: '2019',
        description: 'Случайная встреча перевернула их привычный мир. Она – прилежная студентка и образцовая дочь, а он – притягательный бунтарь с непростым прошлым. Живя в параллельных вселенных, они бы вряд ли даже взглянули друг на друга. Однако этому знакомству суждено разделить жизнь влюбленных на до и после.',
        poster_url: '/server/images/filmSlider12.webp',
      },
    ],
  },
};


const GENRE = {
  status: 200,
  body: {
    id: 11,
    title: 'Приключения',
    current_skip: 0,
    current_limit: 6,
    more_available: true,
    film_list: [
      {
        id: 18,
        title: 'Главный герой',
        release_year: 2012,
        description: 'У сотрудника крупного банка всё идёт по накатанной, пока однажды он не выясняет, что окружающий его мир — это часть огромной видеоигры, а сам он в ней — всего лишь второстепенный персонаж. Хватит ли у него духу переписать свой код, обратить на себя внимание прекрасной девушки и, наконец, спасти мир? Одним словом, получится ли из него главный герой?',
        poster_url: '/server/images/filmSlider7.webp',
      },
      {
        id: 21,
        title: 'Стажер',
        release_year: '2019',
        description: '70-летний вдовец Бен Уитакер обнаруживает, что выход на пенсию — еще не конец. Пользуясь случаем, он становится старшим стажером в интернет-магазине модной одежды под руководством Джулс Остин.',
        poster_url: '/server/images/filmSlider10.webp',
      },
      {
        id: 23,
        title: 'После',
        release_year: '2019',
        description: 'Случайная встреча перевернула их привычный мир. Она – прилежная студентка и образцовая дочь, а он – притягательный бунтарь с непростым прошлым. Живя в параллельных вселенных, они бы вряд ли даже взглянули друг на друга. Однако этому знакомству суждено разделить жизнь влюбленных на до и после.',
        poster_url: '/server/images/filmSlider12.webp',
      },
    ],
  },
};

const GENRES = {
  status: 200,
  body: {
    genres_list: [
      {
        id: 1, title: 'Боевик',
        picture_url: '/server/genreIcons/action.svg',
      },
      {
        id: 2, title: 'Комедия',
        picture_url: '/server/genreIcons/comedy.svg',
      },
      {
        id: 3, title: 'Криминал',
        picture_url: '/server/genreIcons/criminal.svg',
      },
      {
        id: 4, title: 'Детектив',
        picture_url: '/server/genreIcons/detective.svg',
      },
      {
        id: 5, title: 'Аниме',
        picture_url: '/server/genreIcons/anime.svg',
      },
      {
        id: 6, title: 'Документальный',
        picture_url: '/server/genreIcons/documentary.svg',
      },
      {
        id: 7, title: 'Драма',
        picture_url: '/server/genreIcons/drama.svg',
      },
      {
        id: 8, title: 'Мелодрама',
        picture_url: '/server/genreIcons/romantic.svg',
      },
      {
        id: 9, title: 'Ужасы',
        picture_url: 'server/genreIcons/horror.svg',
      },
      {
        id: 10, title: 'Семейный',
        picture_url: '/server/genreIcons/family.svg',
      },
      {
        id: 11, title: 'Приключения',
        picture_url: '/server/genreIcons/adventures.svg',
      },
      {
        id: 12, title: 'Триллеры',
        picture_url: '/server/genreIcons/triller.svg',
      },
      {
        id: 13, title: 'Исторический',
        picture_url: '/server/genreIcons/historic.svg',
      },
      {
        id: 14, title: 'Вестерн',
        picture_url: 'server/genreIcons/western.svg',
      },
      {
        id: 14, title: 'Фантастика',
        picture_url: '/server/genreIcons/fantasy.svg',
      },
    ],
  }
};

const COLLECTIONS = {
  status: 200,
  body: {
    collections_list: [
      {
        id: 1, title: 'Для ценителей Хогвардса',
        picture_url: '/server/images/1.webp',
      },
      {
        id: 2, title: 'Про настоящую любовь',
        picture_url: '/server/images/2.webp',
      },
      {
        id: 3, title: 'Аферы века',
        picture_url: '/server/images/3.webp',
      },
      {
        id: 4, title: 'Про Вторую Мировую',
        picture_url: '/server/images/4.webp',
      },
      {
        id: 5, title: 'Осеннее настроение',
        picture_url: '/server/images/5.webp',
      },
      {
        id: 6, title: 'Летняя атмосфера',
        picture_url: '/server/images/6.webp',
      },
      {
        id: 7, title: 'Под Новый Год',
        picture_url: '/server/images/7.webp',
      },
      {
        id: 8, title: 'Романтические фильмы',
        picture_url: '/server/images/8.webp',
      },
      {
        id: 9, title: 'Джунгли зовут',
        picture_url: '/server/images/9.webp',
      },
      {
        id: 10, title: 'Фантастические фильмы',
        picture_url: '/server/images/10.webp',
      },
      {
        id: 11, title: 'Про петлю времени',
        picture_url: 'server/images/11.webp',
      },
      {
        id: 12, title: 'Классика на века',
        picture_url: '/server/images/12.webp',
      },
    ],
    collection_total: 16,
    more_available: true,
    current_limit: 12,
    current_skip: 0,
  }
};

const ACTOR = {
  status: 200,
  body: {
    actor: {
      id: 1,
      picture_url: '/server/images/mad_mikkelsen.webp',
      name_rus: 'Мадс Миккельсон',
      name_en: 'Mads Mikkelsen',
      career: ['Актер', 'Сценарист', 'Продюсер'],
      height: 1.83,
      birthday: '22 ноября, 1965',
      age: 55,
      birth_place: 'Копенгаген, Дания',
      gender: "Мужской",
      family_status: "Женат на Ханне Якобсен, двое детей",
      film_number: 87,
      biography: 'Мадс Миккельсен — датский и голливудский киноактер. Карьера Миккельсена началась поздно, однако это не помешало ему добиться больших успехов. Мировая популярность пришла к нему после роли Ганнибала Лектера в телесериале «Ганнибал»',
    },
    films: {
      film_list: [
        {
          id: 20,
          title: 'Дневник памяти',
          release_year: '2004',
          description: 'Это история отношений юноши и девушки из разных социальных слоев, живших в Южной Каролине. Ной и Элли провели вместе незабываемое лето, пока их не разделили вначале родители, а затем Вторая мировая война. После войны все изменилось: Элли обручилась с удачливым бизнесменом, а Ной жил наедине со своими воспоминаниями в старинном доме, который ему удалось отреставрировать. Когда Элли прочла об этом в местной газете, она поняла: ей нужно найти его и решить наконец судьбу их любви..',
          poster_url: '/server/images/filmSlider9.webp',
        },
        {
          id: 19,
          title: 'Титаник',
          release_year: '1990',
          description: 'В первом и последнем плавании шикарного «Титаника» встречаются двое. Пассажир нижней палубы Джек выиграл билет в карты, а богатая наследница Роза отправляется в Америку, чтобы выйти замуж по расчёту. Чувства молодых людей только успевают расцвести, и даже не классовые различия создадут испытания влюблённым, а айсберг, вставший на пути считавшегося непотопляемым лайнера',
          poster_url: '/server/images/filmSlider8.webp',
        },
        {
          id: 22,
          title: 'Валли',
          release_year: '2008',
          description: 'Робот ВАЛЛ·И из года в год прилежно трудится на опустевшей Земле, очищая нашу планету от гор мусора, которые оставили после себя улетевшие в космос люди. Он и не представляет, что совсем скоро произойдут невероятные события, благодаря которым он встретит друзей, поднимется к звездам и даже сумеет изменить к лучшему своих бывших хозяев, совсем позабывших родную Землю.',
          poster_url: '/server/images/filmSlider6.webp',
        },
      ],
      more_available: true,
      film_total: 0,
      current_limit: 3,
      current_skip: 0
    },
    popular_films: {
      film_list: [
        {
          id: 2,
          title: "С любовью, Рози ",
          poster_url: "/server/images/love-rosie.webp",
        },
        {
          id: 13, title: 'Хоббит',
          poster_url: '/server/images/filmSlider1.webp',
        },
        {
          id: 14, title: 'Дюна',
          poster_url: '/server/images/filmSlider2.webp',
        },
        {
          id: 15, title: 'Босс Молокосос',
          poster_url: '/server/images/filmSlider3.webp',
        },
        {
          id: 16, title: 'Король Лев',
          poster_url: '/server/images/filmSlider5.webp',
        },
        {
          id: 17, title: 'Валли',
          poster_url: '/server/images/filmSlider6.webp',
        },
        {
          id: 18, title: 'Главный герой',
          poster_url: '/server/images/filmSlider7.webp',
        },
        {
          id: 19, title: 'Титаник',
          poster_url: '/server/images/filmSlider8.webp',
        },
        {
          id: 20, title: 'Дневник памяти',
          poster_url: '/server/images/filmSlider9.webp',
        },
        {
          id: 21, title: 'Стажер',
          poster_url: '/server/images/filmSlider10.webp',
        },
        {
          id: 22, title: 'Подростки',
          poster_url: '/server/images/filmSlider11.webp',
        },
        {
          id: 23, title: 'После',
          poster_url: '/server/images/filmSlider12.webp',
        },
      ],
      more_available: true,
      film_total: 0,
      current_limit: 11,
      current_skip: 0
    }
  }
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

const FILM = {
  status: 200,
  body: {
    film: {
      "id": 1,
      "title": "Еще по одной",
      "title_original": "Druk",
      "origin_countries": [
        "Дания"
      ],
      "rating": 8.5,
      "poster_url": "/server/images/one-more-drink.webp",
      "trailer_url": "string",
      "content_type": "film",
      "release_year": 2020,
      "duration": 132,
      "total_revenue": "12 миллионов $",
      "description": "В ресторане собираются учитель истории, психологии, музыки и физрук, чтобы отметить 40-летие одного из них. И решают проверить научную теорию о том, что c самого рождения человек страдает от нехватки алкоголя в крови, а чтобы стать по-настоящему счастливым, нужно быть немного нетрезвым. Друзья договариваются наблюдать, как возлияния скажутся на их работе и личной жизни, и устанавливают правила: не пить вечером и по выходным. Казалось бы, что может пойти не так?",
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
      "cast": [
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
          "text": "После просмотра этого фильма в ушах продолжает играет крутая песня, которая звучала в конце, а после стала главным саундтреком. Мадс Миккельсен просто бесподобен в этой роли. До этого я его видел(а) только в роли Ганнибала, где он не менее поразил меня.\n" +
              "\n" +
              "Глядя на постер, я и не думала, что фильм будет таким глубоким и серьёзным. Я ждала какую-то комедию про веселуху и пьянки. А тут намного серьёзнее история. Посыл очень хороший, но может не до всех дойти. Кто-то может воспринять фильм так: мол, я взрослый и могу делать, что хочу. А другой увидит в этой картине главную мысль, что, взрослея, мы несём с каждым днём всё больше ответственности за свои поступки. Любой кураж несёт за собой необратимые последствия, о чём не стоит забывать! В этом и разница нас, взрослых, от молодых школьников. Что в 18 лет казалось крутым и безбашенным, то в 40 лет может сыграть злую шутку.",
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
          id: 2, title: 'С любовью Рози',
          poster_url: '/server/images/filmSlider1.webp',
        },
        {
          id: 14, title: 'Дюна',
          poster_url: '/server/images/filmSlider2.webp',
        },
        {
          id: 15, title: 'Босс Молокосос',
          poster_url: '/server/images/filmSlider3.webp',
        },
        {
          id: 16, title: 'Король Лев',
          poster_url: '/server/images/filmSlider5.webp',
        },
        {
          id: 17, title: 'Валли',
          poster_url: '/server/images/filmSlider6.webp',
        },
        {
          id: 18, title: 'Главный герой',
          poster_url: '/server/images/filmSlider7.webp',
        },
        {
          id: 19, title: 'Титаник',
          poster_url: '/server/images/filmSlider8.webp',
        },
        {
          id: 20, title: 'Дневник памяти',
          poster_url: '/server/images/filmSlider9.webp',
        },
        {
          id: 21, title: 'Стажер',
          poster_url: '/server/images/filmSlider10.webp',
        },
        {
          id: 22, title: 'Подростки',
          poster_url: '/server/images/filmSlider11.webp',
        },
        {
          id: 23, title: 'После',
          poster_url: '/server/images/filmSlider12.webp',
        },
      ],
      "more_available": true,
      "recommendation_total": 0,
      "current_sort": "string",
      "current_limit": 11,
      "current_skip": 0
    },
    "my_rating": 1
  }
};


const ALLFILMS = {
  film_with_description_list: [
    {
      "id": 1,
      "title": "Еще по одной",
      "title_original": "Druk",
      "origin_countries": [
        "Дания",
        "Швеция"
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
        },
        {
          "name": "Комедия",
          "genre_id": 2
        }
      ],
      "director": {
        "id": 0,
        "name_rus": "Томас Винтерберг",
      },
      "screenwriter": {
        "id": 0,
        "name_rus": "Томас Винтерберг",
      },
      "actors": [
        {
          "id": 1,
          "name_rus": "Мадс Миккельсен",
        },
        {
          "id": 2,
          "name_rus": "Томас Бо Ларсен",
        },
        {
          "id": 3,
          "name_rus": "Ларс Ранте",
        },
        {
          "id": 4,
          "name_rus": "Мария Бонневи",
        },
      ]
    },
    {
      "id": 2,
      "title": "С любовью, Рози ",
      "title_original": "Love, Rosie",
      "origin_countries": [
        "Дания"
      ],
      "rating": 7.6,
      "poster_url": "/server/images/love-rosie.webp",
      "trailer_url": "string",
      "content_type": "film",
      "release_year": 2014,
      "duration": 132,
      "total_revenue": "$25 574 387",
      "description": "Рози и Алекс были лучшими друзьями с детства, и теперь, по окончании школы, собираются вместе продолжить учёбу в университете.\n" +
          "\n" +
          "Однако в их судьбах происходит резкий поворот, когда после ночи со звездой школы Рози узнаёт, что у неё будет ребенок. Невзирая на то, что обстоятельства и жизненные ситуации разлучают героев, они и спустя годы продолжают помнить друг о друге и о том чувстве, что соединило их в юности…",
      "genres": [
        {
          "name": "Драма",
          "genre_id": 0
        },
        {
          "name": "Комедия",
          "genre_id": 2
        }
      ],
      "director": {
        "id": 5,
        "name_rus": "Кристиан Диттер",
      },
      "screenwriter": {
        "id": 6,
        "name_rus": "Сесилия Ахерн",
      },
      "actors": [
        {
          "id": 7,
          "name_rus": "Лили Коллинз",
        },
        {
          "id": 8,
          "name_rus": "Сэм Клафлин",
        },
        {
          "id": 9,
          "name_rus": "Кристиан Кук",
        },
      ],
    },
    {
      "id": 3,
      "title": "Красивый, плохой, злой",
      "title_original": "Extremely Wicked, Shockingly Evil and Vile",
      "origin_countries": [
        "США"
      ],
      "rating": 6.8,
      "poster_url": "server/images/extremely-wicked.webp",
      "trailer_url": "string",
      "content_type": "film",
      "release_year": 2018,
      "duration": 110,
      "total_revenue": "$9 816 572",
      "description": "Тэд – неотразимый красавец, устоять перед таким невозможно. Очаровательная Лиз и не устояла. Свидание на одну ночь переросло в долгие замечательные отношения, о которых большинство девушек только и мечтает. Внезапно Тэда арестовали, предъявив ему чудовищные обвинения. Но как поверить в то, что этот нежный умный элегантный мужчина мог... насиловать, убивать и расчленять несчастных женщин?! Ее родной и милый Тэд. Тэд Банди.",
      "genres": [
        {
          "name": "Драма",
          "genre_id": 0
        }
      ],
      "director": {
        "id": 11,
        "name_rus": "Джо Берлингер",
      },
      "screenwriter": {
        "id": 12,
        "name_rus": "Майкл Верви",
      },
      "actors": [
        {
          "id": 7,
          "name_rus": "Лили Коллинз",
        },
        {
          "id": 10,
          "name_rus": "Зак Эфрон",
        },
      ],
    },
    {
      "id": 4,
      "title": "Отверженные",
      "title_original": "Les Misérables",
      "origin_countries": [
        "США"
      ],
      "rating": 8.1,
      "poster_url": "server/images/les-m.webp",
      "trailer_url": "string",
      "content_type": "film",
      "release_year": 2019,
      "duration": 360,
      "total_revenue": "$9 816 572",
      "description": "Жан Вальжан – осужденный за кражу хлеба беглый каторжник, на протяжении долгих лет скрывается от инспектора Жавера. Жавер, в свою очередь, свято верит в справедливость закона и считает делом чести поимку беглого вора. Параллельно с их противостоянием развивается трагичная история Фантины и ее незаконнорожденной дочери Козетты. После смерти Фантины Жан Вальжан, считающий себя в ответе за ее судьбу, забирает Козетту и заботится о ней как о родной дочери.",
      "genres": [
        {
          "name": "Драма",
          "genre_id": 0
        }
      ],
      "director": {
        "id": 13,
        "name_rus": "Том Шенклэнд",
      },
      "screenwriter": {
        "id": 14,
        "name_rus": "Виктор Гюго",
      },
      "actors": [
        {
          "id": 7,
          "name_rus": "Лили Коллинз",
        },
        {
          "id": 15,
          "name_rus": "Доминик Уэст",
        },
      ],
    }, {
      "id": 5,
      "title": "Белоснежка: Месть гномов",
      "title_original": "Mirror Mirror",
      "origin_countries": [
        "США",
        "Канада"
      ],
      "rating": 6.0,
      "poster_url": "server/images/mirror-mirror.webp",
      "trailer_url": "string",
      "content_type": "film",
      "release_year": 2012,
      "duration": 106,
      "total_revenue": "$85 000 000",
      "description": "Злая Королева, мечтающая выйти замуж за красивого и богатого Принца, выдворяет из дворца Белоснежку и берет власть в свои руки. Но милая девушка не погибла в темном дремучем лесу, а связалась с бандой гномов-разбойников. Вместе они отомстят Злодейке!",
      "genres": [
        {
          "name": "Драма",
          "genre_id": 0
        },
        {
          "name": "Фентези",
          "genre_id": 3
        },
        {
          "name": "Комедия",
          "genre_id": 2
        }
      ],
      "director": {
        "id": 16,
        "name_rus": "Тарсем Сингх",
      },
      "screenwriter": {
        "id": 17,
        "name_rus": "Марк Клейн",
      },
      "actors": [
        {
          "id": 7,
          "name_rus": "Лили Коллинз",
        },
        {
          "id": 18,
          "name_rus": "Джулия Робертс",
        },
        {
          "id": 19,
          "name_rus": "Нэйтан Лейн",
        },
      ],
    }, {
      "id": 6,
      "title": "Гарри Поттер и философский камень",
      "title_original": "Harry Potter and the Sorcerer's Stone",
      "origin_countries": [
        "США",
        "Великобритания"
      ],
      "rating": 8.2,
      "poster_url": "server/images/harry1.webp",
      "trailer_url": "string",
      "content_type": "film",
      "release_year": 2001,
      "duration": 152,
      "total_revenue": "$974 755 371",
      "description": "Жизнь десятилетнего Гарри Поттера нельзя назвать сладкой: родители умерли, едва ему исполнился год, а от дяди и тёти, взявших сироту на воспитание, достаются лишь тычки да подзатыльники. Но в одиннадцатый день рождения Гарри всё меняется. Странный гость, неожиданно появившийся на пороге, приносит письмо, из которого мальчик узнаёт, что на самом деле он - волшебник и зачислен в школу магии под названием Хогвартс. А уже через пару недель Гарри будет мчаться в поезде Хогвартс-экспресс навстречу новой жизни, где его ждут невероятные приключения, верные друзья и самое главное — ключ к разгадке тайны смерти его родителей.",
      "genres": [
        {
          "name": "Фентези",
          "genre_id": 3
        },
        {
          "name": "Приключения",
          "genre_id": 4
        },
      ],
      "director": {
        "id": 20,
        "name_rus": "Крис Коламбус",
      },
      "screenwriter": {
        "id": 21,
        "name_rus": "Дж.К. Роулинг",
      },
      "actors": [
        {
          "id": 22,
          "name_rus": "Дэниэл Рэдклифф",
        },
        {
          "id": 23,
          "name_rus": "Руперт Гринт",
        },
        {
          "id": 24,
          "name_rus": "Эмма Уотсон",
        },
      ],
    },
    {
      "id": 7,
      "title": "Гарри Поттер и Тайная комната",
      "title_original": "Harry Potter and the Chamber of Secrets",
      "origin_countries": [
        "США",
        "Великобритания"
      ],
      "rating": 8.0,
      "poster_url": "server/images/harry2.webp",
      "trailer_url": "string",
      "content_type": "film",
      "release_year": 2002,
      "duration": 161,
      "total_revenue": "$878 979 634",
      "description": "Гарри Поттер переходит на второй курс Школы чародейства и волшебства Хогвартс. Эльф Добби предупреждает Гарри об опасности, которая поджидает его там, и просит больше не возвращаться в школу.\n" +
          "\n" +
          "Юный волшебник не следует совету эльфа и становится свидетелем таинственных событий, разворачивающихся в Хогвартсе. Вскоре Гарри и его друзья узнают о существовании Тайной Комнаты и сталкиваются с новыми приключениями, пытаясь победить темные силы.",
      "genres": [
        {
          "name": "Фентези",
          "genre_id": 3
        },
        {
          "name": "Приключения",
          "genre_id": 4
        },
      ],
      "director": {
        "id": 20,
        "name_rus": "Крис Коламбус",
      },
      "screenwriter": {
        "id": 21,
        "name_rus": "Дж.К. Роулинг",
      },
      "actors": [
        {
          "id": 22,
          "name_rus": "Дэниэл Рэдклифф",
        },
        {
          "id": 23,
          "name_rus": "Руперт Гринт",
        },
        {
          "id": 24,
          "name_rus": "Эмма Уотсон",
        },
      ],
    },
    {
      "id": 8,
      "title": "Гарри Поттер и узник Азкабана ",
      "title_original": "Harry Potter and the Prisoner of Azkaban",
      "origin_countries": [
        "США",
        "Великобритания"
      ],
      "rating": 8.2,
      "poster_url": "server/images/harry3.webp",
      "trailer_url": "string",
      "content_type": "film",
      "release_year": 2004,
      "duration": 142,
      "total_revenue": "$795 634 069",
      "description": "В третьей части истории о юном волшебнике полюбившиеся всем герои — Гарри Поттер, Рон и Гермиона — возвращаются уже на третий курс школы чародейства и волшебства Хогвартс. На этот раз они должны раскрыть тайну узника, сбежавшего из зловещей тюрьмы Азкабан, чье пребывание на воле создает для Гарри смертельную опасность...",
      "genres": [
        {
          "name": "Фентези",
          "genre_id": 3
        },
        {
          "name": "Приключения",
          "genre_id": 4
        },
      ],
      "director": {
        "id": 25,
        "name_rus": "Альфонсо Куарон",
      },
      "screenwriter": {
        "id": 21,
        "name_rus": "Дж.К. Роулинг",
      },
      "actors": [
        {
          "id": 22,
          "name_rus": "Дэниэл Рэдклифф",
        },
        {
          "id": 23,
          "name_rus": "Руперт Гринт",
        },
        {
          "id": 24,
          "name_rus": "Эмма Уотсон",
        },
      ],
    },
    {
      "id": 9,
      "title": "Иллюзия обмана 2",
      "title_original": "Now You See Me 2",
      "origin_countries": [
        "США",
        "Франция"
      ],
      "rating": 6.6,
      "poster_url": "server/images/now-you-see2.webp",
      "trailer_url": "string",
      "content_type": "film",
      "release_year": 2016,
      "duration": 142,
      "total_revenue": "$334 897 606",
      "description": "«Четыре всадника», команда лучших иллюзионистов мира, снова в сборе! Их «магия» стала еще совершеннее, а враги – опаснее. На сей раз им предстоит спасти свою репутацию и вывести на чистую воду жестокого техномагната…",
      "genres": [
        {
          "name": "Комедия",
          "genre_id": 1
        },
        {
          "name": "Приключения",
          "genre_id": 4
        },
        {
          "name": "Боевик",
          "genre_id": 5
        },
      ],
      "director": {
        "id": 26,
        "name_rus": "Джон М. Чу",
      },
      "screenwriter": {
        "id": 27,
        "name_rus": "Боаз Якин",
      },
      "actors": [
        {
          "id": 28,
          "name_rus": "Джесси Айзенберг",
        },
        {
          "id": 29,
          "name_rus": "Марк Руффало",
        },
        {
          "id": 22,
          "name_rus": "Дэниэл Рэдклифф",
        },
        {
          "id": 30,
          "name_rus": "Вуди Харрельсон",
        },
        {
          "id": 31,
          "name_rus": "Дэйв Франко",
        },
      ],
    },
    {
      "id": 10,
      "title": "Иллюзия обмана",
      "title_original": "Now You See Me",
      "origin_countries": [
        "США",
        "Франция"
      ],
      "rating": 7.7,
      "poster_url": "/server/images/now-you-see.webp",
      "trailer_url": "string",
      "content_type": "film",
      "release_year": 2014,
      "duration": 115,
      "total_revenue": "$351 723 989",
      "description": "«Команда лучших иллюзионистов мира проворачивает дерзкие ограбления прямо во время своих шоу, играя в кошки-мышки с агентами ФБР.",
      "genres": [
        {
          "name": "Комедия",
          "genre_id": 1
        },
        {
          "name": "Приключения",
          "genre_id": 4
        },
        {
          "name": "Боевик",
          "genre_id": 5
        },
      ],
      "director": {
        "id": 26,
        "name_rus": "Джон М. Чу",
      },
      "screenwriter": {
        "id": 27,
        "name_rus": "Боаз Якин",
      },
      "actors": [
        {
          "id": 28,
          "name_rus": "Джесси Айзенберг",
        },
        {
          "id": 29,
          "name_rus": "Марк Руффало",
        },
        {
          "id": 30,
          "name_rus": "Вуди Харрельсон",
        },
        {
          "id": 31,
          "name_rus": "Дэйв Франко",
        },
      ],
    },
    {
      "id": 10,
      "title": "Казино Рояль",
      "title_original": "Casino Royale",
      "origin_countries": [
        "Великобритания",
        "США"

      ],
      "rating": 7.8,
      "poster_url": "/server/images/casino.webp",
      "trailer_url": "string",
      "content_type": "film",
      "release_year": 2006,
      "duration": 139,
      "total_revenue": "$599 045 960",
      "description": "Используя богатый шпионский арсенал, Джеймс Бонд вступает в поединок с финансовым гением преступного мира Ле Шиффром. Но генеральное сражение против него можно выиграть лишь силой ума, и не на поле боя, а на зеленом сукне казино «Рояль».",
      "genres": [
        {
          "name": "Боевик",
          "genre_id": 5
        },
        {
          "name": "Приключения",
          "genre_id": 4
        },
      ],
      "director": {
        "id": 35,
        "name_rus": "Мартин Кэмпбелл",
      },
      "screenwriter": {
        "id": 34,
        "name_rus": "Нил Пёрвис",
      },
      "actors": [
        {
          "id": 32,
          "name_rus": "Дэниэл Крэйг",
        },
        {
          "id": 33,
          "name_rus": "Ева Грин",
        },
        {
          "id": 1,
          "name_rus": "Мадс Миккельсен",
        },
      ],
    },
  ],
}

module.exports = initMocks;
