import {EVENTS} from '../consts/EVENTS.js';
import {getInfoAboutFilm, sendReview, sendRating} from '../modules/http';
import {convertArrayToFilmPage} from '../modules/adapters.js';
import {authModule} from '../modules/authorization';


/** Class representing film page model.
 */
export class FilmPageModel {
  /**
   * Create a film page model.
   * @param {EventBus} eventBus - Global Event Bus.
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  /**
   * Get content for film page
   * @param {object} film - film to render.
   */
  getPageContent = (film) => {
    if (!film?.id) {
      this.eventBus.emit(EVENTS.homepage.render.errorPage);
      return;
    }
    getInfoAboutFilm(film.id)
        .then((response) => {
          if (!response || !response.status) {
            this.eventBus.emit(EVENTS.homepage.render.errorPage);
          } else if (response.status === 200 && response.body) {
            this.eventBus.emit(EVENTS.filmPage.render.content, convertArrayToFilmPage(response.body));
          }
          // TODO: отрисовывать стр если фильма нет в бд
          // if (response.parsedJson.status === 404) {}
        });
  }

  /**
   * Post review
   * @param {object} inputsData - review to post.
   */
  postReview = (inputsData = {}) => {
    if (!authModule.user) {
      this.eventBus.emit(
          EVENTS.filmPage.render.warningSend,
          'Чтобы отправить отзыв, пожалуйста, зарегистрируйтесь',
          'warning_no-auth');
      return;
    }

    sendReview(inputsData)
        .then((response) => {
          if (!response) {
            return;
          }
          if (response.status === 200) {
            this.eventBus.emit(EVENTS.filmPage.render.successfulSend);
          }
        });
  }

  /**
   * Post rating
   * @param {number} filmId - film`s id of rating.
   * @param {number} rating - rating to post.
   */
  postRating = (filmId, rating) => {
    if (!authModule.user) {
      this.eventBus.emit(
          EVENTS.filmPage.render.warningRatingSend,
          'Чтобы поставить рейтинг, пожалуйста, зарегистрируйтесь');
      return;
    }
    if (!filmId && !rating) {
      this.eventBus.emit(EVENTS.Homepage.Render.ErrorPage);
      return;
    }

    sendRating(filmId, rating).then((response) => {
      if (!response) {
        return;
      }
      if (response.status === 200) {
        this.eventBus.emit(EVENTS.filmPage.render.renderSuccessfulRatingSend, rating);
        // TODO изменить рейтинг фильма
      }
    });
  }
}
