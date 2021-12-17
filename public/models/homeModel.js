import {getGenres, getMainPageContent, getMainPagePopularFilms} from '../modules/http.js';
import {EVENTS} from '../consts/EVENTS.js';
import {
  convertArrayToGenresPage,
  convertArrayToHomeMainSliderPage, convertArrayToHomePopularFilmsPage,
} from '../modules/adapters';
import {statuses} from '../consts/reqStatuses';

/**
 * Class representing home page model.
 */
export class HomePageModel {
  /**
   * Create a home page model.
   * @param {EventBus} eventBus - Global Event Bus.
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  getMainPageContent = () => {
    const mainPage= {};
    getMainPageContent()
        .then((response) => {
          if (!response || !response.status) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          }
          if (response.status === statuses.OK && response.body) {
            mainPage['collections'] = convertArrayToHomeMainSliderPage(response.body).collections;
          }
        });
    getMainPagePopularFilms()
        .then((response) => {
          if (!response || !response.status) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          }
          if (response.status === statuses.OK && response.body) {
            mainPage['popularFilms'] = convertArrayToHomePopularFilmsPage(response.body).popularFilms;
          }
        });
    getGenres()
        .then((response) => {
          if (!response || !response.status) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          }
          if (response.status === statuses.OK && response.body) {
            mainPage['genres'] = convertArrayToGenresPage(response.body).genres;
            this.eventBus.emit(EVENTS.homepage.render.content, mainPage);
          }
        });
  }
}
