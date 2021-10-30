import {Events} from '../consts/events.js';
import {getInfoAboutFilm} from '../modules/http';

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
    getInfoAboutFilm(film.id).then((contentData) => {
      console.log(contentData);
      this.eventBus.emit(Events.FilmPage.Render.Content, contentData);
    }).catch(() => {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    });
  }
}
