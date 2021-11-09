import {Events} from '../consts/events.js';
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
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
      return;
    }
    getInfoAboutFilm(film.id)
        .then((response) => {
          if (!response || !response.status) {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
          } else if (response.status === 200 && response.body) {
            this.eventBus.emit(Events.FilmPage.Render.Content, convertArrayToFilmPage(response.body));
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
          Events.FilmPage.Render.WarningSend,
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
            this.eventBus.emit(Events.FilmPage.Render.SuccessfulSend);
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
          Events.FilmPage.Render.WarningRatingSend,
          'Чтобы поставить рейтинг, пожалуйста, зарегистрируйтесь');
      return;
    }
    if (!filmId && !rating) {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
      return;
    }

    sendRating(filmId, rating).then((response) => {
      if (!response) {
        return;
      }
      if (response.status === 200) {
        this.eventBus.emit(Events.FilmPage.Render.renderSuccessfulRatingSend, rating);
        // TODO изменить рейтинг фильма
      }
    });
  }
}
