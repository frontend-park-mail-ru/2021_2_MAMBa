import {EVENTS} from '../consts/EVENTS.js';
import {getInfoAboutFilm, sendReview, sendRating, sendBookmark, getUpdatedReviews} from '../modules/http';
import {convertArrayToFilmPage, convertArrayToUpdateReviews} from '../modules/adapters.js';
import {authModule} from '../modules/authorization';
import {statuses} from '../consts/reqStatuses';
import {renderWarning} from '../utils/utils';


/** Class representing film page model. */
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
          } else if (response?.status === statuses.OK && response.body) {
            this.eventBus.emit(EVENTS.filmPage.render.content, convertArrayToFilmPage(response.body));
          }
          if (response.status === statuses.NOT_FOUND) {
            this.eventBus.emit(EVENTS.App.ErrorPageText, 'На нашем сайте такого фильма нет');
          }
        });
  }

  checkAuthAndWarn = (filmId, name) => {
    if (!authModule.user) {
      renderWarning(`Чтобы оставить ${name}, пожалуйста, <a href= /auth?redirect=films/${filmId} class = "black_text">зарегистрируйтесь</a>`,
          'warning_no-auth');
      return false;
    } else {
      return true;
    }
  }

  /**
   * Post review
   * @param {object} inputsData - review to post.
   */
  postReview = (inputsData = {}) => {
    if (this.checkAuthAndWarn(inputsData.film_id, 'отзыв')) {
      sendReview(inputsData)
          .then((response) => {
            if (!response) {
              return;
            }
            if (response.status === statuses.OK) {
              this.eventBus.emit(EVENTS.filmPage.render.successfulSend);
            }
            getUpdatedReviews(inputsData)
                .then((response) => {
                  if (!response || !response.status) {
                    this.eventBus.emit(EVENTS.App.ErrorPage);
                  } else if (response?.status === statuses.OK && response.body) {
                    this.eventBus.emit(EVENTS.filmPage.render.successfulReviewSend, convertArrayToUpdateReviews(response.body));
                  }
                });
          });
    }
  }

  /**
   * Post rating
   * @param {number} filmId - film`s id of rating.
   * @param {number} rating - rating to post.
   */
  postRating = (filmId, rating) => {
    if (!filmId && !rating) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
      return;
    }
    if (!authModule.user) {
      this.eventBus.emit(
          EVENTS.filmPage.render.warningRatingSend,
          `Чтобы поставить оценку, пожалуйста, <a href= /auth?redirect=films/${filmId} class = "white_text"">зарегистрируйтесь</a>`);
      return;
    }
    sendRating(filmId, rating).then((response) => {
      if (!response) {
        return;
      }
      if (response.status === statuses.OK) {
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
    if (!filmId && !bookmarked) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
      return;
    }
    sendBookmark(filmId, bookmarked).then((response) => {
      if (!response) {
        return;
      }
      if (response.status === statuses.OK) {
        // TODO:check what backend send
        // this.eventBus.emit(EVENTS.filmPage.render.successfulRatingSend, rating, response.body.rating);
      }
    });
  }
}
