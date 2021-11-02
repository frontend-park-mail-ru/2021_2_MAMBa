import {Events} from '../consts/events.js';
import {getInfoAboutFilm, sendReview} from '../modules/http';
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
   * @param {Object} film - film to render.
   */
  getPageContent = (film) => {
    getInfoAboutFilm(film.id)
        .then((response) => {
          if (!response) {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
          }
          if (response.status === 200) {
            this.eventBus.emit(Events.FilmPage.Render.Content, convertArrayToFilmPage(response.parsedJson));
          }
        });
  }

  /**
   * Post review
   * @param {Object} inputsData - review to post.
   */
  postReview = (inputsData = {}, routeData) => {
    if (!authModule.user) {
      this.eventBus.emit(Events
          .FilmPage.Render.WarningSend, 'Чтобы отправить отзыв, пожалуйста, зарегистрируйтесь', 'warning_no-auth');
      return;
    }

    sendReview(inputsData).then((response) => {
      if (!response) {
        return;
      }
      if (response.status === 200) {
        this.eventBus.emit(Events.FilmPage.Render.SuccessfulSend);
        return;
      }
    });
  }
}
