import {EVENTS} from '../consts/EVENTS.js';
import {Model} from './model';
import {deployUrl, URLS} from '../consts/urls';
import {getGenres, getRandom} from '../modules/http';
import {statuses} from '../consts/reqStatuses';
import {convertArrayToGenresPage} from '../modules/adapters';

export class RandomModel extends Model {
  constructor(eventBus) {
    super(eventBus);
  }

  // TODO request for random films
  // TODO request for random films with params
  // TODO request for genres

  getPageContent = () => {
    const result = {};
    result.cardList = [
      {
        filmHref: `${deployUrl}/film/1`,
        imgSrc: 'https://randomwordgenerator.com/img/picture-generator/51e6dd444a54b10ff3d8992cc12c30771037dbf85254794e732f7bd49344_640.jpg',
      },
      {
        filmHref: `${deployUrl}/film/1`,
        imgSrc: 'https://cdn.pixabay.com/photo/2020/05/28/08/00/girl-5230306_960_720.jpg',
      },
      {
        filmHref: `${deployUrl}/film/1`,
        imgSrc: 'https://randomwordgenerator.com/img/picture-generator/50e2d2444e54b10ff3d8992cc12c30771037dbf852547848702a7fd79444_640.jpg',
      },
      {
        filmHref: `${deployUrl}/film/1`,
        imgSrc: 'https://randomwordgenerator.com/img/picture-generator/5fe5d0414a53b10ff3d8992cc12c30771037dbf852547940762b7adc904f_640.jpg',
      },
      {
        filmHref: `${deployUrl}/film/1`,
        imgSrc: 'https://randomwordgenerator.com/img/picture-generator/51e6dd444a54b10ff3d8992cc12c30771037dbf85254794e732f7bd49344_640.jpg',
      },
    ];
    this.eventBus.emit(EVENTS.randomPage.render, result);
    //   const promiseGenres = getGenres();
    //   const promiseRandom = getRandom();
    //   Promise.all([promiseRandom, promiseGenres])
    //       .then(([randomResp, genresResp]) => {
    //         const result = {};
    //         if (genresResp?.status === statuses.OK && genresResp.body) {
    //           result.genresArray = convertArrayToGenresPage(genresResp.body);
    //         }
    //         if (randomResp?.status === statuses.OK && randomResp.body) {
    //           result.randomArray = randomResp.body;
    //         }
    //         this.eventBus.emit(EVENTS.randomPage.render, result);
    //       })
    //       .catch(() => {
    //         this.eventBus.emit(EVENTS.App.ErrorPage);
    //       });
    // }
  }
}
