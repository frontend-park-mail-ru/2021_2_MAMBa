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

app.get('/api/film/getFilm/skipReview=0&limitReview=11&skipRec=0&limitRec=11&id=1', (req, res) => {
  res.json(FILM);
});

app.get('/api/person/getPersonFilms/id=1&skip=3&limit=3', (req, res) => {
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


app.get('/*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../dist/index.html`));
});

const port = process.env.PORT || 8085;

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});


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
      "poster_url": "server/images/love-rosie.webp",
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
      "poster_url": "server/images/now-you-see.webp",
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
      "poster_url": "server/images/casino.webp",
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
};
