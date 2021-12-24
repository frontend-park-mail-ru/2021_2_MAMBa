import {EVENTS} from '../consts/EVENTS.js';
import {Model} from './model';
import {deployUrl} from '../consts/urls';
const beginYear = 1895;
const endYear = 2022;
import {getGenres, getRandom} from '../modules/http';
import {statuses} from '../consts/reqStatuses';

export class RandomModel extends Model {
  constructor(eventBus) {
    super(eventBus);
    this.genresList = [];
  }

  getPageContent = async () => {
    const result = {};
    const genresResponse = await getGenres();
    if (!genresResponse || genresResponse.status !== statuses.OK || !genresResponse.body) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
    const randomResponse = await getRandom([`year_start=${beginYear}`, `year_end=${endYear}`]);
    if (!randomResponse || randomResponse.status !== statuses.OK || !randomResponse.body) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
    // del
    randomResponse.body.film_list.forEach((item) => {
      item.poster_url = `${deployUrl}${item.poster_url}`;
    });
    // del
    result.cardList = randomResponse.body.film_list;
    result.yearBegin = beginYear;
    result.yearEnd = endYear;
    result.genresList = genresResponse.body.genres_list;
    this.genresList = genresResponse.body.genres_list;
    this.eventBus.emit(EVENTS.randomPage.render, result);
  }

  getSubmitContent = async (inputsData) => {
    if (!inputsData || !inputsData.beginSelect || !inputsData.endSelect) {
      return;
    }
    const result = [];
    result.push(`year_start=${inputsData.beginSelect}`);
    result.push(`year_end=${inputsData.endSelect}`);
    inputsData.checkboxes.forEach((item, index) => {
      if (index > 2) {
        return;
      }
      result.push(`id${index+1}=${item}`);
    });
    getRandom(result).then((response) => {
      if (!response || response.status !== statuses.OK || !response.body) {
        return;
      }
      // del
      response.body.film_list.forEach((item) => {
        item.poster_url = `${deployUrl}${item.poster_url}`;
      });
      // del
      const newResult = {};
      newResult.cardList = response.body.film_list;
      newResult.yearBegin = beginYear;
      newResult.yearEnd = endYear;
      newResult.genresList = this.genresList;
      this.eventBus.emit(EVENTS.randomPage.render, newResult);
    });
  }
}
