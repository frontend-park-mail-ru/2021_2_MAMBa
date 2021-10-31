import {Events} from '../consts/events.js';
import {getInfoAboutFilm} from '../modules/http';
import {convertArrayToFilmPage} from '../modules/adapters.js';
import {authModule} from "../modules/authorization";


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

  getPageContent = (film) => {
    getInfoAboutFilm(film.id).then((response) => {
      if (!response) {
        this.eventBus.emit(Events.Homepage.Render.ErrorPage);
      }
      if (response.status === 200) {
        this.eventBus.emit(Events.FilmPage.Render.Content, convertArrayToFilmPage(response.parsedJson.body));
      }
    });
    // console.log(authModule.user);
    // if (!authModule.user) {
    //   this.eventBus.emit(Events.FilmPage.Render.WriteReview);
    // }
  }
}
