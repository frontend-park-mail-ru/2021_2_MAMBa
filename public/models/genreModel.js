import {EVENTS} from '../consts/EVENTS.js';
import {getInfoAboutGenre, getGenreFilms} from '../modules/http';
import {convertArrayToGenrePage, convertArrayToActorFilms} from '../modules/adapters';
import {statuses} from '../consts/reqStatuses';

/** Class representing genre page model.
 * @param {object} actor - info about genre(id).
 */
export class GenrePageModel {
  /**
   * Create a actor page model.
   * @param {EventBus} eventBus - Global Event Bus.
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  /**
   * Get info for genre page emit render content.
   * @param {object} genre - genre to render.
   */
  getPageContent = (genre) => {
    if (!genre?.id) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
      return;
    }
    getInfoAboutGenre(genre.id)
        .then((response) => {
          if (!response.status) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          } else if (response?.status === statuses.OK && response.body) {
            this.eventBus.emit(EVENTS.genrePage.render.content, convertArrayToGenrePage(response.body));
          } else if (response.status === statuses.NOT_FOUND) {
            this.eventBus.emit(EVENTS.App.ErrorPageText, 'На нашем сайте такого жанра нет');
          }
        });
  }

  getGenreFilmsContent = (genre) => {
    if (!genre?.id && !genre?.skip && !genre?.limit) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
      return;
    }
    getGenreFilms(genre.id, genre.skip, genre.limit)
        .then((response) => {
          if (!response) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          } else if (response?.status === statuses.OK && response.body) {
            this.eventBus.emit(EVENTS.genrePage.render.films, convertArrayToActorFilms(response.body), genre);
          }
        });
  }
}
