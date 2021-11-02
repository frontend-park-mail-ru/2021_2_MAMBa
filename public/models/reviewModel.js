import {Events} from '../consts/events.js';
import {getActorFilms, getInfoAboutActor} from '../modules/http';

/** Class representing actor page model.
 * @param {Object} actor - info about review(id).
 */
export class ReviewPageModel {
  /**
   * Create a actor page model.
   * @param {EventBus} eventBus - Global Event Bus.
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  getPageContent = (actor) => {
    getInfoAboutActor(actor.id).then((contentData) => {
      this.eventBus.emit(Events.ActorPage.Render.Content, contentData);
    }).catch(() => {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    });
  }

  getActorFilmsContent = (actor) => {
    getActorFilms(actor.id, actor.limit, actor.skip).then((contentData) => {
      this.eventBus.emit(Events.ActorPage.Render.Films, contentData);
    }).catch(() => {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    });
  }
}
