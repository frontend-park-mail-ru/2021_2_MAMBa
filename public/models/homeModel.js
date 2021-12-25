import {getBanners, getCollections, getGenres, getInfoAboutPremiers, getMainPagePopularFilms} from '../modules/http.js';
import {EVENTS} from '../consts/EVENTS.js';
import {
  convertArrayToCalendarPage,
  convertArrayToCollectionsPage,
  convertArrayToGenresPage,
  convertArrayToHomeMainSliderPage,
  convertArrayToHomePopularFilmsPage,
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
    let mainPage = {};
    getBanners()
        .then((response) => {
          if (!response || !response.status) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          }
          if (response.status === statuses.OK && response.body) {
            mainPage = {...mainPage, ...convertArrayToHomeMainSliderPage(response.body)};
          }
        });
    getMainPagePopularFilms()
        .then((response) => {
          if (!response || !response.status) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          }
          if (response.status === statuses.OK && response.body) {
            mainPage = {...mainPage, ...convertArrayToHomePopularFilmsPage(response.body)};
          }
        });
    getGenres()
        .then((response) => {
          if (!response || !response.status) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          }
          if (response.status === statuses.OK && response.body) {
            mainPage = {...mainPage, ...convertArrayToGenresPage(response.body)};
          }
        });
    getCollections()
        .then((response) => {
          if (!response || !response.status) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          }
          if (response.status === statuses.OK && response.body) {
            mainPage = {...mainPage, ...convertArrayToCollectionsPage(response.body)};
          }
        });
    const data = new Date();
    const year = data.getFullYear();
    const month = data.getMonth();
    getInfoAboutPremiers(year, month)
        .then((response) => {
          if (!response.status) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          } else if (response?.status === statuses.OK && response.body) {
            mainPage = {...mainPage, ...convertArrayToCalendarPage(response.body, year, month)};
          }
        });
    Promise.all([getCollections(), getInfoAboutPremiers(year, month),
      getMainPagePopularFilms(), getMainPagePopularFilms(), getBanners()]).then((_) => {
      this.eventBus.emit(EVENTS.homepage.render.content, mainPage);
    });

    Promise.all([getBanners()]).then((_) => {
      this.eventBus.emit(EVENTS.homepage.render.content, mainPage);
    });
  }
}
