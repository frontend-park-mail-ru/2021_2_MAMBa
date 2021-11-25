import {EVENTS} from '../consts/EVENTS.js';
import {getInfoAboutFilm, sendReview, sendRating, sendBookmark} from '../modules/http';
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
      this.eventBus.emit(EVENTS.App.ErrorPage);
      return;
    }
    getInfoAboutFilm(film.id)
        .then((response) => {
          if (!response || !response.status) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
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
          'Чтобы оставить отзыв, пожалуйста, <a href="/auth">зарегистрируйтесь</a>',
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
          'Чтобы поставить оценку, пожалуйста, <a href="/auth" class = "white_text">зарегистрируйтесь</a>');
      return;
    }
    if (!filmId && !rating) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
      return;
    }

    sendRating(filmId, rating).then((response) => {
      if (!response) {
        return;
      }
      if (response.status === 200) {
        this.eventBus.emit(EVENTS.filmPage.render.successfulRatingSend, rating, response.body.rating);
      }
    });
  }

  /**
   * Post bookmark
   * @param {number} filmId - film`s id of bookmark.
   * @param {boolean} bookmarked - status of future bookmark.
   */
  postBookmark = (filmId, bookmarked) => {
    // if (!authModule.user) {
    //   // this.eventBus.emit(
    //   //     EVENTS.filmPage.render.warningRatingSend,
    //   //     'Чтобы поставить оценку, пожалуйста, <a href="/auth" class = "white_text">зарегистрируйтесь</a>');
    //   // return;
    // }
    if (!filmId && !bookmarked) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
      return;
    }

    sendBookmark(filmId, bookmarked).then((response) => {
      if (!response) {
        return;
      }
      if (response.status === 200) {
        // this.eventBus.emit(EVENTS.filmPage.render.successfulRatingSend, rating, response.body.rating);
      }
    });
  }
}
